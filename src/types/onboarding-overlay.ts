export interface TourStep {
  id: number;
  icon: string;
  title: string;
  description: string;
  personaVariations?: Record<string, string>;
}

export interface PathwayOption {
  id: string;
  icon: string;
  name: string;
  description: string;
  bestFor: string;
  route: string;
  color: 'terracotta' | 'sage' | 'ochre';
}

export interface OnboardingOverlayState {
  showTour: boolean;
  tourStep: number;
  showPathways: boolean;
  isTransitioning: boolean;
}

export const SOPHIA_GREETINGS: Record<string, string> = {
  'new_to_faith': "I see you're new to faith and the Bible. I'm here to make this journey welcoming and judgment-free. You can ask me anything, and we'll explore together at your own pace.",
  'believer_going_deeper': "After years of studying scripture, you're ready to go deeper. I'm here to help you discover patterns and connections you've never noticed, even in familiar passages.",
  'pastor_leader': "As a ministry leader, you need tools that serve both your own growth and help you serve others. Let me show you how Scripture AI can enhance your teaching and leadership.",
  'seminary_student': "Academic rigor meets spiritual formation here. I can help you explore original languages, scholarly patterns, and theological insights while deepening your personal walk.",
  'exploring_faith': "Exploring faith takes courage. This is a safe space where you can ask anything, challenge assumptions, and discover what resonates with you—no pressure, no judgment.",
  default: "Welcome to your spiritual formation journey. I'm here to guide you through meaningful discoveries and help you grow in your faith."
};

export const TOUR_RECOMMENDATIONS: Record<string, { text: string; cta: string; route: string }> = {
  'new_to_faith': {
    text: "Since you're new to faith, starting with a conversation makes the most sense. Ask me anything that's been on your mind, and we'll explore together.",
    cta: "Ask Sophia Anything",
    route: "/wisdom-guide"
  },
  'believer_going_deeper': {
    text: "With your years of experience, I think you'll find the most value in discovering biblical patterns you've never noticed. Let me show you something that will surprise you.",
    cta: "Discover Patterns",
    route: "/wisdom-guide"
  },
  'pastor_leader': {
    text: "As a leader, your time is valuable. Let's start by helping you prepare something practical—a teaching, a discussion, or processing a ministry challenge.",
    cta: "Prepare to Teach",
    route: "/wisdom-guide"
  },
  'seminary_student': {
    text: "Your academic mind will appreciate exploring how biblical concepts translate across languages and cultures. This is where scholarship meets formation.",
    cta: "Explore Languages",
    route: "/wisdom-guide"
  },
  'exploring_faith': {
    text: "The best way to explore is through honest conversation. Let's talk about whatever you're curious or uncertain about—completely judgment-free.",
    cta: "Start Exploring",
    route: "/wisdom-guide"
  },
  default: {
    text: "The best way to begin is with a conversation. Share what's on your heart, and we'll discover insights together.",
    cta: "Start Chatting",
    route: "/wisdom-guide"
  }
};

