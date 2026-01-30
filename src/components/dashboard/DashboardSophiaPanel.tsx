import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, ArrowRight, BookOpen, Compass, Heart, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandButton } from '@/components/ui/ExpandButton';
import { useDrawerExpand } from './DrawerExpandContext';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useTimePeriod } from '@/lib/timeAwareness';
import { getQuizData } from '@/lib/onboardingState';
import type { Message } from '@/types/chat';
import type { LucideIcon } from 'lucide-react';

const Chat = lazy(() => import('@/pages/Chat'));
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
  ],
  believer_going_deeper: [
    { icon: BookOpen, label: 'Help me study a passage', prompt: 'Can you help me study a passage of Scripture more deeply today?' },
    { icon: Compass, label: 'Explore a biblical theme', prompt: 'I\'d like to explore a biblical theme — what themes are worth going deeper on?' },
    { icon: Heart, label: 'How do I grow spiritually?', prompt: 'What are practical ways I can grow deeper in my relationship with God?' },
    { icon: Sparkles, label: 'Connect the Old and New Testaments', prompt: 'How does the Old Testament connect to the New Testament? Help me see the big picture.' },
  ],
  pastor_leader: [
    { icon: BookOpen, label: 'Help me prepare a teaching', prompt: 'I\'m preparing a teaching — can you help me explore a passage for my sermon or lesson?' },
    { icon: Compass, label: 'Leadership wisdom from Scripture', prompt: 'What does Scripture teach about leading with integrity and humility?' },
    { icon: Heart, label: 'Caring for my own soul', prompt: 'As a leader, how do I take care of my own spiritual health while serving others?' },
    { icon: Sparkles, label: 'Walk through a difficult text', prompt: 'Can you help me work through a difficult or controversial passage in Scripture?' },
  ],
  seminary_student: [
    { icon: BookOpen, label: 'Exegete a passage', prompt: 'Can you help me do an exegetical study of a passage I\'m working on?' },
    { icon: Compass, label: 'Trace a theological theme', prompt: 'Help me trace a theological theme across Scripture — like covenant, redemption, or kingdom.' },
    { icon: Heart, label: 'From study to devotion', prompt: 'How do I keep my personal devotional life alive while doing intense academic study?' },
    { icon: Sparkles, label: 'Historical context deep dive', prompt: 'Can you give me the historical and cultural context behind a passage I\'m studying?' },
  ],
  exploring_faith: [
    { icon: BookOpen, label: 'What is the Bible about?', prompt: 'What is the Bible actually about? Give me the big picture.' },
    { icon: Compass, label: 'I have questions about faith', prompt: 'I have some honest questions about faith. Can we talk through them?' },
    { icon: Heart, label: 'Does God care about me?', prompt: 'Does God actually care about individual people? What does the Bible say?' },
    { icon: Sparkles, label: 'Tell me a story from the Bible', prompt: 'Tell me an interesting story from the Bible that I might not have heard before.' },
  ],
};

