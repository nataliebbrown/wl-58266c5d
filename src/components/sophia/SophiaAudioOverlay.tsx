import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SophiaAvatar } from '@/components/sophia/SophiaAvatar';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useConversations } from '@/hooks/useConversations';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useVoiceOutput } from '@/hooks/useVoiceOutput';
import { getQuizData } from '@/lib/onboardingState';
import type { Message } from '@/types/chat';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';

interface SophiaAudioOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  initialPrompt?: string;
}

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function OverlayChatBubble({ message }: { message: Message }) {
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

export function SophiaAudioOverlay({ isOpen, onClose, userName, initialPrompt }: SophiaAudioOverlayProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const convIdRef = useRef<string | null>(null);
  const prevIsTypingRef = useRef(false);
  const initialPromptSentRef = useRef(false);

  const quizData = getQuizData();
  const { createConversation } = useConversations();

  const { messages, isTyping, sendMessage } = useSophiaChat({
    conversationId: convIdRef.current,
  });

  const { isListening, toggleVoice, stopListening, hasVoiceSupport } = useVoiceInput(
    (transcript) => setInputValue(transcript),
  );

  const { speak, stop: stopSpeaking, isSpeaking } = useVoiceOutput();

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Stop speech and listening when overlay closes
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      stopListening();
      setInputValue('');
      // Reset conversation for next open
      convIdRef.current = null;
      initialPromptSentRef.current = false;
    }
  }, [isOpen, stopSpeaking, stopListening]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-speak Sophia's response when typing completes
  useEffect(() => {
    if (prevIsTypingRef.current && !isTyping && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'assistant') {
        speak(lastMsg.content);
      }
    }
    prevIsTypingRef.current = isTyping;
  }, [isTyping, messages, speak]);

  // Send initial prompt if provided
  useEffect(() => {
    if (isOpen && initialPrompt && !initialPromptSentRef.current) {
      initialPromptSentRef.current = true;
      handleSend(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  const handleSend = async (text?: string) => {
    const msg = (text || inputValue).trim();
    if (!msg || isTyping) return;

    // Stop listening when sending
    stopListening();

    // Create conversation on first message
    if (!convIdRef.current) {
      const title = msg.length > 60 ? msg.slice(0, 60) + '…' : msg;
      const conv = await createConversation(title, 'voice', quizData.spiritualBackground || undefined);
      if (conv) {
        convIdRef.current = conv.id;
      }
    }

    setInputValue('');
    await sendMessage(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const greeting = getTimeBasedGreeting();
  const displayName = userName || '';
  const hasMessages = messages.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-background/40 dark:bg-wl-earth-900/50 backdrop-blur-xl"
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center px-6 pt-16 pb-32 overflow-hidden">
            {/* Sophia Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              className="mb-6 flex-shrink-0"
            >
              <SophiaAvatar size="lg" isSpeaking={isSpeaking} />
            </motion.div>

            {/* Greeting (shows when no messages) */}
            {!hasMessages && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-relaxed mb-4 flex-shrink-0"
              >
                {greeting}{displayName ? `, ${displayName}` : ''}.
                <br />
                <span className="text-muted-foreground font-normal">
                  What are you looking for today?
                </span>
              </motion.h1>
            )}

            {/* Listening indicator */}
            {isListening && !hasMessages && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-green-500 mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">Listening...</span>
              </motion.div>
            )}

            {/* Chat messages */}
            {hasMessages && (
              <div
                ref={scrollRef}
                className="flex-1 w-full max-w-xl overflow-y-auto space-y-2 min-h-0"
              >
                <AnimatePresence mode="popLayout">
                  {messages.map((msg) => (
                    <OverlayChatBubble key={msg.id} message={msg} />
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

                {/* Listening indicator inline */}
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-green-500 px-3 py-1"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Listening...</span>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Input Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-6 pb-8"
          >
            <div className="max-w-xl mx-auto">
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-border/50 bg-muted/30 dark:bg-white/5 backdrop-blur-sm"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                }}
              >
                {/* Mic button */}
                {hasVoiceSupport && (
                  <button
                    onClick={toggleVoice}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isListening
                        ? 'bg-green-500/20 text-green-500 animate-pulse'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                  >
                    {isListening ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                )}

                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? 'Listening...' : 'Ask anything...'}
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-base focus:outline-none"
                />

                {/* Send button */}
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-foreground text-background disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90 active:scale-95"
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Hint text */}
              <p className="text-xs text-muted-foreground/50 text-center mt-3">
                {hasVoiceSupport
                  ? 'Tap the mic to speak, or type your message'
                  : 'Press Enter to send'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
