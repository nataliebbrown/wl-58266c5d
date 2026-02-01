import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { useDarkMode } from '@/components/layout/DarkModeContext';

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
  placeholder = "Ask Anything..."
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDarkMode = useDarkMode();

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
    <div className="mx-4 md:mx-8 mb-4 md:mb-6">
      <div className="max-w-[900px] mx-auto">
        <div
          className="flex items-end gap-2 rounded-full px-5 py-3 transition-all duration-200 cursor-text"
          onClick={() => textareaRef.current?.focus()}
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
          <label className="sr-only" htmlFor="sophia-chat-main-input">Ask Sophia</label>
          <textarea
            id="sophia-chat-main-input"
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading || disabled}
            rows={1}
            className={cn(
              "flex-1 bg-transparent text-sm outline-none resize-none",
              "text-foreground placeholder:text-foreground/35",
              "min-h-[24px] max-h-[150px]",
              isListening && "ring-2 ring-green-500/50 rounded"
            )}
          />
          {hasVoiceSupport && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleVoice(); }}
              disabled={isLoading || disabled}
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
            disabled={!value.trim() || isLoading || disabled}
            aria-label="Send message"
            className="flex-shrink-0 p-1 transition-opacity text-foreground disabled:opacity-20 opacity-40 hover:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
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
