import { motion } from 'framer-motion';
import { SophiaAvatar } from '@/components/onboarding-overlay/SophiaAvatar';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-start gap-3 mb-4"
    >
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full chat-sophia-avatar overflow-hidden">
          <SophiaAvatar size="sm" />
        </div>
      </div>
      
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium mb-1 ml-1" style={{ color: '#87A96B' }}>
          Sophia
        </span>
        
        <div className="chat-bubble-sophia px-5 py-4">
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full chat-typing-dot"
              style={{ backgroundColor: '#87A96B' }}
            />
            <span 
              className="w-2 h-2 rounded-full chat-typing-dot"
              style={{ backgroundColor: '#87A96B' }}
            />
            <span 
              className="w-2 h-2 rounded-full chat-typing-dot"
              style={{ backgroundColor: '#87A96B' }}
            />
          </div>
        </div>
        
        <span className="text-sm text-muted-foreground/60 mt-2 ml-1 italic">
          Sophia is reflecting...
        </span>
      </div>
    </motion.div>
  );
}
