export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  isSavedInsight?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  topic?: string;
  personaCode?: string;
  messageCount: number;
}

export interface SuggestedTopic {
  id: string;
  title: string;
  prompt: string;
  category: 'daily' | 'exploration' | 'growth' | 'study';
}

export interface UserPersona {
  spiritualBackground: string;
  learningStyle: string;
  communityPreference: string;
  currentSeason: string;
}

// Crisis detection keywords
export const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'hurt myself', 'cutting', 'overdose',
  'abuse', 'being abused', 'domestic violence', 'violence',
  'hopeless', 'no reason to live', 'better off dead'
];

export function detectCrisis(message: string): { detected: boolean; level: 'low' | 'medium' | 'high' } {
  const lowerMessage = message.toLowerCase();
  
  const highRisk = ['suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 'better off dead'];
  const mediumRisk = ['self-harm', 'hurt myself', 'cutting', 'overdose', 'abuse', 'being abused'];
  
  for (const keyword of highRisk) {
    if (lowerMessage.includes(keyword)) {
      return { detected: true, level: 'high' };
    }
  }
  
  for (const keyword of mediumRisk) {
    if (lowerMessage.includes(keyword)) {
      return { detected: true, level: 'medium' };
    }
  }
  
  for (const keyword of CRISIS_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      return { detected: true, level: 'low' };
    }
  }
  
  return { detected: false, level: 'low' };
}

// Default suggested topics based on persona
export function getSuggestedTopics(persona?: UserPersona): SuggestedTopic[] {
  const defaultTopics: SuggestedTopic[] = [
    {
      id: '1',
      title: "Today's Reading",
      prompt: "Help me reflect on my Bible reading today. I'd like to understand it more deeply.",
      category: 'daily'
    },
    {
      id: '2', 
      title: 'Finding Peace',
      prompt: "I'm feeling anxious today. Can we explore what Scripture says about finding peace?",
      category: 'growth'
    },
    {
      id: '3',
      title: 'Understanding Grace',
      prompt: "I want to understand the concept of grace better. Can you help me explore this?",
      category: 'exploration'
    },
    {
      id: '4',
      title: 'Sermon Preparation',
      prompt: "I'm preparing a message. Can you help me study a passage in depth?",
      category: 'study'
    }
  ];

  // Customize based on persona
  if (persona?.spiritualBackground === 'new_to_faith') {
    return [
      {
        id: '1',
        title: 'Start Here',
        prompt: "I'm new to the Bible. Where should I start reading?",
        category: 'exploration'
      },
      {
        id: '2',
        title: 'Basic Questions',
        prompt: "I have some basic questions about Christianity. Can we discuss them?",
        category: 'exploration'
      },
      ...defaultTopics.slice(0, 2)
    ];
  }

  if (persona?.spiritualBackground === 'pastor_leader') {
    return [
      {
        id: '1',
        title: 'Sermon Study',
        prompt: "Help me do an exegetical study for my upcoming sermon.",
        category: 'study'
      },
      {
        id: '2',
        title: 'Counseling Wisdom',
        prompt: "I need scriptural wisdom for a counseling situation.",
        category: 'growth'
      },
      ...defaultTopics.slice(0, 2)
    ];
  }

  return defaultTopics;
}