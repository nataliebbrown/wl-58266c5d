// ============ Today: Sophia's daily suggestion (rule-based) ============
//
// One suggestion a day, chosen from simple rules: the person's intention,
// their current season from onboarding, what they've recently seen of God,
// and the time of day. Deterministic for a given day so it doesn't reshuffle.

import { MEDITATION_CATALOG, formatMeditationReference } from '@/lib/meditation/catalog';
import { GOD_ATTRIBUTES, countByAttribute, getAttribute, getPortraitEntries, type PortraitEntry } from '@/lib/portraits';
import { getActivePlan, getCurrentDay, getPlanDay } from '@/lib/readingPlan';
import { eraForChapter } from '@/lib/timewalk/eras';
import type { BibleReference } from '@/lib/bibleApi';
import type { TimePeriod } from '@/lib/timeAwareness';
import type { Intention, IntentionFocus } from './practices';

export type SuggestionAction =
  | { kind: 'meditate'; catalogId: string; categoryId: string }
  | { kind: 'read'; reference: BibleReference }
  | { kind: 'study'; reference: BibleReference; methodId: string }
  | { kind: 'reading-plan' }
  | { kind: 'timewalk'; eraId: string }
  | { kind: 'practice'; practiceId: string };

export interface Suggestion {
  id: string;
  title: string;
  body: string;
  actionLabel: string;
  action: SuggestionAction;
  /** Prompt for "Ask Sophia" */
  sophiaPrompt: string;
}

export interface SuggestionContext {
  period: TimePeriod;
  intention: Intention | null;
  season?: string | null;
  portraits?: PortraitEntry[];
  hasReadingPlan?: boolean;
  examenDoneToday?: boolean;
  examenInRhythm?: boolean;
  date?: Date;
}

// ---- Building blocks ----

function meditate(categoryId: string, index: number, why: string): Suggestion | null {
  const category = MEDITATION_CATALOG.find(c => c.id === categoryId);
  if (!category) return null;
  const verse = category.verses[index % category.verses.length];
  const ref = formatMeditationReference(verse);
  return {
    id: `meditate-${verse.id}`,
    title: `Meditate on ${ref}`,
    body: `${why} “${verse.inhale} ${verse.exhale}” — ${category.truth}.`,
    actionLabel: 'Meditate',
    action: { kind: 'meditate', catalogId: verse.id, categoryId: category.id },
    sophiaPrompt: `Help me reflect on ${ref}: “${verse.inhale} ${verse.exhale}” What does it show me about God?`,
  };
}

function read(book: string, chapter: number, title: string, body: string): Suggestion {
  return {
    id: `read-${book}-${chapter}`,
    title,
    body,
    actionLabel: `Read ${book === 'Psalms' ? 'Psalm' : book} ${chapter}`,
    action: { kind: 'read', reference: { book, chapter } },
    sophiaPrompt: `I'm about to read ${book === 'Psalms' ? 'Psalm' : book} ${chapter}. What should I look for about God as I read?`,
  };
}

function study(book: string, chapter: number, methodId: string, methodName: string, body: string): Suggestion {
  const label = `${book === 'Psalms' ? 'Psalm' : book} ${chapter}`;
  return {
    id: `study-${methodId}-${book}-${chapter}`,
    title: `Try ${methodName} with ${label}`,
    body,
    actionLabel: `Start ${methodName}`,
    action: { kind: 'study', reference: { book, chapter }, methodId },
    sophiaPrompt: `I'm going to study ${label} using ${methodName}. Can you help me get started?`,
  };
}

/** "Lamentations 3:22–23" / "Psalm 23:1" -> reference */
export function parseAnchor(anchor: string): BibleReference | null {
  const m = anchor.match(/^(.+?)\s+(\d+)(?::(\d+))?/);
  if (!m) return null;
  const book = m[1] === 'Psalm' ? 'Psalms' : m[1];
  return { book, chapter: Number(m[2]), verse: m[3] ? Number(m[3]) : undefined };
}

// ---- Rules ----

const FOCUS_RULES: Record<IntentionFocus, (i: number) => Suggestion | null> = {
  prayer: () => read('Matthew', 6, 'Learn to pray from Jesus', 'Jesus taught His disciples to pray beginning with God: “Our Father in heaven, hallowed be Your name.”'),
  trust: i => meditate(i % 2 ? 'uncertain' : 'afraid', i, 'For your intention to trust God:'),
  peace: i => meditate('anxious', i, 'For your intention to find peace in God:'),
  gratitude: i => meditate('grateful', i, 'For your intention to grow in gratitude:'),
  rest: i => meditate('weary', i, 'For your intention to rest in God:'),
  obedience: () => read('John', 14, 'Obedience that flows from love', 'Jesus said, “If you love Me, you will keep My commandments” — obedience grows out of knowing and loving Him.'),
  scripture: () => read('Psalms', 1, 'Rooted like a tree', 'Psalm 1 pictures the person who delights in God’s Word — planted by streams of water.'),
  'knowing-god': () => null, // handled with Portraits below
};

const SEASON_RULES: Record<string, (i: number) => Suggestion | null> = {
  difficult_situation: i => meditate(i % 2 ? 'grieving' : 'afraid', i, 'In a hard season, God is near:'),
  questions_doubts: () =>
    read('John', 20, 'Jesus meets an honest doubter', 'Thomas wanted to see for himself — and Jesus came to him. Bring your questions to Him too.'),
  deeper_relationship: i => meditate('worship', i, 'Spend a few minutes simply adoring God:'),
  understand_bible: () =>
    study('Mark', 1, 'inductive', 'Inductive study', 'Observe, interpret, and see what the opening of Mark reveals about Jesus.'),
  ministry_preparation: () =>
    study('Acts', 2, 'discovery', 'Discovery Bible Study', 'The same simple questions you can use with a group: what does this teach about God, about people, and how will we obey?'),
  spiritual_growth: () =>
    read('Psalms', 23, 'Listen with Lectio Divina', 'Read Psalm 23 slowly three times. Listen for what it shows you about God as your Shepherd.'),
};

