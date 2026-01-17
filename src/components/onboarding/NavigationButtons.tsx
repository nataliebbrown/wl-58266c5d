import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue: () => void;
  canContinue: boolean;
  showBack?: boolean;
  continueLabel?: string;
  className?: string;
}

export function NavigationButtons({
  onBack,
  onContinue,
  canContinue,
  showBack = true,
  continueLabel = 'Continue',
  className,
}: NavigationButtonsProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 pt-6", className)}>
      {showBack && onBack ? (
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button
        onClick={onContinue}
        disabled={!canContinue}
        className="min-w-32"
      >
        {continueLabel}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
