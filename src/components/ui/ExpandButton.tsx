import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandButtonProps {
  onClick: () => void;
  className?: string;
}

export function ExpandButton({ onClick, className }: ExpandButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="Expand"
      className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center',
        'text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5',
        'focus:outline-none focus:ring-2 focus:ring-wl-olive/40 dark:focus:ring-wl-olive-300/40',
        'transition-colors flex-shrink-0',
        className
      )}
    >
      <Maximize2 className="w-3.5 h-3.5" />
    </button>
  );
}
