import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, X, BookOpen, Compass, Heart, Sparkles, HelpCircle, BookMarked, GraduationCap, Link2, MessageCircleQuestion } from 'lucide-react';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useConversations } from '@/hooks/useConversations';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { useTimePeriod } from '@/lib/timeAwareness';
import { getQuizData } from '@/lib/onboardingState';
import type { Message } from '@/types/chat';
import type { BibleReference } from '@/lib/bibleApi';
import type { LucideIcon } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

// ============ Types ============

interface ContextualSophiaPaneProps {
  onDismiss: () => void;
  initialPrompt?: string;
  context?: 'bible' | 'learn';
  bibleReference?: BibleReference | null;
}

interface StarterCard {
  icon: LucideIcon;
  label: string;
  description: string;
  prompt: string;
}

// ============ Persona-Aware Starters (same as DashboardSophiaPanel) ============

const STARTERS: Record<string, StarterCard[]> = {
  new_to_faith: [
    { icon: BookOpen, label: 'Where do I start reading?', description: 'Find a beginner-friendly place to start exploring Scripture.', prompt: 'Where should I start reading the Bible as someone new to faith?' },
    { icon: Compass, label: 'Who is Jesus?', description: 'Learn about who Jesus is and why He matters.', prompt: 'Can you help me understand who Jesus is and why He matters?' },
    { icon: Heart, label: 'What does faith mean?', description: 'Understand what it means to believe and trust God.', prompt: 'What does it actually mean to have faith? I\'m just starting out.' },
    { icon: Sparkles, label: 'How do I pray?', description: 'A gentle introduction to talking with God.', prompt: 'How do I pray? I\'ve never really done it before.' },
  ],
  believer_going_deeper: [
    { icon: BookOpen, label: 'Study a passage deeply', description: 'Dive into a passage with context, meaning, and reflection.', prompt: 'Can you help me study a passage of Scripture more deeply today?' },
    { icon: Compass, label: 'Explore a biblical theme', description: 'Trace a thread like grace, covenant, or redemption across Scripture.', prompt: 'I\'d like to explore a biblical theme \u2014 what themes are worth going deeper on?' },
    { icon: Heart, label: 'Grow spiritually', description: 'Practical steps to deepen your relationship with God.', prompt: 'What are practical ways I can grow deeper in my relationship with God?' },
    { icon: Sparkles, label: 'Old & New Testament connections', description: 'See how the full biblical narrative fits together.', prompt: 'How does the Old Testament connect to the New Testament? Help me see the big picture.' },
  ],
  pastor_leader: [
    { icon: BookOpen, label: 'Prepare a teaching', description: 'Explore a passage for your next sermon or lesson.', prompt: 'I\'m preparing a teaching \u2014 can you help me explore a passage for my sermon or lesson?' },
    { icon: Compass, label: 'Leadership in Scripture', description: 'What the Bible teaches about leading with integrity.', prompt: 'What does Scripture teach about leading with integrity and humility?' },
    { icon: Heart, label: 'Care for my own soul', description: 'Nurture your own spiritual health while serving others.', prompt: 'As a leader, how do I take care of my own spiritual health while serving others?' },
    { icon: Sparkles, label: 'Difficult texts', description: 'Work through a challenging or controversial passage.', prompt: 'Can you help me work through a difficult or controversial passage in Scripture?' },
  ],
  seminary_student: [
    { icon: BookOpen, label: 'Exegete a passage', description: 'Walk through observation, context, and meaning.', prompt: 'Can you help me do an exegetical study of a passage I\'m working on?' },
    { icon: Compass, label: 'Trace a theological theme', description: 'Follow a thread like covenant or kingdom across Scripture.', prompt: 'Help me trace a theological theme across Scripture \u2014 like covenant, redemption, or kingdom.' },
    { icon: Heart, label: 'From study to devotion', description: 'Keep your devotional life alive during intense study.', prompt: 'How do I keep my personal devotional life alive while doing intense academic study?' },
    { icon: Sparkles, label: 'Historical context deep dive', description: 'Uncover the world behind the text.', prompt: 'Can you give me the historical and cultural context behind a passage I\'m studying?' },
  ],
  exploring_faith: [
    { icon: BookOpen, label: 'What is the Bible about?', description: 'Get the big picture of what Scripture is and why it matters.', prompt: 'What is the Bible actually about? Give me the big picture.' },
    { icon: Compass, label: 'I have questions', description: 'Bring your honest questions \u2014 no judgment here.', prompt: 'I have some honest questions about faith. Can we talk through them?' },
    { icon: Heart, label: 'Does God care about me?', description: 'What the Bible says about God\u2019s love for you personally.', prompt: 'Does God actually care about individual people? What does the Bible say?' },
    { icon: Sparkles, label: 'Tell me a story', description: 'Hear an interesting story from the Bible you might not know.', prompt: 'Tell me an interesting story from the Bible that I might not have heard before.' },
  ],
};

