import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, ArrowRight, BookOpen, Compass, Heart, Sparkles, HelpCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { useTimePeriod } from '@/lib/timeAwareness';
import { getQuizData } from '@/lib/onboardingState';
import { getReadingHistory } from '@/lib/bibleApi';
import { getProgressPercentage } from '@/lib/curriculum/curriculumProgress';
import { getCurriculumForUser } from '@/lib/curriculum/composeCurriculum';
import { getUserContext, generateDashboardMessage } from '@/lib/contextualIntelligence';
import type { Message } from '@/types/chat';
import type { LucideIcon } from 'lucide-react';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

// ============ Conversation Starters ============

interface StarterCard {
  icon: LucideIcon;
  label: string;
  prompt: string;
}

const STARTERS: Record<string, StarterCard[]> = {
  new_to_faith: [
    { icon: BookOpen, label: 'Where do I start reading the Bible?', prompt: 'Where should I start reading the Bible as someone new to faith?' },
    { icon: Compass, label: 'Who is Jesus?', prompt: 'Can you help me understand who Jesus is and why He matters?' },
    { icon: Heart, label: 'What does it mean to have faith?', prompt: 'What does it actually mean to have faith? I\'m just starting out.' },
    { icon: Sparkles, label: 'How do I pray?', prompt: 'How do I pray? I\'ve never really done it before.' },
    { icon: HelpCircle, label: "I don't know where to begin", prompt: "I'm not sure where to start or what to ask. Can you guide me?" },
  ],
  believer_going_deeper: [
    { icon: BookOpen, label: 'Help me study a passage', prompt: 'Can you help me study a passage of Scripture more deeply today?' },
    { icon: Compass, label: 'Explore a biblical theme', prompt: 'I\'d like to explore a biblical theme — what themes are worth going deeper on?' },
    { icon: Heart, label: 'How do I grow spiritually?', prompt: 'What are practical ways I can grow deeper in my relationship with God?' },
    { icon: Sparkles, label: 'Connect the Old and New Testaments', prompt: 'How does the Old Testament connect to the New Testament? Help me see the big picture.' },
    { icon: HelpCircle, label: "I don't know where to begin", prompt: "I want to go deeper but I'm not sure where to start. Can you guide me?" },
  ],
  pastor_leader: [
    { icon: BookOpen, label: 'Help me prepare a teaching', prompt: 'I\'m preparing a teaching — can you help me explore a passage for my sermon or lesson?' },
    { icon: Compass, label: 'Leadership wisdom from Scripture', prompt: 'What does Scripture teach about leading with integrity and humility?' },
    { icon: Heart, label: 'Caring for my own soul', prompt: 'As a leader, how do I take care of my own spiritual health while serving others?' },
    { icon: Sparkles, label: 'Walk through a difficult text', prompt: 'Can you help me work through a difficult or controversial passage in Scripture?' },
    { icon: HelpCircle, label: "I don't know where to begin", prompt: "I have a lot on my plate and I'm not sure where to start today. Can you help me figure that out?" },
  ],
  seminary_student: [
    { icon: BookOpen, label: 'Exegete a passage', prompt: 'Can you help me do an exegetical study of a passage I\'m working on?' },
    { icon: Compass, label: 'Trace a theological theme', prompt: 'Help me trace a theological theme across Scripture — like covenant, redemption, or kingdom.' },
    { icon: Heart, label: 'From study to devotion', prompt: 'How do I keep my personal devotional life alive while doing intense academic study?' },
    { icon: Sparkles, label: 'Historical context deep dive', prompt: 'Can you give me the historical and cultural context behind a passage I\'m studying?' },
    { icon: HelpCircle, label: "I don't know where to begin", prompt: "I'm feeling overwhelmed with my studies and not sure what to focus on. Can you help me prioritize?" },
  ],
  exploring_faith: [
    { icon: BookOpen, label: 'What is the Bible about?', prompt: 'What is the Bible actually about? Give me the big picture.' },
    { icon: Compass, label: 'I have questions about faith', prompt: 'I have some honest questions about faith. Can we talk through them?' },
    { icon: Heart, label: 'Does God care about me?', prompt: 'Does God actually care about individual people? What does the Bible say?' },
    { icon: Sparkles, label: 'Tell me a story from the Bible', prompt: 'Tell me an interesting story from the Bible that I might not have heard before.' },
    { icon: HelpCircle, label: "I don't know where to begin", prompt: "I'm curious but I don't really know where to start. Can you help me figure out what to explore first?" },
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
  { icon: BookOpen, label: 'Help me explore Scripture', prompt: 'Can you help me explore a passage of Scripture today?' },
  { icon: Compass, label: 'What should I read next?', prompt: 'What should I read next in the Bible based on where I am in my journey?' },
  { icon: Heart, label: 'I need encouragement', prompt: 'I could use some encouragement today. What does Scripture say about hope?' },
  { icon: Sparkles, label: 'Teach me something new', prompt: 'Teach me something surprising or beautiful from the Bible that I might not know.' },
  { icon: HelpCircle, label: "I don't know where to begin", prompt: "I'm not sure where to start or what to ask. Can you guide me?" },
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
        {message.content}
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
      <button
        aria-label="Voice input (coming soon)"
        disabled
        className="flex-shrink-0 p-1 text-foreground opacity-25 cursor-not-allowed"
      >
        <Mic className="w-5 h-5" />
      </button>
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

  const { messages, isTyping, sendMessage } = useSophiaChat();

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

  const hasMessages = messages.length > 0;

  const quizData = getQuizData();
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
            <div className="flex flex-col items-center text-center px-5 pt-6">
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
                <h3 className="text-2xl leading-snug text-foreground">
                  {isFirstVisit ? (
                    <>
                      Welcome{userName && <> <span className="font-semibold">{userName}</span></>},
                      <br />
                      <span className="italic">I'm Sophia.</span>
                    </>
                  ) : (
                    <>
                      {salutation}
                      {userName && <> <span className="font-semibold">{userName}</span>,</>}
                    </>
                  )}
                </h3>
                <p
                  className="text-sm mt-1 text-foreground/40 italic"
                >
                  {isFirstVisit
                    ? "I've prepared a few things for you — explore at your own pace."
                    : contextualMessage}
                </p>
              </div>
            </div>

            {/* Scrollable content — starters */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {starters.map((starter, index) => (
                  <button
                    key={starter.label}
                    onClick={() => sendMessage(starter.prompt)}
                    className={`flex items-center justify-center gap-3 rounded-xl px-5 py-5 border border-wl-olive/15 dark:border-wl-olive-300/15 hover:border-wl-olive/35 dark:hover:border-wl-olive-300/35 hover:bg-wl-olive/5 dark:hover:bg-wl-olive-300/5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40 transition-all duration-200 ${
                      index === starters.length - 1
                        ? 'sm:col-span-2 flex-row'
                        : 'flex-col text-center'
                    }`}
                  >
                    <starter.icon
                      className="w-5 h-5 flex-shrink-0 text-wl-olive/60 dark:text-wl-olive-300/60"
                    />
                    <span
                      className="text-base leading-snug font-semibold text-foreground/85 dark:text-wl-olive-200"
                    >
                      {starter.label}
                    </span>
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

        {/* Input + Link */}
        <div className="p-4 pt-2 space-y-3">
          <PillChatInput
            onSend={sendMessage}
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
