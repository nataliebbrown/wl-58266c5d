import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  BookOpen,
  Calendar,
  Lightbulb,
  GitBranch,
  Clock,
  LucideIcon,
} from 'lucide-react';
import type { ModuleType } from '@/types/wholelicity';
import { ModulePreviewModal } from '@/components/modules/ModulePreviewModal';

interface QuickAccessItem {
  icon: LucideIcon;
  label: string;
  destination: string;
  available: boolean;
  moduleType?: ModuleType;
}

const quickAccessItems: QuickAccessItem[] = [
  {
    icon: MessageCircle,
    label: 'Sophia',
    destination: '/chat',
    available: true,
    moduleType: 'wisdom',
  },
  {
    icon: BookOpen,
    label: 'Scripture',
    destination: '/bible',
    available: true,
  },
  {
    icon: Calendar,
    label: 'Today',
    destination: '/today',
    available: false,
    moduleType: 'formation',
  },
  {
    icon: Lightbulb,
    label: 'Insights',
    destination: '/insights',
    available: true,
  },
  {
    icon: GitBranch,
    label: 'Patterns',
    destination: '/patterns',
    available: false,
    moduleType: 'patterns',
  },
  {
    icon: Clock,
    label: 'TimeWalk',
    destination: '/timewalk',
    available: false,
    moduleType: 'timewalk',
  },
];

export function QuickAccessRow() {
  const navigate = useNavigate();
  const [previewModule, setPreviewModule] = useState<ModuleType | null>(null);

  const handleClick = (item: QuickAccessItem) => {
    if (item.available) {
      navigate(item.destination);
    } else if (item.moduleType) {
      // Open the module preview modal
      setPreviewModule(item.moduleType);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-10">
        {quickAccessItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
              onClick={() => handleClick(item)}
              className="group"
              style={{ opacity: item.available ? 1 : 0.6 }}
            >
              <motion.div
                whileHover={item.available ? { scale: 1.08 } : { scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all duration-200"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(222, 209, 186, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = item.available
                    ? 'rgba(222, 209, 186, 0.4)'
                    : 'rgba(222, 209, 186, 0.25)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(117, 102, 83, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                }}
              >
                <Icon className="w-7 h-7 text-wl-olive" strokeWidth={1.5} />
                <span className="text-[11px] text-muted-foreground leading-tight">
                  {item.label}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Module preview modal */}
      <ModulePreviewModal
        module={previewModule}
        open={previewModule !== null}
        onClose={() => setPreviewModule(null)}
      />
    </>
  );
}
