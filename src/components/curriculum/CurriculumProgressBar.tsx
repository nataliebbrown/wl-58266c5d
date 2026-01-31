import { motion } from 'framer-motion';

interface CurriculumProgressBarProps {
  percentage: number;
  height?: number;
  showLabel?: boolean;
  className?: string;
}

export function CurriculumProgressBar({
  percentage,
  height = 6,
  showLabel = false,
  className = '',
}: CurriculumProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-foreground/50">{clamped}% complete</span>
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden bg-hl-green/15"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full bg-hl-green"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