const DEFAULT_STARTERS: StarterCard[] = [
  { icon: BookOpen, label: 'Explore Scripture', description: 'Find a meaningful passage to read and reflect on today.', prompt: 'Can you help me explore a passage of Scripture today?' },
  { icon: Compass, label: 'What should I read next?', description: 'Get a personalized suggestion based on your journey.', prompt: 'What should I read next in the Bible based on where I am in my journey?' },
  { icon: Heart, label: 'I need encouragement', description: 'Let Scripture speak hope and comfort into your day.', prompt: 'I could use some encouragement today. What does Scripture say about hope?' },
  { icon: Sparkles, label: 'Teach me something new', description: 'Discover something surprising or beautiful from the Bible.', prompt: 'Teach me something surprising or beautiful from the Bible that I might not know.' },
];

// ============ Context-Specific Starters ============

const GENERIC_BIBLE_STARTERS: StarterCard[] = [
  { icon: BookOpen, label: 'Where should I start?', description: 'Get a suggested passage to begin reading today.', prompt: 'I\'m not sure where to start reading the Bible today. Can you suggest a passage?' },
  { icon: BookMarked, label: 'Explore a theme', description: 'Trace a meaningful thread across Scripture.', prompt: 'Can you help me explore a meaningful theme across Scripture?' },
  { icon: Link2, label: 'Walk me through a book', description: 'Get an overview of a book and why it matters.', prompt: 'Can you give me an overview of a book of the Bible and why it matters?' },
  { icon: Heart, label: 'A passage for today', description: 'Find something that speaks to where you are right now.', prompt: 'What passage of Scripture would speak to where I am today?' },
];

function getPassageStarters(ref: BibleReference): StarterCard[] {
  const passage = `${ref.book} ${ref.chapter}`;
  return [
    { icon: BookOpen, label: `What is ${passage} about?`, description: 'Understand the key themes and message of this chapter.', prompt: `What is ${passage} about? Help me understand the key themes and message of this chapter.` },
    { icon: BookMarked, label: 'Historical context', description: `Who wrote it, when, and what was happening at the time.`, prompt: `What is the historical and cultural context behind ${passage}? Who wrote it, when, and what was happening at the time?` },
    { icon: Link2, label: 'Cross-references', description: 'See how this chapter connects to the rest of Scripture.', prompt: `How does ${passage} connect to other parts of Scripture? Show me key cross-references and how this chapter fits into the larger biblical narrative.` },
    { icon: Heart, label: 'Apply to my life', description: `How ${passage} speaks to your life today.`, prompt: `What practical application can I take from ${passage}? How does this chapter speak to my life today?` },
  ];
}

const LEARN_STARTERS: StarterCard[] = [
  { icon: GraduationCap, label: 'What should I study next?', description: 'Get a suggestion based on your progress so far.', prompt: 'Based on my progress, what should I study next in my curriculum?' },
  { icon: MessageCircleQuestion, label: 'Understand a concept', description: 'Go deeper on something from your current lesson.', prompt: 'Can you help me understand a concept from my current lesson more deeply?' },
  { icon: Link2, label: 'Connect to Scripture', description: 'See how your studies relate to specific passages.', prompt: 'How does what I\'m learning connect to specific passages in Scripture?' },
  { icon: HelpCircle, label: 'I have a question', description: 'Work through something you\u2019re stuck on.', prompt: 'I have a question about what I\'m learning. Can you help me work through it?' },
];

