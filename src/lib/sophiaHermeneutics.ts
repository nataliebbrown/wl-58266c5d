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

Respond using this multi-layered hermeneutical framework — but present it naturally and conversationally, not as a rigid list. Weave the layers together:

1. **Observation**: Start with what the text actually says. Note key words or phrases.
2. **Historical & Cultural Context**: Briefly share relevant background that illuminates the meaning for the original audience.
3. **Literary Context**: Show how this verse connects to its surrounding passage and the broader narrative of ${ctx.book}.
4. **Theological Significance**: Highlight what this reveals about God's character, humanity, or the redemptive story.
5. **Personal Reflection**: Close with a gentle, open-ended question or reflection prompt that helps the user connect this passage to their own life.

Guidelines:
- Keep your response conversational and warm, not academic or lecture-like.
- Use 3-5 short paragraphs maximum.
- Avoid listing the framework labels — just flow naturally through the layers.
- Reference related Scripture when it adds clarity, but don't overwhelm.
- End with one reflective question for the user to sit with.`;
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
