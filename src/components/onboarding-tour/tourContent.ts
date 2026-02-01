// Persona-aware tour content for the dashboard welcome tour

// ============ Welcome Greeting (Step -1) ============

interface GreetingContent {
  intro: string;
  tourPrompt: string;
}

export const TOUR_GREETINGS: Record<string, GreetingContent> = {
  new_to_faith: {
    intro: "I'm your spiritual assistant — here to help you explore the Bible, understand faith, and grow at your own pace. I can answer your questions, walk you through Scripture, and offer encouragement whenever you need it. There's no wrong place to start.",
    tourPrompt: "I can give you a quick tour of everything, or you can jump in and explore on your own. What would you prefer?",
  },
  believer_going_deeper: {
    intro: "I'm your spiritual assistant — here to help you study Scripture more deeply, trace themes across the Bible, and grow in ways that matter. I can walk through passages with you, connect ideas across books, and help you apply what you're learning to your life.",
    tourPrompt: "I can show you around so you know where everything is, or you can start exploring right away. What sounds good?",
  },
  pastor_leader: {
    intro: "I'm your spiritual assistant — here to support both your personal growth and your ministry. I can help you prepare teachings, work through difficult passages, explore leadership themes in Scripture, and make sure you're caring for your own soul along the way.",
    tourPrompt: "I'd love to give you a quick tour, or you're welcome to dive right in. How would you like to start?",
  },
  seminary_student: {
    intro: "I'm your spiritual assistant — here to bring academic rigor and devotional depth together. I can help with exegesis, trace theological themes across Scripture, provide historical context, and ensure your studies nourish your spirit as much as your mind.",
    tourPrompt: "I can walk you through what's here, or you can start exploring on your own. Which do you prefer?",
  },
  exploring_faith: {
    intro: "I'm your spiritual assistant — here to create a safe space for honest questions and real exploration. I can help you understand what the Bible is about, talk through doubts without judgment, and share stories and ideas that might surprise you. No pressure, just conversation.",
    tourPrompt: "I can show you around first, or you can explore at your own pace. What feels right?",
  },
  default: {
    intro: "I'm your spiritual assistant — here to help you explore Scripture, answer questions, and walk alongside you wherever you are in your journey. Think of me as a companion for reflection, study, and growth.",
    tourPrompt: "I can give you a quick tour of everything, or you can jump in and start exploring. What would you like to do?",
  },
};

// ============ Tour Step Messages (Steps 0–2) ============

interface StepMessages {
  sophia: string;
  scripture: string;
  curriculum: string;
}

