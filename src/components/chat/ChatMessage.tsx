import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import { SophiaAvatar } from '@/components/onboarding-overlay/SophiaAvatar';

interface ChatMessageProps {
  message: Message;
  onSaveInsight?: (message: Message) => void;
  isSaved?: boolean;
}

export function ChatMessage({ message, onSaveInsight, isSaved }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Sophia avatar for assistant messages */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <SophiaAvatar size="sm" />
        </div>
      )}

      <div className={cn(
        "flex flex-col max-w-[80%] md:max-w-[70%]",
        isUser && "items-end"
      )}>
        {/* Message bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            isUser 
              ? "bg-primary text-primary-foreground rounded-br-md" 
              : "bg-card border border-border rounded-bl-md"
          )}
        >
          <p className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            !isUser && "font-spiritual"
          )}>
            {message.content}
          </p>
        </div>

        {/* Message actions - only for assistant messages */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-secondary" />
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
        <span className="text-xs text-muted-foreground mt-1">
          {message.createdAt.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>

      {/* User avatar placeholder - keep alignment */}
      {isUser && <div className="w-8 flex-shrink-0" />}
    </motion.div>
  );
}
