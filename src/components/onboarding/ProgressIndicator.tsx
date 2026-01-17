import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressIndicator({ currentStep, totalSteps, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-sm font-medium text-muted-foreground">
        {currentStep} of {totalSteps}
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-8 rounded-full transition-all duration-300",
              i < currentStep
                ? "bg-primary"
                : i === currentStep
                ? "bg-primary/50"
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