export const TOUR_STEPS: Record<string, StepMessages> = {
  new_to_faith: {
    sophia:
      "This is your conversation space with me. You can chat with me anytime — ask questions about faith, talk through something you're feeling, or just explore ideas together. Think of it like texting a friend who's always available and never judges. Every conversation helps me understand you better so I can guide you more personally.",
    scripture:
      "This is your Bible reader. I've selected some beginner-friendly passages to start with, but you can explore any book or chapter. As you read, I'm right there with you — tap any passage and I'll help explain it, give context, or connect it to what you're learning. This is where your understanding of Scripture grows, one passage at a time.",
    curriculum:
      "This is your personal learning path — a step-by-step course I've built around your goals. Each lesson introduces a new idea, walks you through it, and helps you apply it to your life. It's designed to build on itself, so the further you go, the more everything starts to connect.",
  },
  believer_going_deeper: {
    sophia:
      "This is your conversation space with me. You can chat with me anytime — dig into a passage, explore a theological question, or process something you've been thinking about. I remember our conversations, so over time I'll understand your journey and offer more relevant insights. Every chat deepens our work together.",
    scripture:
      "This is your Bible reader. Explore any book, chapter, or verse — and I'll be right alongside you with cross-references, historical context, and deeper connections across Scripture. As you read consistently, I'll start surfacing themes and patterns that are meaningful to where you are right now.",
    curriculum:
      "This is your personal learning path — designed to stretch your understanding and connect ideas across Scripture. Each lesson builds on the last, taking you deeper into themes that matter for your growth. It's structured but flexible — go at your own pace, and I'll guide you through every step.",
  },
  pastor_leader: {
    sophia:
      "This is your conversation space with me. Whether you're preparing a sermon, processing a pastoral situation, or just needing to be fed yourself — I'm here. You can talk through difficult passages, explore leadership themes, or simply reflect. I remember our conversations, so I can support both your ministry and your personal walk over time.",
    scripture:
      "This is your Bible reader — for personal devotion and ministry preparation. Explore any passage with commentary, cross-references, and historical context. I can help you see a text through both a devotional and a teaching lens, so the same passage nourishes you and equips you to serve others.",
    curriculum:
      "This is your personal learning path — practical theology, pastoral care, and spiritual depth woven together. Each lesson is designed for leaders like you, balancing the demands of ministry with the need to care for your own soul. Work through it at your own pace — I'll guide you through every step.",
  },
  seminary_student: {
    sophia:
      "This is your conversation space with me. Bring your exegetical questions, theological puzzles, or anything you're working through in your studies. I can help with original language analysis, trace themes across the canon, provide historical-critical context, or simply talk through a difficult concept. Every conversation builds on the last.",
    scripture:
      "This is your Bible reader — built for serious study. Open any text and I'll provide the exegetical depth your work demands: cross-references, historical context, literary structure, and theological connections. As you read consistently, I'll help you see patterns and themes that enrich both your academic work and your spiritual life.",
    curriculum:
      "This is your personal learning path — rigorous content that connects academic study with spiritual formation. Each lesson is designed to challenge your thinking while nourishing your spirit. It builds progressively, so the further you go, the more your studies and your faith inform each other.",
  },
  exploring_faith: {
    sophia:
      "This is your conversation space with me. You can ask anything here — about faith, doubt, the Bible, or life in general. There's no agenda and no pressure. I'm here to have honest conversations, share ideas that might surprise you, and let you explore at your own pace. Every chat is completely judgment-free.",
    scripture:
      "This is your Bible reader. The Bible can feel overwhelming, so I've picked some entry points that are genuinely interesting and accessible. As you read, I'm right there to explain things, answer questions, and give you the backstory. You might be surprised by what you find — start wherever feels right.",
    curriculum:
      "This is your personal learning path — a gentle, step-by-step journey designed for explorers like you. Each lesson opens a new window into what faith is really about, without assumptions or pressure. It builds on itself, so the more you explore, the more the pieces start to make sense.",
  },
  default: {
    sophia:
      "This is your conversation space with me. You can chat with me anytime — ask questions, think through ideas, or just talk. I remember our conversations, so over time I'll understand your journey and offer more relevant guidance. Think of this as having a thoughtful companion available whenever you need one.",
    scripture:
      "This is your Bible reader. Explore any book, chapter, or verse — and I'll be right alongside you with context, cross-references, and insights. I've prepared some starting points, but you can always browse on your own. The more you read, the more connections you'll discover across Scripture.",
    curriculum:
      "This is your personal learning path — a step-by-step course tailored to your journey. Each lesson is designed to build on the last, helping you grow in understanding and apply what you're learning to your life. Go at your own pace — I'll guide you through every step.",
  },
};

// ============ Finale / Closing (Step 3) ============

interface FinaleContent {
  text: string;
  cta: string;
  action: 'sophia' | 'scripture' | 'curriculum';
}

export const TOUR_FINALE: Record<string, FinaleContent> = {
  new_to_faith: {
    text: "You're all set. Whenever you're ready, I'd love to start a conversation — no preparation needed.",
    cta: 'Start a conversation',
    action: 'sophia',
  },
  believer_going_deeper: {
    text: "You're all set. Ready to open Scripture and see what God has for you today?",
    cta: 'Open Scripture',
    action: 'scripture',
  },
  pastor_leader: {
    text: "You're all set. Whether you're preparing to teach or needing to be fed yourself — let's begin.",
    cta: 'Start your curriculum',
    action: 'curriculum',
  },
  seminary_student: {
    text: "You're all set. Let's open the text and begin with some exegetical depth.",
    cta: 'Open Scripture',
    action: 'scripture',
  },
  exploring_faith: {
    text: "You're all set. Whenever you're ready, I'm here to talk — about anything at all.",
    cta: 'Start a conversation',
    action: 'sophia',
  },
  default: {
    text: "You're all set. Whenever you're ready, just start exploring.",
    cta: 'Start exploring',
    action: 'sophia',
  },
};

// ============ Tour Step Order ============

export const TOUR_STEP_ORDER = ['sophia-panel', 'scripture-card', 'curriculum-card'] as const;
export type TourStepId = (typeof TOUR_STEP_ORDER)[number];

// Map step id to the key used in TOUR_STEPS
export const STEP_TO_KEY: Record<TourStepId, keyof StepMessages> = {
  'sophia-panel': 'sophia',
  'scripture-card': 'scripture',
  'curriculum-card': 'curriculum',
};

export function getGreeting(persona: string | null): GreetingContent {
  return TOUR_GREETINGS[persona ?? ''] ?? TOUR_GREETINGS.default;
}

export function getStepMessage(persona: string | null, stepId: TourStepId): string {
  const steps = TOUR_STEPS[persona ?? ''] ?? TOUR_STEPS.default;
  return steps[STEP_TO_KEY[stepId]];
}

export function getFinale(persona: string | null): FinaleContent {
  return TOUR_FINALE[persona ?? ''] ?? TOUR_FINALE.default;
}
