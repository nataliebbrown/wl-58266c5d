import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, ArrowRight, BookOpen, Compass, Heart, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useConversations } from '@/hooks/useConversations';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { useTimePeriod } from '@/lib/timeAwareness';
import { getQuizData } from '@/lib/onboardingState';
import { getReadingHistory } from '@/lib/bibleApi';
import type { BibleReference } from '@/lib/bibleApi';
import { getProgressPercentage } from '@/lib/curriculum/curriculumProgress';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import { getUserContext, generateDashboardMessage } from '@/lib/contextualIntelligence';
import type { Message } from '@/types/chat';
import type { LucideIcon } from 'lucide-react';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';
import { useVoiceInput } from '@/hooks/useVoiceInput';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

// ============ Conversation Starters ============

interface StarterCard {
  icon: LucideIcon;
  label: string;
  description: string;
  prompt: string;
}

const STARTERS: Record<string, StarterCard[]> = {
  new_to_faith: [
    { icon: BookOpen, label: 'Where do I start reading?', description: 'Find a beginner-friendly place to start exploring Scripture.', prompt: 'Where should I start reading the Bible as someone new to faith?' },
    { icon: Compass, label: 'Who is Jesus?', description: 'Learn about who Jesus is and why He matters.', prompt: 'Can you help me understand who Jesus is and why He matters?' },
    { icon: Heart, label: 'What does faith mean?', description: 'Understand what it means to believe and trust God.', prompt: 'What does it actually mean to have faith? I\'m just starting out.' },
    { icon: Sparkles, label: 'How do I pray?', description: 'A gentle introduction to talking with God.', prompt: 'How do I pray? I\'ve never really done it before.' },
  ],
  believer_going_deeper: [
    { icon: BookOpen, label: 'Study a passage deeply', description: 'Dive into a passage with context, meaning, and reflection.', prompt: 'Can you help me study a passage of Scripture more deeply today?' },
    { icon: Compass, label: 'Explore a biblical theme', description: 'Trace a thread like grace, covenant, or redemption across Scripture.', prompt: 'I\'d like to explore a biblical theme — what themes are worth going deeper on?' },
    { icon: Heart, label: 'Grow spiritually', description: 'Practical steps to deepen your relationship with God.', prompt: 'What are practical ways I can grow deeper in my relationship with God?' },
    { icon: Sparkles, label: 'Old & New Testament connections', description: 'See how the full biblical narrative fits together.', prompt: 'How does the Old Testament connect to the New Testament? Help me see the big picture.' },
  ],
  pastor_leader: [
    { icon: BookOpen, label: 'Prepare a teaching', description: 'Explore a passage for your next sermon or lesson.', prompt: 'I\'m preparing a teaching — can you help me explore a passage for my sermon or lesson?' },
    { icon: Compass, label: 'Leadership in Scripture', description: 'What the Bible teaches about leading with integrity.', prompt: 'What does Scripture teach about leading with integrity and humility?' },
    { icon: Heart, label: 'Care for my own soul', description: 'Nurture your own spiritual health while serving others.', prompt: 'As a leader, how do I take care of my own spiritual health while serving others?' },
    { icon: Sparkles, label: 'Difficult texts', description: 'Work through a challenging or controversial passage.', prompt: 'Can you help me work through a difficult or controversial passage in Scripture?' },
  ],
  seminary_student: [
    { icon: BookOpen, label: 'Exegete a passage', description: 'Walk through observation, context, and meaning.', prompt: 'Can you help me do an exegetical study of a passage I\'m working on?' },
    { icon: Compass, label: 'Trace a theological theme', description: 'Follow a thread like covenant or kingdom across Scripture.', prompt: 'Help me trace a theological theme across Scripture — like covenant, redemption, or kingdom.' },
    { icon: Heart, label: 'From study to devotion', description: 'Keep your devotional life alive during intense study.', prompt: 'How do I keep my personal devotional life alive while doing intense academic study?' },
    { icon: Sparkles, label: 'Historical context deep dive', description: 'Uncover the world behind the text.', prompt: 'Can you give me the historical and cultural context behind a passage I\'m studying?' },
  ],
  exploring_faith: [
    { icon: BookOpen, label: 'What is the Bible about?', description: 'Get the big picture of what Scripture is and why it matters.', prompt: 'What is the Bible actually about? Give me the big picture.' },
    { icon: Compass, label: 'I have questions', description: 'Bring your honest questions — no judgment here.', prompt: 'I have some honest questions about faith. Can we talk through them?' },
    { icon: Heart, label: 'Does God care about me?', description: 'What the Bible says about God\u2019s love for you personally.', prompt: 'Does God actually care about individual people? What does the Bible say?' },
    { icon: Sparkles, label: 'Tell me a story', description: 'Hear an interesting story from the Bible you might not know.', prompt: 'Tell me an interesting story from the Bible that I might not have heard before.' },
  ],
};

// ============ Season-based Sublines ============

