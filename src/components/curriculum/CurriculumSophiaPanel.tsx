import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Lightbulb, Heart, BookOpen, HelpCircle } from 'lucide-react';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useConversations } from '@/hooks/useConversations';
import { useDarkMode } from '@/components/layout/DarkModeContext';
import { getQuizData } from '@/lib/onboardingState';
import type { Message } from '@/types/chat';
import type { Lesson } from '@/types/curriculum';
import type { LucideIcon } from 'lucide-react';
import type { BibleReference } from '@/lib/bibleApi';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

// ============ Starter Cards ============

interface StarterCard {
  icon: LucideIcon;
  label: string;
  description: string;
  prompt: string;
}

function getStarters(lesson: Lesson): StarterCard[] {
  const starters: StarterCard[] = [
    {
      icon: Lightbulb,
      label: 'Explain the key concepts',
      description: 'Understand the main ideas and takeaways from this lesson.',
      prompt: `Explain the key concepts from the lesson "${lesson.title}".`,
    },
    {
      icon: Heart,
      label: 'How does this apply to my life?',
      description: 'See how these teachings connect to your everyday life.',
      prompt: `How does the lesson "${lesson.title}" apply to my everyday life?`,
    },
  ];

  if (lesson.scriptureRefs && lesson.scriptureRefs.length > 0) {
    const refs = lesson.scriptureRefs.map((r) => r.label).join(', ');
    starters.push({
      icon: BookOpen,
      label: 'What does Scripture say about this?',
      description: 'Explore the biblical passages referenced in this lesson.',
      prompt: `What does Scripture say about the topics in "${lesson.title}"? The lesson references ${refs}.`,
    });
  }

  starters.push({
    icon: HelpCircle,
    label: 'I have a question about this lesson',
    description: 'Get help understanding something specific.',
    prompt: `I have a question about the lesson "${lesson.title}". Can you help me understand it better?`,
  });

  return starters;
}

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
      className={`flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-200 cursor-text ${
        isFocused
          ? 'bg-white/95 dark:bg-wl-olive-300/14 ring-2 ring-wl-olive/15 dark:ring-wl-olive-300/30 shadow-sm'
          : 'bg-white/85 dark:bg-wl-olive-300/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none hover:ring-1 hover:ring-wl-olive/10 dark:hover:ring-wl-olive-300/20'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <label className="sr-only" htmlFor="sophia-curriculum-input">Ask Sophia</label>
      <input
        id="sophia-curriculum-input"
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

interface CurriculumSophiaPanelProps {
  lesson: Lesson;
  onDismiss: () => void;
  initialPrompt?: string;
}

export function CurriculumSophiaPanel({ lesson, onDismiss, initialPrompt }: CurriculumSophiaPanelProps) {
  const navigate = useNavigate();
  const isDarkMode = useDarkMode();
  const scrollRef = useRef<HTMLDivElement>(null);
  const convIdRef = useRef<string | null>(null);
  const initialPromptSent = useRef(false);

  const quizData = getQuizData();
  const { createConversation } = useConversations();

  const { messages, isTyping, sendMessage } = useSophiaChat({
    conversationId: convIdRef.current,
  });

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // Create conversation on first message
    if (!convIdRef.current) {
      const title = `Curriculum: ${lesson.title}`;
      const conv = await createConversation(title, 'curriculum-lesson', quizData.spiritualBackground || undefined);
      if (conv) {
        convIdRef.current = conv.id;
      }
    }

    await sendMessage(trimmed);
  };

  // Auto-send initialPrompt on mount
  useEffect(() => {
    if (initialPrompt && !initialPromptSent.current) {
      initialPromptSent.current = true;
      handleSend(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  // Navigate to Bible page when a passage reference is clicked
  const handlePassageClick = (ref: BibleReference) => {
    navigate('/bible', {
      state: { initialReference: ref, conversationId: convIdRef.current },
    });
  };

  const hasMessages = messages.length > 0;
  const starters = getStarters(lesson);

  return (
    <div className="h-full flex flex-col relative glass-card !rounded-none !border-0 !shadow-none border-l border-border/30">
      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-foreground/60" />
      </button>

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
                <h2 className="text-2xl leading-snug text-foreground">
                  Let's explore <span className="italic">this together</span>
                </h2>
                <p className="text-sm mt-1 text-foreground/40 italic max-w-[260px] leading-relaxed mx-auto">
                  {lesson.title}
                </p>
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

        {/* Input */}
        <div className="p-4 pt-2">
          <PillChatInput
            onSend={handleSend}
            isLoading={isTyping}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}
