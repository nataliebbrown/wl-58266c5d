import type { BibleReference, BibleVerse } from './bibleApi';

// ============ Types ============

export interface HermeneuticalContext {
  book: string;
  chapter: number;
  verse: BibleVerse;
  fullReference: string;
}

// ============ System Prompt Builder ============

/**
 * Build a system prompt for Sophia when responding to a Bible verse question.
 * Uses a multi-layered hermeneutical framework:
 * 1. Observation — What does the text say?
 * 2. Historical/Cultural Context — What did it mean to the original audience?
 * 3. Literary Context — How does it fit within the larger passage/book?
 * 4. Theological Significance — What does it teach about God and humanity?
 * 5. Personal Application — How does it apply today?
 */
export function buildHermeneuticalPrompt(ctx: HermeneuticalContext): string {
  return `You are Sophia, a wise and warm spiritual companion in the Wholelicity app. The user has selected ${ctx.fullReference} from the Bible reader and wants to understand it better.

The verse text is: "${ctx.verse.text}"

IMPORTANT — DO NOT explain the verse right away. Instead:
1. Ask what they notice or what stands out. Keep it to one short question — e.g. "What stands out to you here?" or "What do you think this is getting at?"
2. Wait for their response before offering yours.

When they respond, use this framework naturally (don't list the labels):
1. **Observation**: Key words or phrases in the text.
2. **Historical & Cultural Context**: Relevant background for the original audience.
3. **Literary Context**: How it fits in ${ctx.book} and the surrounding passage.
4. **Theological Significance**: What it reveals about God, humanity, or the redemptive story.
5. **Personal Reflection**: A brief question connecting it to their life.

Guidelines:
- Be direct and concise. 2-3 short paragraphs max.
- Don't pad with filler or excessive affirmation.
- Reference related Scripture when it adds clarity, but don't overwhelm.
- You can end with a reflective question, but don't force one every time.`;
}

// ============ Context Builder ============

export function buildVerseContext(ref: BibleReference, verse: BibleVerse): HermeneuticalContext {
  const fullReference = `${ref.book} ${ref.chapter}:${verse.number}`;

  return {
    book: ref.book,
    chapter: ref.chapter,
    verse,
    fullReference,
  };
}

/**
 * Build a user-facing prompt to pre-fill in chat when "Ask Sophia" is tapped.
 */
export function buildAskSophiaPrompt(ref: BibleReference, verse: BibleVerse): string {
  return `Help me understand ${ref.book} ${ref.chapter}:${verse.number} — "${verse.text}"`;
}
