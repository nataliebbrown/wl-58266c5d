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
        className="w-full rounded-full overflow-hidden"
        style={{
          height,
          background: 'rgba(135, 169, 107, 0.15)',
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: '#87A96B' }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
