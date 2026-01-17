import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SophiaAvatar } from '@/components/onboarding-overlay/SophiaAvatar';

interface SophiaAudioOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function SophiaAudioOverlay({ isOpen, onClose, userName }: SophiaAudioOverlayProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!inputValue.trim() || isLoading) return;
    // Future: Handle sending message
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setInputValue('');
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const greeting = getTimeBasedGreeting();
  const displayName = userName || 'Friend';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-background/60 dark:bg-[#0a0a0f]/65 backdrop-blur-xl"
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

          {/* Main content - centered */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            {/* Sophia Orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              className="mb-8"
            >
              <SophiaAvatar size="lg" />
            </motion.div>

            {/* Personalized Greeting */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-foreground text-center leading-relaxed"
            >
              {greeting}, {displayName}.
              <br />
              <span className="text-muted-foreground font-normal">
                What are you looking for today?
              </span>
            </motion.h1>
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
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 text-base focus:outline-none"
                />

                {/* Send button */}
                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-foreground text-background disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:opacity-90 active:scale-95"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Hint text */}
              <p className="text-xs text-muted-foreground/50 text-center mt-3">
                Press Enter to send
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
