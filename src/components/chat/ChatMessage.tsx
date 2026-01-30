import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Message } from '@/types/chat';
import { SophiaAvatar } from '@/components/sophia/SophiaAvatar';

interface ChatMessageProps {
  message: Message;
  onSaveInsight?: (message: Message) => void;
  isSaved?: boolean;
  index?: number;
}

export function ChatMessage({ message, onSaveInsight, isSaved, index = 0 }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

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
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Sophia avatar for assistant messages */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 rounded-full chat-sophia-avatar overflow-hidden">
            <SophiaAvatar size="sm" />
          </div>
        </div>
      )}

      <div className={cn(
        "flex flex-col",
        isUser ? "items-end max-w-[75%] md:max-w-[75%]" : "items-start max-w-[80%] md:max-w-[80%]"
      )}>
        {/* Sophia label */}
        {!isUser && (
          <span className="text-sm font-medium mb-1 ml-1" style={{ color: '#87A96B' }}>
            Sophia
          </span>
        )}

        {/* Message bubble */}
        <div
          className={cn(
            "px-[18px] py-3",
            isUser 
              ? "chat-bubble-user" 
              : "chat-bubble-sophia"
          )}
        >
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Message actions - only for assistant messages */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" style={{ color: '#87A96B' }} />
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
