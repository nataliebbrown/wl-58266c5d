import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function SelectionCard({
  icon: Icon,
  title,
  description,
  isSelected,
  onSelect,
  index,
}: SelectionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      onClick={onSelect}
      className={cn(
        "w-full p-5 rounded-xl text-left transition-all duration-300",
        "border-2 bg-card hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/40 hover:bg-muted/50"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium text-base mb-1 transition-colors",
            isSelected ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all",
            isSelected
              ? "border-primary bg-primary"
              : "border-muted-foreground/30"
          )}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
