import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useVoiceInput } from '@/hooks/useVoiceInput';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isLoading,
  disabled,
  placeholder = "Share what's on your heart..."
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isListening, toggleVoice, hasVoiceSupport } = useVoiceInput(
    (transcript) => setValue(transcript),
  );

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || isLoading || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-container mx-4 md:mx-8 mb-4 md:mb-6 p-4">
      <div className="max-w-[900px] mx-auto">
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading || disabled}
              className={cn(
                "w-full min-h-[48px] max-h-[150px] resize-none",
                "chat-input-field px-[18px] py-[14px] pr-12",
                "text-base text-foreground placeholder:text-muted-foreground/60",
                "focus:outline-none",
                isListening && "ring-2 ring-hl-green/50"
              )}
              rows={1}
            />

            {/* Voice input button */}
            {hasVoiceSupport && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleVoice}
                disabled={isLoading || disabled}
                className={cn(
                  "absolute right-3 bottom-2 h-8 w-8",
                  "text-muted-foreground hover:text-foreground",
                  isListening && "text-hl-green animate-pulse"
                )}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading || disabled}
            className={cn(
              "h-11 w-11 flex items-center justify-center shrink-0",
              "chat-send-button text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            )}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>

        <p className="text-xs text-muted-foreground/60 text-center mt-3">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