// ============ Mini Chat Bubble ============

function MiniChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? 'bg-wl-olive/20 dark:bg-wl-olive-300/20 text-foreground'
            : 'bg-white/60 dark:bg-wl-olive-300/15 text-foreground'
        }`}
        style={{ backdropFilter: 'blur(4px)' }}
      >
        {isUser ? message.content : renderSophiaMarkdown(message.content)}
      </div>
    </motion.div>
  );
}

// ============ Pill Chat Input ============

function PillChatInput({
  onSend,
  isLoading,
  isDarkMode,
}: {
  onSend: (msg: string) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isListening, toggleVoice, hasVoiceSupport } = useVoiceInput(
    (transcript) => setValue(transcript),
  );

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-200 cursor-text"
      onClick={() => inputRef.current?.focus()}
      style={{
        background: isFocused
          ? (isDarkMode ? 'rgba(241,237,233,0.14)' : 'rgba(255,255,255,0.95)')
          : (isDarkMode ? 'rgba(241,237,233,0.1)' : 'rgba(255,255,255,0.85)'),
        boxShadow: isFocused
          ? (isDarkMode
              ? '0 0 0 2px rgba(178,164,146,0.3), inset 0 1px 0 rgba(241,237,233,0.08)'
              : '0 0 0 2px rgba(116,102,83,0.15), 0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)')
          : (isDarkMode
              ? 'inset 0 1px 0 rgba(241,237,233,0.06)'
              : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'),
      }}
      onMouseEnter={(e) => {
        if (!isFocused) {
          e.currentTarget.style.boxShadow = isDarkMode
            ? '0 0 0 1px rgba(178,164,146,0.2), inset 0 1px 0 rgba(241,237,233,0.08)'
            : '0 0 0 1px rgba(116,102,83,0.1), 0 2px 10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isFocused) {
          e.currentTarget.style.boxShadow = isDarkMode
            ? 'inset 0 1px 0 rgba(241,237,233,0.06)'
            : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
    >
      <label className="sr-only" htmlFor="sophia-contextual-input">Ask Sophia</label>
      <input
        id="sophia-contextual-input"
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask Anything..."
        className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-foreground/35"
      />
      {hasVoiceSupport && (
        <button
          onClick={(e) => { e.stopPropagation(); toggleVoice(); }}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          className={`flex-shrink-0 p-1 transition-opacity text-foreground ${
            isListening ? 'opacity-100 text-green-500 animate-pulse' : 'opacity-40 hover:opacity-70'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      )}
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        aria-label="Send message"
        className="flex-shrink-0 p-1 transition-opacity text-foreground disabled:opacity-20 opacity-40 hover:opacity-70"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

// ============ Main Component ============

