import type { SpiritualBackground } from '@/types/onboarding';

// ============ First Visit Greeting ============

export interface SophiaGreeting {
  paragraphs: string[];
  closingPrompt: string;
}

const greetings: Record<SpiritualBackground | 'default', SophiaGreeting> = {
  new_to_faith: {
    paragraphs: [
      "Welcome! I'm Sophia, and I'm so glad you're here.",
      "Starting a faith journey can feel overwhelming, but you don't have to figure it all out at once. I'm here to walk alongside you \u2014 no pressure, no judgment, just honest exploration together.",
      "We can start wherever you'd like. Is there something that sparked your curiosity about faith, or would you like me to suggest a place to begin?",
    ],
    closingPrompt: "What's on your mind?",
  },
  believer_going_deeper: {
    paragraphs: [
      "Welcome! I'm Sophia, your companion for deeper exploration.",
      "I can tell you have a rich foundation. Sometimes the most exciting discoveries come when we revisit familiar passages with fresh eyes, or when we follow a thread we've never noticed before.",
      "What's been stirring in your heart lately? A passage you keep returning to? A question that won't let go?",
    ],
    closingPrompt: "I'm ready to explore with you.",
  },
  pastor_leader: {
    paragraphs: [
      "Welcome! I'm Sophia, and I'm here to serve your ministry.",
      "I know the weight of shepherding others. Whether you're preparing a message, seeking wisdom for a counseling situation, or simply need space to tend your own soul, I'm here for all of it.",
      "What can I help you with today?",
    ],
    closingPrompt: "Here are some ways we could start:",
  },
  seminary_student: {
    paragraphs: [
      "Welcome! I'm Sophia, your research companion.",
      "I love the depth you bring to studying Scripture. I can help with original language exploration, historical context, theological connections, and working through complex interpretive questions.",
      "What are you studying right now? Or is there a passage or concept you'd like to dig into?",
    ],
    closingPrompt: "Let's get to work.",
  },
  exploring_faith: {
    paragraphs: [
      "Welcome! I'm Sophia, and I'm genuinely glad you're here.",
      "This is a safe space for honest questions \u2014 the kind you might hesitate to ask elsewhere. There's no agenda here, just real conversation about real questions. You set the pace.",
      "What brought you here today? Is there something specific you're wondering about, or would you prefer I suggest a starting point?",
    ],
    closingPrompt: "Whatever you bring, it's welcome here.",
  },
  default: {
    paragraphs: [
      "Welcome! I'm Sophia, and I'm so glad you're here.",
      "I'm here to explore faith, Scripture, and life's big questions with you. There's no agenda \u2014 just conversation at whatever pace feels right.",
      "What's been on your heart lately? Or if you'd prefer, here are some places we could start:",
    ],
    closingPrompt: "",
  },
};

export function getPersonaGreeting(background?: SpiritualBackground | string | null): SophiaGreeting {
  if (background && background in greetings) {
    return greetings[background as SpiritualBackground];
  }
  return greetings.default;
}

// ============ Topic Suggestions by Persona ============

export interface PersonaTopic {
  id: string;
  title: string;
  prompt: string;
}

const personaTopics: Record<SpiritualBackground | 'default', PersonaTopic[]> = {
  new_to_faith: [
    { id: 'nf-1', title: 'Where to Start', prompt: "I'm new to the Bible. Where should I start reading?" },
    { id: 'nf-2', title: 'Basic Questions', prompt: "I have some basic questions about Christianity. Can we discuss them?" },
    { id: 'nf-3', title: 'Who is Jesus?', prompt: "Can you help me understand who Jesus is and why he matters?" },
    { id: 'nf-4', title: 'Prayer', prompt: "I want to learn about prayer. How do I start?" },
  ],
  believer_going_deeper: [
    { id: 'bd-1', title: 'Fresh Eyes on Scripture', prompt: "Help me look at a familiar passage with fresh eyes today." },
    { id: 'bd-2', title: 'Spiritual Disciplines', prompt: "I want to grow in spiritual disciplines. Where should I focus?" },
    { id: 'bd-3', title: 'Wrestling with Doubt', prompt: "Even mature believers have doubts. Can we talk about that?" },
    { id: 'bd-4', title: 'Living Out Faith', prompt: "How do I better integrate my faith into daily life?" },
  ],
  pastor_leader: [
    { id: 'pl-1', title: 'Sermon Study', prompt: "Help me do an exegetical study for my upcoming sermon." },
    { id: 'pl-2', title: 'Counseling Wisdom', prompt: "I need scriptural wisdom for a counseling situation." },
    { id: 'pl-3', title: 'Leadership Challenges', prompt: "I'm facing a leadership challenge in my ministry. Can we explore what Scripture says?" },
    { id: 'pl-4', title: 'Personal Renewal', prompt: "I need to tend my own soul. Can you guide me through a personal reflection?" },
  ],
  seminary_student: [
    { id: 'ss-1', title: 'Exegesis Help', prompt: "Help me with an exegetical study of a passage I'm working on." },
    { id: 'ss-2', title: 'Theological Concept', prompt: "I'm studying a theological concept and want to explore it more deeply." },
    { id: 'ss-3', title: 'Original Languages', prompt: "Can you help me understand the original language behind a key term?" },
    { id: 'ss-4', title: 'Historical Context', prompt: "I need help understanding the historical context of a passage." },
  ],
  exploring_faith: [
    { id: 'ef-1', title: 'Honest Questions', prompt: "I have some honest questions about faith. Is this a safe place to ask?" },
    { id: 'ef-2', title: 'Science & Faith', prompt: "How do science and faith relate to each other?" },
    { id: 'ef-3', title: 'Suffering & God', prompt: "If God is good, why is there so much suffering?" },
    { id: 'ef-4', title: "Just Curious", prompt: "I'm just curious about Christianity. Can you tell me what it's really about?" },
  ],
  default: [
    { id: 'd-1', title: "Today's Reading", prompt: "Help me reflect on my Bible reading today." },
    { id: 'd-2', title: 'Finding Peace', prompt: "I'm looking for peace today. What does Scripture say about that?" },
    { id: 'd-3', title: 'Understanding Grace', prompt: "I want to understand the concept of grace better." },
    { id: 'd-4', title: 'Life Questions', prompt: "I have some questions about how faith connects to real life." },
  ],
};

export function getPersonaTopics(background?: SpiritualBackground | string | null): PersonaTopic[] {
  if (background && background in personaTopics) {
    return personaTopics[background as SpiritualBackground];
  }
  return personaTopics.default;
}
