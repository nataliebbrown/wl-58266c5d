import { SpiritualBackground, LearningStyle } from './onboarding';

export interface FirstStepContent {
  headline: string;
  invitation: string;
  primaryCta: string;
  secondaryCta: string;
  primaryAction: 'wisdom-guide' | 'patterns' | 'languages' | 'alert';
  secondaryAction: 'wisdom-guide' | 'patterns' | 'alert';
  alertMessage?: string;
}

export const FIRST_STEP_CONTENT: Record<SpiritualBackground, FirstStepContent> = {
  new_to_faith: {
    headline: "Let's Start with Conversation",
    invitation: "Since you're new to faith, I'm here to answer any questions you have about the Bible, faith, or God. Nothing is too simple or too complex. What would you like to explore first?",
    primaryCta: "Talk with Sophia",
    secondaryCta: "Browse Topics",
    primaryAction: 'wisdom-guide',
    secondaryAction: 'alert',
    alertMessage: "Topic Browser coming in Phase 4!",
  },
  believer_going_deeper: {
    headline: "Ready to Discover Something New?",
    invitation: "You've been studying scripture for years. Let me show you biblical patterns and connections you've likely never noticed. Or we can dive into a deep conversation about what's on your heart.",
    primaryCta: "Discover Patterns",
    secondaryCta: "Deep Conversation",
    primaryAction: 'patterns',
    secondaryAction: 'wisdom-guide',
    alertMessage: "Pattern Discovery coming in Phase 6!",
  },
  pastor_leader: {
    headline: "Tools to Enhance Your Ministry",
    invitation: "As a ministry leader, you need tools that serve both your own growth and help you serve others. Let's start with resources for your next teaching or a conversation about leadership challenges.",
    primaryCta: "Prepare to Teach",
    secondaryCta: "Leadership Chat",
    primaryAction: 'wisdom-guide',
    secondaryAction: 'wisdom-guide',
  },
  seminary_student: {
    headline: "Deepen Your Academic Study",
    invitation: "Academic rigor meets spiritual formation. Explore original language insights, cultural context, and scholarly patterns. Where would you like to begin?",
    primaryCta: "Explore Languages",
    secondaryCta: "Academic Chat",
    primaryAction: 'languages',
    secondaryAction: 'wisdom-guide',
    alertMessage: "Translation Bridge coming in Phase 6!",
  },
  exploring_faith: {
    headline: "A Safe Space for Your Questions",
    invitation: "Exploring faith takes courage. This is a judgment-free space where you can ask anything, explore different perspectives, and discover what resonates with you.",
    primaryCta: "Ask a Question",
    secondaryCta: "Explore Stories",
    primaryAction: 'wisdom-guide',
    secondaryAction: 'alert',
    alertMessage: "Story Explorer coming in Phase 5!",
  },
};

export const PERSONA_SUBTITLES: Record<SpiritualBackground, string> = {
  new_to_faith: "Let's explore faith together",
  believer_going_deeper: "Ready to discover something new?",
  pastor_leader: "Tools to enhance your ministry",
  seminary_student: "Deepen your academic study",
  exploring_faith: "A safe space for your questions",
};

export const LEARNING_STYLE_MODIFIERS: Record<LearningStyle, { emphasis: string; icon?: string }> = {
  visual_learner: { emphasis: "visual", icon: "🎨" },
  conversation_discussion: { emphasis: "conversation", icon: "💬" },
  reading_reflection: { emphasis: "contemplative", icon: "📖" },
  hands_on_interactive: { emphasis: "interactive", icon: "🔧" },
  connections_patterns: { emphasis: "connections", icon: "🔗" },
};
