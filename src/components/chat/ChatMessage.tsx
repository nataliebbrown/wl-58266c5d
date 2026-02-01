import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import { renderSophiaMarkdown } from '@/lib/sophiaMarkdown';
import type { BibleReference } from '@/lib/bibleApi';

interface ChatMessageProps {
  message: Message;
  onSaveInsight?: (message: Message) => void;
  isSaved?: boolean;
  index?: number;
  onPassageClick?: (ref: BibleReference, rawText: string) => void;
}

export function ChatMessage({ message, onSaveInsight, isSaved, index = 0, onPassageClick }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const renderedContent = useMemo(
    () => (isUser ? null : renderSophiaMarkdown(message.content, { onPassageClick })),
    [isUser, message.content, onPassageClick]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.05
      }}
      className={cn(
        "flex gap-3 mb-4 group/msg",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex flex-col",
        isUser ? "items-end max-w-[75%] md:max-w-[75%]" : "items-start max-w-[80%] md:max-w-[80%]"
      )}>
        {/* Message bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-wl-olive/20 dark:bg-wl-olive-300/20 text-foreground"
              : "bg-white/60 dark:bg-wl-olive-300/15 text-foreground"
          )}
          style={!isUser ? { backdropFilter: 'blur(4px)' } : undefined}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">
              {message.content}
            </p>
          ) : (
            <div className="sophia-message-content">
              {renderedContent}
            </div>
          )}
        </div>

        {/* Message actions - only for assistant messages */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-100 md:opacity-0 md:group-hover/msg:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy message"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>

            {onSaveInsight && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-primary"
                onClick={() => onSaveInsight(message)}
                disabled={isSaved}
                aria-label={isSaved ? "Insight saved" : "Save as insight"}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Bookmark className="h-3.5 w-3.5" />
                )}
              </Button>
            )}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-[13px] text-muted-foreground/60 mt-1 ml-1">
          {message.createdAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </motion.div>
  );
}
