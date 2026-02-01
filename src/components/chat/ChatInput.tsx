import { useState, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = useDarkMode();

  const { isListening, toggleVoice, hasVoiceSupport } = useVoiceInput(
    (transcript) => setValue(transcript),
  );

  const handleSubmit = () => {
    if (!value.trim() || isLoading || disabled) return;
    onSend(value.trim());
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="px-8 md:px-16 pb-4 pt-2">
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
        <label className="sr-only" htmlFor="sophia-chat-main-input">Ask Sophia</label>
        <input
          id="sophia-chat-main-input"
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={isLoading || disabled}
          className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-foreground/35"
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
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
