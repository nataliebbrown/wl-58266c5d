import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, BellOff, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { ModuleType } from '@/types/wholelicity';
import { MODULE_INFO } from '@/types/wholelicity';
import { isOnWaitlist, joinWaitlist, leaveWaitlist } from '@/lib/waitlist';
import { useState } from 'react';

// ============ Types ============

interface ModulePreviewModalProps {
  module: ModuleType | null;
  open: boolean;
  onClose: () => void;
}

// ============ Module Preview Data ============

interface ModulePreview {
  tagline: string;
  bullets: string[];
  sophiaPrompt: string;
}

const MODULE_PREVIEWS: Record<ModuleType, ModulePreview> = {
  formation: {
    tagline: 'Your spiritual growth command center.',
    bullets: [
      'Track spiritual habits and daily rhythms',
      'Set intentions and monitor your growth over time',
      'Receive personalized formation suggestions from Sophia',
      'Connect insights from across your entire journey',
    ],
    sophiaPrompt: "I want to start building spiritual disciplines. What would you recommend for where I am right now?",
  },
  wisdom: {
    tagline: 'Deep conversations with Sophia.',
    bullets: [
      'Ask any question about faith, Scripture, or life',
      'Get multi-layered, scholarly yet accessible answers',
      'Save insights from conversations to your constellation',
      'Sophia adapts to your unique spiritual background',
    ],
    sophiaPrompt: "I'd like to have a deep conversation about something on my heart.",
  },
  community: {
    tagline: 'Grow together with others.',
    bullets: [
      'Join or create small study groups',
      'Share insights and discoveries with trusted circles',
      'Collaborative Scripture exploration',
      'Leader tools for pastors and group facilitators',
    ],
    sophiaPrompt: "How can I find or build a community for spiritual growth?",
  },
  patterns: {
    tagline: 'Discover connections across Scripture.',
    bullets: [
      'Interactive visual maps of biblical themes',
      'See how Old and New Testament threads connect',
      'Discover typology, prophecy, and literary patterns',
      'Sophia guides you through hidden connections',
    ],
    sophiaPrompt: "I'm curious about the patterns and connections in the Bible. Where should I start?",
  },
  timewalk: {
    tagline: 'Step into biblical history.',
    bullets: [
      'Immersive historical context for any passage',
      'Experience the cultural world of the text',
      'Walk through archaeological discoveries',
      'See how ancient context illuminates modern application',
    ],
    sophiaPrompt: "Tell me about the historical context of a Bible passage I'm reading.",
  },
  translation: {
    tagline: 'Cross-cultural understanding of Scripture.',
    bullets: [
      'Explore original Hebrew and Greek meanings',
      'Compare how different cultures interpret key texts',
      'Understand translation choices and their implications',
      'Build a richer, more nuanced understanding of Scripture',
    ],
    sophiaPrompt: "Help me understand the original language behind a key biblical term.",
  },
};

// ============ Component ============

export function ModulePreviewModal({ module, open, onClose }: ModulePreviewModalProps) {
  const navigate = useNavigate();
  const [onWaitlist, setOnWaitlist] = useState(
    () => module ? isOnWaitlist(module) : false
  );

  if (!module) return null;

  const info = MODULE_INFO[module];
  const preview = MODULE_PREVIEWS[module];

  const handleToggleWaitlist = () => {
    if (onWaitlist) {
      leaveWaitlist(module);
      setOnWaitlist(false);
      toast('Removed from notify list');
    } else {
      joinWaitlist(module);
      setOnWaitlist(true);
      toast.success(`You'll be notified when ${info.name} launches!`);
    }
  };

  const handleAskSophia = () => {
    onClose();
    navigate(`/chat?prompt=${encodeURIComponent(preview.sophiaPrompt)}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[15%] z-50 mx-auto max-w-md"
          >
            <div className="bg-card rounded-2xl border border-border/40 shadow-2xl overflow-hidden">
              {/* Header with color accent */}
              <div
                className="relative px-6 pt-6 pb-4"
                style={{
                  background: `linear-gradient(135deg, ${info.color}15, transparent)`,
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 h-8 w-8 text-muted-foreground"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${info.color}20` }}
                >
                  <span className="text-2xl" role="img">
                    {info.icon === 'compass' && '\u{1F9ED}'}
                    {info.icon === 'sparkles' && '\u2728'}
                    {info.icon === 'users' && '\u{1F465}'}
                    {info.icon === 'network' && '\u{1F578}\uFE0F'}
                    {info.icon === 'clock' && '\u{1F570}\uFE0F'}
                    {info.icon === 'globe' && '\u{1F30D}'}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-foreground">
                  {info.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {preview.tagline}
                </p>
              </div>

              {/* Bullets */}
              <div className="px-6 py-4">
                <ul className="space-y-3">
                  {preview.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: info.color }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status */}
              <div className="px-6 py-3 bg-muted/30 border-t border-border/20">
                <p className="text-xs text-muted-foreground">
                  {info.available
                    ? 'Available now'
                    : 'Coming soon \u2014 we\u2019re building this with care.'}
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 flex gap-3">
                {!info.available && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={handleToggleWaitlist}
                  >
                    {onWaitlist ? (
                      <>
                        <BellOff className="w-4 h-4" />
                        Remove Notification
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4" />
                        Notify Me
                      </>
                    )}
                  </Button>
                )}
                <Button
                  size="sm"
                  className="flex-1 gap-2 bg-[#87A96B] hover:bg-[#87A96B]/90 text-white"
                  onClick={handleAskSophia}
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask Sophia About This
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
