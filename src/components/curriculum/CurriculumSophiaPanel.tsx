import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useConversations } from '@/hooks/useConversations';
import { getQuizData } from '@/lib/onboardingState';
import type { Message } from '@/types/chat';
import type { Lesson } from '@/types/curriculum';

interface CurriculumSophiaPanelProps {
  lesson: Lesson;
  onDismiss: () => void;
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-[#756653]/20 text-foreground'
            : 'bg-white/60 text-foreground'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

export function CurriculumSophiaPanel({ lesson, onDismiss }: CurriculumSophiaPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const convIdRef = useRef<string | null>(null);

  const quizData = getQuizData();
  const { createConversation } = useConversations();

  const { messages, isTyping, sendMessage } = useSophiaChat({
    conversationId: convIdRef.current,
  });

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    // Create conversation on first message
    if (!convIdRef.current) {
      const title = `Curriculum: ${lesson.title}`;
      const conv = await createConversation(title, 'curriculum-lesson', quizData.spiritualBackground || undefined);
      if (conv) {
        convIdRef.current = conv.id;
      }
    }

    setInputValue('');
    await sendMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const scriptureContext = lesson.scriptureRefs
    ?.map((ref) => ref.label)
    .join(', ');

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Ask Sophia</h3>
          <p className="text-xs text-foreground/50 truncate max-w-[200px]">
            {lesson.title}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 transition-colors"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ minHeight: 0 }}
      >
        {messages.length === 0 && (
          <div className="text-center text-foreground/40 text-sm pt-8 space-y-2">
            <p>Ask Sophia about this lesson.</p>
            {scriptureContext && (
              <p className="text-xs text-foreground/30">
                Scripture: {scriptureContext}
              </p>
            )}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

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
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/30">
        <div className="flex items-center gap-2 rounded-full px-4 py-2.5 bg-white/80" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this lesson..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/35"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="flex-shrink-0 p-1 transition-opacity disabled:opacity-20 opacity-50 hover:opacity-80"
          >
            <Send className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