export function ContextualSophiaPane({ onDismiss, initialPrompt, context, bibleReference }: ContextualSophiaPaneProps) {
  const isDarkMode = useDarkMode();
  const { config } = useTimePeriod();
  const { getPersonaFromOnboarding } = useUserProfile();
  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialPromptSentRef = useRef(false);
  const convIdRef = useRef<string | null>(null);

  const quizData = getQuizData();
  const { createConversation } = useConversations();

  // Build system context so Sophia knows what the user is currently viewing
  const systemContext = (() => {
    if (context === 'bible' && bibleReference) {
      const passage = `${bibleReference.book} ${bibleReference.chapter}`;
      return `The user is currently reading ${passage} in the Bible reader. When they ask about "this passage", "this chapter", or reference what they're reading, they are referring to ${passage}. Always reference ${passage} specifically in your responses. You can see they have this chapter open right now.`;
    }
    if (context === 'bible') {
      return 'The user is on the Bible page but has not opened a specific passage yet. Help them choose something to read or explore Scripture generally.';
    }
    return undefined;
  })();

  const { messages, isTyping, sendMessage } = useSophiaChat({
    systemContext,
    conversationId: convIdRef.current,
  });

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // Create conversation on first message
    if (!convIdRef.current) {
      const topic = context === 'bible' ? 'bible' : context === 'learn' ? 'learn' : 'general';
      const passage = bibleReference ? `${bibleReference.book} ${bibleReference.chapter}` : null;
      const title = passage ? `Bible: ${passage}` : trimmed.length > 60 ? trimmed.slice(0, 60) + '…' : trimmed;
      const conv = await createConversation(title, topic, quizData.spiritualBackground || undefined);
      if (conv) {
        convIdRef.current = conv.id;
      }
    }

    await sendMessage(trimmed);
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-send initialPrompt on mount
  useEffect(() => {
    if (initialPrompt && !initialPromptSentRef.current) {
      initialPromptSentRef.current = true;
      handleSend(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  // Time-based salutation
  const salutation = (() => {
    switch (config.period) {
      case 'dawn': return 'Good Morning';
      case 'morning': return 'Good Morning';
      case 'midday': return 'Good Afternoon';
      case 'evening': return 'Good Evening';
      case 'night': return 'Good Evening';
    }
  })();

  const hasMessages = messages.length > 0;

  // Determine which starters to use based on context
  const starters = (() => {
    if (context === 'bible') {
      return bibleReference ? getPassageStarters(bibleReference) : GENERIC_BIBLE_STARTERS;
    }
    if (context === 'learn') return LEARN_STARTERS;
    // No context: fall back to persona-aware starters
    const quizData = getQuizData();
    return STARTERS[quizData.spiritualBackground ?? ''] ?? DEFAULT_STARTERS;
  })();

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-foreground/60" />
      </button>

      {/* Default state: Orb + Greeting + Starters */}
      {!hasMessages && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Fixed header: Orb + Greeting */}
          <div className="flex flex-col items-center text-center px-5 pt-6">
            {/* Animated Orb */}
            <div className="mb-3">
              <Suspense fallback={<div className="w-[70px] h-[70px] rounded-full bg-foreground/[0.04] animate-pulse" />}>
                <NoiseOrb
                  size={70}
                  preset="white"
                  noiseIntensity={0.3}
                  speed={0.6}
                />
              </Suspense>
            </div>

            {/* Greeting */}
            <div className="mb-4">
              <h2
                className="text-2xl leading-snug text-foreground italic"
              >
                {context === 'bible' && bibleReference
                  ? `Let's explore ${bibleReference.book} ${bibleReference.chapter}`
                  : context === 'bible'
                  ? "Let's explore Scripture together"
                  : context === 'learn'
                  ? "Let's dive into your studies"
                  : "What's on your mind?"}
              </h2>
            </div>
          </div>

          {/* Scrollable content -- starters */}
          <div className="flex-1 overflow-y-auto px-5 py-3">
            <div className="flex flex-col gap-2.5 w-full">
              {starters.map((starter) => (
                <button
                  key={starter.label}
                  onClick={() => handleSend(starter.prompt)}
                  className="flex items-start gap-3.5 rounded-xl px-4 py-3.5 border border-wl-olive/15 dark:border-wl-olive-300/15 hover:border-wl-olive/35 dark:hover:border-wl-olive-300/35 hover:bg-wl-olive/5 dark:hover:bg-wl-olive-300/5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-all duration-200 text-left"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-wl-olive/20 dark:border-wl-olive-300/20 flex items-center justify-center mt-0.5">
                    <starter.icon
                      className="w-4 h-4 text-wl-olive/50 dark:text-wl-olive-300/50"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[15px] leading-snug font-semibold text-foreground/85 dark:text-wl-olive-200">
                      {starter.label}
                    </span>
                    <span className="block text-[13px] leading-snug mt-0.5 text-foreground/45 dark:text-wl-olive-300/50">
                      {starter.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat messages (visible once conversation starts) */}
      {hasMessages && (
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-2 pt-12"
          style={{ minHeight: 0 }}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <MiniChatBubble key={msg.id} message={msg} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 px-3 py-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-wl-olive dark:bg-wl-olive-300"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Input (no "View full chat history" link) */}
      <div className="p-4 pt-2">
        <PillChatInput
          onSend={handleSend}
          isLoading={isTyping}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