const DEFAULT_STARTERS: StarterCard[] = [
  { icon: BookOpen, label: 'Help me explore Scripture', prompt: 'Can you help me explore a passage of Scripture today?' },
  { icon: Compass, label: 'What should I read next?', prompt: 'What should I read next in the Bible based on where I am in my journey?' },
  { icon: Heart, label: 'I need encouragement', prompt: 'I could use some encouragement today. What does Scripture say about hope?' },
  { icon: Sparkles, label: 'Teach me something new', prompt: 'Teach me something surprising or beautiful from the Bible that I might not know.' },
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
            ? 'bg-[#756653]/20 text-foreground'
            : 'bg-white/60 text-foreground'
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
          ? (isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.95)')
          : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.85)'),
        boxShadow: isFocused
          ? (isDarkMode
              ? '0 0 0 2px rgba(117,102,83,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'
              : '0 0 0 2px rgba(117,102,83,0.15), 0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)')
          : (isDarkMode
              ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
              : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)'),
      }}
      onMouseEnter={(e) => {
        if (!isFocused) {
          e.currentTarget.style.boxShadow = isDarkMode
            ? '0 0 0 1px rgba(117,102,83,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 0 0 1px rgba(117,102,83,0.1), 0 2px 10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isFocused) {
          e.currentTarget.style.boxShadow = isDarkMode
            ? 'inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask Anything..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/35"
        style={{
          color: isDarkMode ? '#F4EFE6' : undefined,
        }}
      />
      <button
        className="flex-shrink-0 p-1 transition-opacity opacity-40 hover:opacity-70"
        style={{ color: isDarkMode ? '#F4EFE6' : '#5A4C3A' }}
      >
        <Mic className="w-5 h-5" />
      </button>
      <button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading}
        className="flex-shrink-0 p-1 transition-opacity disabled:opacity-20 opacity-40 hover:opacity-70"
        style={{ color: isDarkMode ? '#F4EFE6' : '#5A4C3A' }}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

// ============ Expanded Content ============

function ExpandedChat() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40">Loading...</div>}>
      <Chat embedded />
    </Suspense>
  );
}

// ============ Main Panel ============

interface DashboardSophiaPanelProps {
  isDarkMode: boolean;
}

export function DashboardSophiaPanel({ isDarkMode }: DashboardSophiaPanelProps) {
  const navigate = useNavigate();
  const { expand } = useDrawerExpand();
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
  const textColor = isDarkMode ? '#F4EFE6' : '#2D3748';

  const quizData = getQuizData();
  const starters = STARTERS[quizData.spiritualBackground ?? ''] ?? DEFAULT_STARTERS;

  return (
    <GlassCard padding="none" className="flex flex-col h-full overflow-hidden">
      {/* Expand button */}
      <div className="absolute top-4 right-4 z-10">
        <ExpandButton onClick={() => expand(<ExpandedChat />, 'chat')} />
      </div>

      <div className="flex flex-col h-full">
        {/* Default state: Orb + Greeting + Starters */}
        {!hasMessages && (
          <div className="flex-1 flex flex-col items-center text-center px-5 pt-8 min-h-0 overflow-hidden">
            {/* Animated Orb */}
            <div className="mb-4 flex-shrink-0">
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
            <h2
              className="text-2xl leading-snug mb-12 flex-shrink-0"
              style={{ color: textColor }}
            >
              {salutation}
              {userName && <> <span className="font-semibold">{userName}</span>,</>}
              <br />
              <span className="italic">What's on your mind?</span>
            </h2>

            {/* Conversation Starters — 2 rows × 2 columns */}
            <div className="grid grid-cols-2 gap-2.5 w-full flex-shrink-0">
              {starters.map((starter) => (
                <button
                  key={starter.label}
                  onClick={() => sendMessage(starter.prompt)}
                  className="flex flex-col items-center justify-center gap-2.5 rounded-xl px-4 py-5 text-center transition-all duration-200"
                  style={{
                    background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.14)' : 'rgba(117,102,83,0.2)';
                    e.currentTarget.style.boxShadow = isDarkMode
                      ? '0 2px 8px rgba(0,0,0,0.2)'
                      : '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)';
                    e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <starter.icon
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: isDarkMode ? 'rgba(244,239,230,0.5)' : '#756653', opacity: 0.7 }}
                  />
                  <span
                    className="text-[12px] leading-snug font-medium"
                    style={{ color: textColor, opacity: 0.7 }}
                  >
                    {starter.label}
                  </span>
                </button>
              ))}
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
                    className="w-1.5 h-1.5 rounded-full bg-[#756653]"
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
            className="flex items-center gap-1 text-xs font-medium opacity-50 hover:opacity-80 transition-opacity mx-auto"
            style={{ color: textColor }}
          >
            View full chat history
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
