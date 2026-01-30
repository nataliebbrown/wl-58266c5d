import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SophiaAvatar } from '@/components/sophia/SophiaAvatar';
import type { BibleReference, BibleVerse } from '@/lib/bibleApi';
import {
  buildVerseContext,
  buildHermeneuticalPrompt,
  buildAskSophiaPrompt,
} from '@/lib/sophiaHermeneutics';
import { supabase } from '@/integrations/supabase/client';

// ============ Types ============

interface AskSophiaPanelProps {
  verse: BibleVerse;
  reference: BibleReference;
  open: boolean;
  onClose: () => void;
}

interface PanelMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ============ Component ============

export function AskSophiaPanel({ verse, reference, open, onClose }: AskSophiaPanelProps) {
  const [messages, setMessages] = useState<PanelMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const ctx = buildVerseContext(reference, verse);
  const initialPrompt = buildAskSophiaPrompt(reference, verse);

  // Auto-send the initial contextual question on first open
  const initialize = useCallback(async () => {
    if (hasInitialized) return;
    setHasInitialized(true);

    const userMsg: PanelMessage = { role: 'user', content: initialPrompt };
    setMessages([userMsg]);
    setIsLoading(true);

    try {
      const systemPrompt = buildHermeneuticalPrompt(ctx);
      const response = await fetchSophiaResponse([userMsg], systemPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I wasn't able to reflect on that verse right now. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [hasInitialized, initialPrompt, ctx]);

  // Initialize when panel opens
  if (open && !hasInitialized) {
    initialize();
  }

  // Follow-up message
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: PanelMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = buildHermeneuticalPrompt(ctx);
      const allMessages = [...messages, userMsg];
      const response = await fetchSophiaResponse(allMessages, systemPrompt);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] z-50 bg-background border-l border-border/30 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <SophiaAvatar size="sm" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">Ask Sophia</h3>
              <p className="text-xs text-muted-foreground">
                {reference.book} {reference.chapter}:{verse.number}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
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
                      ? 'bg-[#87A96B] text-white rounded-br-sm'
                      : 'bg-card border border-border/30 text-foreground rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border/30 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#87A96B] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#87A96B] animate-pulse" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#87A96B] animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border/30">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="flex-1 px-3 py-2.5 text-sm rounded-xl bg-card border border-border/30 focus:outline-none focus:border-[#87A96B]/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 rounded-xl bg-[#87A96B] hover:bg-[#87A96B]/90"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ API Helper ============

async function fetchSophiaResponse(
  messages: PanelMessage[],
  systemPrompt: string
): Promise<string> {
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-sophia`;

  const apiMessages = [
    { role: 'system' as const, content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages: apiMessages }),
  });

  if (!response.ok || !response.body) {
    throw new Error('Failed to get response');
  }

  // Stream and collect the full response
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
        if (delta) result += delta;
      } catch {
        buffer = line + '\n' + buffer;
        break;
      }
    }
  }

  return result || 'I need a moment to reflect on this. Please try again.';
}