export const PERSONA_PATHWAYS: Record<string, PathwayOption[]> = {
  'new_to_faith': [
    {
      id: 'ask-questions',
      icon: 'HelpCircle',
      name: 'Ask Questions',
      description: 'No question is too simple. Start with what you\'re curious about.',
      bestFor: 'Beginners wanting safe exploration',
      route: '/wisdom-guide',
      color: 'terracotta'
    },
    {
      id: 'explore-together',
      icon: 'Compass',
      name: 'Explore Together',
      description: 'Let Sophia guide you through foundational concepts at your pace.',
      bestFor: 'Learning the basics step by step',
      route: '/wisdom-guide',
      color: 'sage'
    },
    {
      id: 'learn-stories',
      icon: 'BookOpen',
      name: 'Learn Through Stories',
      description: 'Discover biblical narratives that connect to your life.',
      bestFor: 'Visual and narrative learners',
      route: '/wisdom-guide',
      color: 'ochre'
    }
  ],
  'believer_going_deeper': [
    {
      id: 'discover-patterns',
      icon: 'Network',
      name: 'Discover Patterns',
      description: 'Uncover connections across scripture you\'ve never noticed.',
      bestFor: 'Deep study and fresh insights',
      route: '/wisdom-guide',
      color: 'terracotta'
    },
    {
      id: 'deep-conversation',
      icon: 'MessageCircle',
      name: 'Deep Conversation',
      description: 'Engage with Socratic dialogue that challenges and grows you.',
      bestFor: 'Theological reflection',
      route: '/wisdom-guide',
      color: 'sage'
    },
    {
      id: 'prepare-lead',
      icon: 'Users',
      name: 'Prepare to Lead',
      description: 'Get insights for teaching, mentoring, or group discussions.',
      bestFor: 'Sharing wisdom with others',
      route: '/wisdom-guide',
      color: 'ochre'
    }
  ],
  'pastor_leader': [
    {
      id: 'prepare-messages',
      icon: 'Presentation',
      name: 'Prepare Messages',
      description: 'Research and develop sermons, lessons, and teachings.',
      bestFor: 'Sermon and curriculum prep',
      route: '/wisdom-guide',
      color: 'terracotta'
    },
    {
      id: 'lead-groups',
      icon: 'Users',
      name: 'Lead Groups Better',
      description: 'Get discussion guides and facilitation support.',
      bestFor: 'Small group and Bible study leaders',
      route: '/wisdom-guide',
      color: 'sage'
    },
    {
      id: 'personal-growth',
      icon: 'Heart',
      name: 'Personal Growth',
      description: 'Nurture your own spiritual formation alongside ministry.',
      bestFor: 'Leaders who pour out and need refilling',
      route: '/wisdom-guide',
      color: 'ochre'
    }
  ],
  'seminary_student': [
    {
      id: 'original-languages',
      icon: 'Languages',
      name: 'Original Languages',
      description: 'Explore Hebrew and Greek meanings in context.',
      bestFor: 'Language study and exegesis',
      route: '/wisdom-guide',
      color: 'terracotta'
    },
    {
      id: 'theological-dialogue',
      icon: 'BookMarked',
      name: 'Theological Dialogue',
      description: 'Engage with systematic theology and doctrinal questions.',
      bestFor: 'Academic theological exploration',
      route: '/wisdom-guide',
      color: 'sage'
    },
    {
      id: 'research-themes',
      icon: 'Search',
      name: 'Research Themes',
      description: 'Trace concepts across canonical and historical contexts.',
      bestFor: 'Research and paper writing',
      route: '/wisdom-guide',
      color: 'ochre'
    }
  ],
  'exploring_faith': [
    {
      id: 'ask-anything',
      icon: 'MessageSquare',
      name: 'Ask Anything',
      description: 'No judgment, just honest exploration of your questions.',
      bestFor: 'Curious minds seeking truth',
      route: '/wisdom-guide',
      color: 'terracotta'
    },
    {
      id: 'biblical-stories',
      icon: 'Book',
      name: 'Biblical Stories',
      description: 'Discover narratives that have shaped billions of lives.',
      bestFor: 'Understanding through story',
      route: '/wisdom-guide',
      color: 'sage'
    },
    {
      id: 'different-views',
      icon: 'Scale',
      name: 'Different Views',
      description: 'Explore various perspectives on faith and meaning.',
      bestFor: 'Thoughtful comparison',
      route: '/wisdom-guide',
      color: 'ochre'
    }
  ],
  default: [
    {
      id: 'start-conversation',
      icon: 'MessageCircle',
      name: 'Start a Conversation',
      description: 'Begin with what\'s on your heart or mind.',
      bestFor: 'Open exploration',
      route: '/wisdom-guide',
      color: 'terracotta'
    },
    {
      id: 'explore-scripture',
      icon: 'BookOpen',
      name: 'Explore Scripture',
      description: 'Dive into passages and discover their meaning.',
      bestFor: 'Biblical study',
      route: '/wisdom-guide',
      color: 'sage'
    },
    {
      id: 'grow-spiritually',
      icon: 'Sparkles',
      name: 'Grow Spiritually',
      description: 'Focus on personal transformation and formation.',
      bestFor: 'Spiritual development',
      route: '/wisdom-guide',
      color: 'ochre'
    }
  ]
};

export const TOUR_STEP_CONTENT: Record<string, { description: string }> = {
  'new_to_faith': { description: "Instead of giving answers, I'll help you explore questions safely" },
  'believer_going_deeper': { description: "I ask sophisticated questions that push beyond surface-level study" },
  'pastor_leader': { description: "I help you prepare teachings and process ministry challenges" },
  'seminary_student': { description: "I engage with academic rigor while nurturing formation" },
  'exploring_faith': { description: "I create space for honest doubt and authentic exploration" },
  default: { description: "I use thoughtful questions to help you discover insights yourself" }
};