const SEASON_SUBLINES: Record<string, string> = {
  deeper_relationship: "Let's draw closer to God together today.",
  questions_doubts: 'Your questions are welcome here.',
  difficult_situation: "Whatever you're carrying, you don't have to carry it alone.",
  ministry_preparation: "Let's prepare something meaningful for those you serve.",
  understand_bible: "Let's open Scripture and see what we find.",
  spiritual_growth: 'Every conversation is a step forward.',
};

const DEFAULT_STARTERS: StarterCard[] = [
  { icon: BookOpen, label: 'Explore Scripture', description: 'Find a meaningful passage to read and reflect on today.', prompt: 'Can you help me explore a passage of Scripture today?' },
  { icon: Compass, label: 'What should I read next?', description: 'Get a personalized suggestion based on your journey.', prompt: 'What should I read next in the Bible based on where I am in my journey?' },
  { icon: Heart, label: 'I need encouragement', description: 'Let Scripture speak hope and comfort into your day.', prompt: 'I could use some encouragement today. What does Scripture say about hope?' },
  { icon: Sparkles, label: 'Teach me something new', description: 'Discover something surprising or beautiful from the Bible.', prompt: 'Teach me something surprising or beautiful from the Bible that I might not know.' },
];

// ============ Mini Chat Bubble ============

function MiniChatBubble({ message, onPassageClick }: { message: Message; onPassageClick?: (ref: BibleReference, rawText: string) => void }) {
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
        {isUser ? message.content : renderSophiaMarkdown(message.content, { onPassageClick })}
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
      <label className="sr-only" htmlFor="sophia-chat-input">Ask Sophia</label>
      <input
        id="sophia-chat-input"
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

// ============ Main Panel ============

export function DashboardSophiaPanel() {
  const isDarkMode = useDarkMode();
  const navigate = useNavigate();
  const { config } = useTimePeriod();
  const { getPersonaFromOnboarding } = useUserProfile();
  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || null;
  const scrollRef = useRef<HTMLDivElement>(null);
  const convIdRef = useRef<string | null>(null);

  const quizData = getQuizData();
  const { createConversation } = useConversations();

  const { messages, isTyping, sendMessage } = useSophiaChat({
    conversationId: convIdRef.current,
  });

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // Create conversation on first message
    if (!convIdRef.current) {
      const title = trimmed.length > 60 ? trimmed.slice(0, 60) + '…' : trimmed;
      const conv = await createConversation(title, 'dashboard', quizData.spiritualBackground || undefined);
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

  // Navigate to Bible page when a passage reference is clicked
  const handlePassageClick = (ref: BibleReference) => {
    navigate('/bible', {
      state: { initialReference: ref, conversationId: convIdRef.current },
    });
  };

  const hasMessages = messages.length > 0;

  const starters = STARTERS[quizData.spiritualBackground ?? ''] ?? DEFAULT_STARTERS;
  const readingHistory = getReadingHistory();
  const curriculum = getCurriculumForUser(quizData);
  const curriculumProgress = getProgressPercentage(curriculum);
  const isFirstVisit = readingHistory.length === 0 && curriculumProgress === 0;

  // Contextual greeting from intelligence system
  const userContext = getUserContext();
  const contextualMessage = generateDashboardMessage(userContext);

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      {/* Expand button */}
      <div className="absolute top-4 right-4 z-10">
        <ExpandButton onClick={() => navigate('/chat')} />
      </div>

      <div className="flex flex-col h-full">
        {/* Default state: Orb + Greeting + Starters */}
        {!hasMessages && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Fixed header: Orb + Greeting */}
            <div className="flex flex-col items-center text-center px-5 pt-8 pb-4">
              {/* Animated Orb */}
              <div className="mb-3">
                <Suspense fallback={<div className="w-24 h-24 rounded-full bg-foreground/[0.04] animate-pulse" />}>
                  <NoiseOrb
                    size={100}
                    preset="white"
                    noiseIntensity={0.3}
                    speed={0.6}
                  />
                </Suspense>
              </div>

              {/* Greeting */}
              <div className="mb-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-foreground/40 dark:text-wl-olive-300 mb-2">
                  Chat with Sophia
                </p>
                <h3 className="text-2xl leading-snug text-foreground">
                  {isFirstVisit ? (
                    <>
                      What's on your <span className="italic">heart today?</span>
                    </>
                  ) : (
                    <>
                      {salutation}
                      {userName && <> <span className="font-semibold">{userName}</span>,</>}
                    </>
                  )}
                </h3>
                <p
                  className="text-sm mt-1 text-foreground/40 italic max-w-[260px] leading-relaxed mx-auto"
                >
                  {isFirstVisit
                    ? "Ask me anything — about Scripture, faith, or whatever you're thinking about."
                    : contextualMessage}
                </p>
              </div>
            </div>

            {/* Scrollable content — starters */}
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
            className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
            style={{ minHeight: 0 }}
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <MiniChatBubble key={msg.id} message={msg} onPassageClick={handlePassageClick} />
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

        {/* Input + Link */}
        <div className="p-4 pt-2 space-y-3">
          <PillChatInput
            onSend={handleSend}
            isLoading={isTyping}
            isDarkMode={isDarkMode}
          />
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-1 text-xs font-medium text-foreground/40 hover:text-foreground/60 transition-colors mx-auto"
          >
            View full chat history
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
