// ============ Today: guided practices (prayer, Examen, gratitude) ============

import type { ActivityType } from '@/lib/activityLog';

export type GuidedStepKind =
  /** Free writing (optional — prayer can be silent) */
  | 'write'
  /** A truth about God to praise Him for, then optional writing */
  | 'adore'
  /** Quiet pause with a short timer */
  | 'pause'
  /** Three gifts */
  | 'gifts'
  /** What does this show about God? — writing + Portraits attributes */
  | 'reveals-god';

export interface GuidedStep {
  id: string;
  kind: GuidedStepKind;
  title: string;
  prompt: string;
  hint?: string;
  placeholder?: string;
  /** Scripture shown with the step */
  verse?: { text: string; reference: string };
  seconds?: number;
}

export interface GuidedPractice {
  id: 'pray' | 'examen' | 'gratitude';
  name: string;
  intro: string;
  activity: ActivityType;
  steps: GuidedStep[];
  closing: string;
}

export const GUIDED_PRACTICES: GuidedPractice[] = [
  {
    id: 'pray',
    name: 'Pray',
    intro: 'A simple path for prayer that begins with God himself: adoration, confession, thanksgiving, and supplication (ACTS). Write as much or as little as you like — or pray silently.',
    activity: 'prayer',
    closing: 'He hears you. “The prayer of a righteous person has great power.” — James 5:16',
    steps: [
      {
        id: 'adoration',
        kind: 'adore',
        title: 'Adoration',
        prompt: 'Praise God for who He is.',
        hint: 'Begin with Him — not your list. Tell Him what you love about Him.',
        placeholder: 'God, You are…',
      },
      {
        id: 'confession',
        kind: 'write',
        title: 'Confession',
        prompt: 'Is there anything you need to confess?',
        hint: 'Be honest with Him. He is faithful and just to forgive.',
        verse: { text: 'If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.', reference: '1 John 1:9' },
        placeholder: 'Lord, forgive me for…',
      },
      {
        id: 'thanksgiving',
        kind: 'write',
        title: 'Thanksgiving',
        prompt: 'Thank Him for what He has done.',
        hint: 'Big and small — answered prayers, daily provision, His presence.',
        placeholder: 'Thank You for…',
      },
      {
        id: 'supplication',
        kind: 'write',
        title: 'Supplication',
        prompt: 'Bring your requests to Him — for yourself and for others.',
        hint: 'Ask with confidence. He invites you to.',
        verse: { text: 'Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God.', reference: 'Philippians 4:6' },
        placeholder: 'Please…',
      },
    ],
  },
  {
    id: 'examen',
    name: 'Evening Examen',
    intro: 'A prayerful look back over your day with God — noticing where He was present, owning where you turned away, and entrusting tomorrow to Him.',
    activity: 'examen',
    closing: 'Rest now. “In peace I will lie down and sleep, for You alone, O LORD, make me dwell in safety.” — Psalm 4:8',
    steps: [
      {
        id: 'presence',
        kind: 'pause',
        seconds: 30,
        title: 'Presence',
        prompt: 'Become aware that God is with you.',
        hint: 'Take a few slow breaths. He has been with you all day.',
        verse: { text: 'Where can I go from Your Spirit? Where can I flee from Your presence?', reference: 'Psalm 139:7' },
      },
      {
        id: 'gratitude',
        kind: 'write',
        title: 'Gratitude',
        prompt: 'Look back over the day. What are you thankful for?',
        placeholder: 'Today I’m thankful for…',
      },
      {
        id: 'saw-god',
        kind: 'reveals-god',
        title: 'Where you saw God',
        prompt: 'Where did you see God at work today? What did it show you about Him?',
        hint: 'A kindness, a provision, a nudge, a verse that stayed with you.',
        placeholder: 'I saw God when…',
      },
      {
        id: 'turned-away',
        kind: 'write',
        title: 'Where you turned away',
        prompt: 'Where did you turn away from Him today?',
        hint: 'Bring it to Him honestly — His mercy is new every morning.',
        verse: { text: 'Because of the loving devotion of the LORD we are not consumed, for His mercies never fail.', reference: 'Lamentations 3:22' },
        placeholder: 'Lord, I…',
      },
      {
        id: 'tomorrow',
        kind: 'write',
        title: 'Tomorrow',
        prompt: 'What will you bring to God tomorrow?',
        placeholder: 'Tomorrow I want to…',
      },
    ],
  },
  {
    id: 'gratitude',
    name: 'Gratitude',
    intro: 'Every good gift comes from God. Name three from today, then consider what they show you about the Giver.',
    activity: 'gratitude',
    closing: '“Give thanks to the LORD, for He is good; His loving devotion endures forever.” — Psalm 107:1',
    steps: [
      {
        id: 'gifts',
        kind: 'gifts',
        title: 'Three gifts',
        prompt: 'What are three gifts from God today?',
        hint: 'They can be small: a conversation, a meal, a quiet moment.',
        verse: { text: 'Every good and perfect gift is from above, coming down from the Father of the heavenly lights.', reference: 'James 1:17' },
      },
      {
        id: 'giver',
        kind: 'reveals-god',
        title: 'The Giver',
        prompt: 'What do these gifts show you about God?',
        placeholder: 'God is…',
      },
    ],
  },
];

export function getGuidedPractice(id: string): GuidedPractice | undefined {
  return GUIDED_PRACTICES.find(p => p.id === id);
}

/** Plain-text write-up for the journal. */
export function formatGuidedForJournal(practice: GuidedPractice, answers: Record<string, string>): string {
  const lines: string[] = [];
  for (const step of practice.steps) {
    const answer = answers[step.id]?.trim();
    if (!answer) continue;
    lines.push(step.title, answer, '');
  }
  return lines.join('\n').trim();
}
