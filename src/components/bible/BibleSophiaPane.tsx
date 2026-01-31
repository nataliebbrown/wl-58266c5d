import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Mic, BookOpen, Compass, Heart, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SophiaAvatar } from '@/components/sophia/SophiaAvatar';
import { useTimePeriod } from '@/lib/timeAwareness';
import { useUserProfile } from '@/hooks/useUserProfile';
import type { BibleReference, BibleVerse } from '@/lib/bibleApi';
import type { LucideIcon } from 'lucide-react';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

// ============ Bible Conversation Starters ============

interface StarterCard {
  icon: LucideIcon;
  label: string;
  prompt: string;
}

const BIBLE_STARTERS: StarterCard[] = [
  { icon: BookOpen, label: 'Explain this passage', prompt: 'Can you help me understand the passage I\'m reading right now?' },
  { icon: Compass, label: 'Historical context', prompt: 'What is the historical and cultural context behind this passage?' },
  { icon: Heart, label: 'Apply this to my life', prompt: 'How can I apply what I\'m reading to my life today?' },
  { icon: Sparkles, label: 'Cross references', prompt: 'What other passages in the Bible connect to what I\'m reading?' },
  { icon: HelpCircle, label: "I'm not sure what to ask", prompt: "I'm reading Scripture but I don't know what to ask. Can you guide me?" },
];

// ============ Pill Input ============

function PillInput({
  onSend,
  value,
  onChange,
  isLoading,
}: {
  onSend: () => void;
  value: string;
  onChange: (v: string) => void;
  isLoading: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className="flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-200 cursor-text"
      onClick={() => inputRef.current?.focus()}
      style={{
        background: isFocused
          ? 'rgba(255,255,255,0.95)'
          : 'rgba(255,255,255,0.85)',
        boxShadow: isFocused
          ? '0 0 0 2px rgba(117,102,83,0.15), 0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
      onMouseEnter={(e) => {
        if (!isFocused) {
          e.currentTarget.style.boxShadow =
            '0 0 0 1px rgba(117,102,83,0.1), 0 2px 10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isFocused) {
          e.currentTarget.style.boxShadow =
            '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)';
        }
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Ask Anything..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/35"
        disabled={isLoading}
      />
      <button
        className="flex-shrink-0 p-1 transition-opacity opacity-40 hover:opacity-70"
        style={{ color: '#5A4C3A' }}
      >
        <Mic className="w-5 h-5" />
      </button>
      <button
        onClick={onSend}
        disabled={!value.trim() || isLoading}
        className="flex-shrink-0 p-1 transition-opacity disabled:opacity-20 opacity-40 hover:opacity-70"
        style={{ color: '#5A4C3A' }}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

// ============ Types ============

interface BibleSophiaPaneProps {
  onClose: () => void;
  verse?: BibleVerse;
  reference?: BibleReference;
}

interface PanelMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function BibleSophiaPane({ onClose, verse, reference }: BibleSophiaPaneProps) {
  const [messages, setMessages] = useState<PanelMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { config } = useTimePeriod();
  const { getPersonaFromOnboarding } = useUserProfile();
  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || null;

  const salutation = (() => {
    switch (config.period) {
      case 'dawn': return 'Good Morning';
      case 'morning': return 'Good Morning';
      case 'midday': return 'Good Afternoon';
      case 'evening': return 'Good Evening';
      case 'night': return 'Good Evening';
    }
  })();

  const hasMessages = messages.length > 0 || isLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  // Auto-send initial question when opened with verse context
  useEffect(() => {
    if (verse && reference) {
      const prompt = `Help me understand ${reference.book} ${reference.chapter}:${verse.number} — "${verse.text}"`;
      sendToSophia(prompt, []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToSophia = async (text: string, history: PanelMessage[]) => {
    if (!text.trim() || isLoading) return;

    const userMsg: PanelMessage = { role: 'user', content: text.trim() };
    const allMessages = [...history, userMsg];
    setMessages(allMessages);
    setInput('');
    setIsLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-sophia`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: allMessages.map(m => ({ role: m.role, content: m.content })),
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              result += delta;
              setStreamingContent(result);
            }
          } catch {
            buffer = line + '\n' + buffer;
            break;
          }
        }
      }

      const assistantMsg: PanelMessage = {
        role: 'assistant',
        content: result || 'I need a moment to reflect. Please try again.',
      };
      setMessages(prev => [...prev, assistantMsg]);
      setStreamingContent('');
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, something went wrong. Please try again." },
      ]);
      setStreamingContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendToSophia(input, messages);
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 400, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="border-l border-border/30 bg-background overflow-hidden flex-shrink-0 h-full"
    >
      <div className="w-[400px] h-full flex flex-col">
        {/* Close button */}
        <div className="absolute top-3 right-3 z-10">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

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
                <h2 className="text-2xl leading-snug text-foreground">
                  {salutation}
                  {userName && <> <span className="font-semibold">{userName}</span>,</>}
                  <br />
                  <span className="italic">What's on your mind?</span>
                </h2>
                <p className="text-sm mt-1 text-foreground/40">
                  Ask me anything about what you're reading
                </p>
              </div>
            </div>

            {/* Scrollable content — starters */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <div className="grid grid-cols-2 gap-3 w-full">
                {BIBLE_STARTERS.map((starter, index) => (
                  <button
                    key={starter.label}
                    onClick={() => sendToSophia(starter.prompt, [])}
                    className={`flex items-center justify-center gap-3 rounded-xl px-5 py-5 border border-wl-olive/15 dark:border-wl-olive-300/15 hover:border-wl-olive/35 dark:hover:border-wl-olive-300/35 hover:bg-wl-olive/5 dark:hover:bg-wl-olive-300/5 hover:shadow-sm transition-all duration-200 ${
                      index === BIBLE_STARTERS.length - 1
                        ? 'col-span-2 flex-row'
                        : 'flex-col text-center'
                    }`}
                  >
                    <starter.icon
                      className="w-5 h-5 flex-shrink-0 text-wl-olive/60 dark:text-wl-olive-300/60"
                    />
                    <span className="text-base leading-snug font-semibold text-foreground/85 dark:text-wl-olive-200">
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
          <>
            {/* Header bar with avatar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 flex-shrink-0">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <SophiaAvatar size="sm" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">Sophia</h3>
                {verse && reference && (
                  <p className="text-xs text-muted-foreground truncate">
                    {reference.book} {reference.chapter}:{verse.number}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-hl-green text-white rounded-br-sm'
                        : 'bg-card border border-border/30 text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Streaming response */}
              {isLoading && streamingContent && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed bg-card border border-border/30 text-foreground">
                    {streamingContent}
                  </div>
                </div>
              )}

              {/* Loading dots */}
              {isLoading && !streamingContent && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border/30 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-hl-green animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-hl-green animate-pulse" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-hl-green animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </>
        )}

        {/* Pill Input */}
        <div className="p-4 pt-2 flex-shrink-0">
          <PillInput
            onSend={handleSend}
            value={input}
            onChange={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
}