/** Attribute the person has seen least — or not yet — to widen their portrait. */
function knowingGod(portraits: PortraitEntry[], i: number): Suggestion | null {
  const counts = countByAttribute(portraits);
  const unseen = GOD_ATTRIBUTES.filter(a => !counts[a.id]);
  const pool = unseen.length ? unseen : [...GOD_ATTRIBUTES].sort((a, b) => (counts[a.id] ?? 0) - (counts[b.id] ?? 0)).slice(0, 4);
  const attr = pool[i % pool.length];
  const ref = parseAnchor(attr.anchor);
  if (!ref) return null;
  return {
    id: `attr-${attr.id}`,
    title: `See God as ${attr.name.toLowerCase()}`,
    body: `${attr.summary} Read ${attr.anchor} and add what you see to your Portraits of God.`,
    actionLabel: `Read ${attr.anchor}`,
    action: { kind: 'read', reference: ref },
    sophiaPrompt: `Help me understand how God is ${attr.name.toLowerCase()}, starting from ${attr.anchor}.`,
  };
}

/** Build the day's suggestion. */
export function getDailySuggestion(ctx: SuggestionContext): Suggestion {
  const date = ctx.date ?? new Date();
  const dayIndex = Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86_400_000);
  const portraits = ctx.portraits ?? getPortraitEntries();
  const candidates: (Suggestion | null)[] = [];

  // Evening: the Examen, if it isn't already in the rhythm
  const evening = ctx.period === 'evening' || ctx.period === 'night';
  if (evening && !ctx.examenDoneToday && !ctx.examenInRhythm) {
    candidates.push({
      id: 'examen',
      title: 'End the day with God',
      body: 'The Evening Examen is a short, prayerful look back: where you saw God today, where you turned away, and what you’ll bring to Him tomorrow.',
      actionLabel: 'Begin the Examen',
      action: { kind: 'practice', practiceId: 'examen' },
      sophiaPrompt: 'Can you guide me through a short evening examen?',
    });
  }

  // Intention
  if (ctx.intention) {
    candidates.push(
      ctx.intention.focus === 'knowing-god' ? knowingGod(portraits, dayIndex) : FOCUS_RULES[ctx.intention.focus](dayIndex)
    );
  }

  // Recently seen of God → go deeper on that attribute
  const recent = portraits.find(p => Date.now() - new Date(p.createdAt).getTime() < 7 * 86_400_000);
  if (recent) {
    const attr = getAttribute(recent.attributeIds[0]);
    const ref = attr && parseAnchor(attr.anchor);
    if (attr && ref) {
      candidates.push({
        id: `deeper-${attr.id}`,
        title: `You’ve been seeing God as ${attr.name.toLowerCase()}`,
        body: `${recent.reference ? `In ${recent.reference} you wrote: “${recent.text}” ` : ''}Keep going — read ${attr.anchor}.`,
        actionLabel: `Read ${attr.anchor}`,
        action: { kind: 'read', reference: ref },
        sophiaPrompt: `This week I've been seeing that God is ${attr.name.toLowerCase()}. Where else in Scripture is that shown?`,
      });
    }
  }

  // History behind today's reading (TimeWalk)
  const plan = getActivePlan();
  const today = plan ? getPlanDay(plan.planId, getCurrentDay(plan)) : undefined;
  const first = today?.chapters[0];
  const era = first ? eraForChapter(first.book, first.chapter) : undefined;
  if (first && era && era.id !== 'beginning') {
    const book = first.book === 'Psalms' ? 'the Psalms' : first.book;
    candidates.push({
      id: `timewalk-${era.id}`,
      title: `Step into the world of ${book}`,
      body: `Today’s reading is set in ${era.name.toLowerCase().startsWith('the ') ? era.name.toLowerCase() : `the era of ${era.name.toLowerCase()}`}. ${era.godAtWork}`,
      actionLabel: 'Open TimeWalk',
      action: { kind: 'timewalk', eraId: era.id },
      sophiaPrompt: `What was happening in history around ${first.book} ${first.chapter}, and how does it help me see what God was doing?`,
    });
  }

  // Season from onboarding
  if (ctx.season && SEASON_RULES[ctx.season]) candidates.push(SEASON_RULES[ctx.season](dayIndex));

  // No reading plan yet
  if (!ctx.hasReadingPlan && !getActivePlan()) {
    candidates.push({
      id: 'reading-plan',
      title: 'Read through the whole Bible',
      body: 'At your own pace — no dates, no deadlines. Just the next day’s reading whenever you sit down.',
      actionLabel: 'Choose a plan',
      action: { kind: 'reading-plan' },
      sophiaPrompt: 'Should I read the Bible in order or chronologically?',
    });
  }

  // Always-available fallback
  candidates.push(knowingGod(portraits, dayIndex));
  candidates.push(meditate('worship', dayIndex, 'Take a moment to adore God:'));

  const valid = candidates.filter((c): c is Suggestion => !!c);
  // Evening examen wins when it applies; otherwise rotate through the top few by day
  if (valid[0]?.id === 'examen') return valid[0];
  const top = valid.slice(0, Math.min(3, valid.length));
  return top[dayIndex % top.length];
}
