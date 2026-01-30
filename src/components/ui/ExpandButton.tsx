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
      className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center',
        'text-foreground/30 hover:text-foreground/60 hover:bg-foreground/5',
        'transition-colors flex-shrink-0',
        className
      )}
    >
      <Maximize2 className="w-3.5 h-3.5" />
    </button>
  );
}
