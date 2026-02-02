import { BookOpen, MessageCircle, NotebookPen, ChevronRight } from 'lucide-react';
import { formatRelativeTime } from './formatTime';

export type EntryType = 'general' | 'lesson' | 'reflection';

export interface JournalActivityItem {
  type: EntryType;
  id: string;
  lessonId?: string;
  title: string;
  preview: string;
  updatedAt: string;
}

const typeBadge: Record<EntryType, { label: string; icon: typeof NotebookPen; className: string }> = {
  general: {
    label: 'Note',
    icon: NotebookPen,
    className: 'bg-foreground/[0.06] text-foreground/50',
  },
  lesson: {
    label: 'Lesson',
    icon: BookOpen,
    className: 'bg-hl-green/10 text-hl-green',
  },
  reflection: {
    label: 'Reflection',
    icon: MessageCircle,
    className: 'bg-wl-parchment/30 dark:bg-wl-olive-300/10 text-wl-olive dark:text-wl-olive-300',
  },
};

interface JournalEntryRowProps {
  item: JournalActivityItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export function JournalEntryRow({ item, isExpanded, onToggle }: JournalEntryRowProps) {
  const badge = typeBadge[item.type];
  const Icon = badge.icon;

  return (
    <button
      onClick={onToggle}
      className={`w-full text-left px-4 py-3.5 border-b border-foreground/[0.04] last:border-0 hover:bg-foreground/[0.02] transition-colors ${
        isExpanded ? 'bg-foreground/[0.02]' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 mt-0.5 ${badge.className}`}>
          <Icon className="w-3 h-3" />
          {badge.label}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium text-foreground truncate">{item.title}</h4>
            <span className="text-[10px] text-foreground/30 shrink-0">
              {formatRelativeTime(item.updatedAt)}
            </span>
          </div>
          {item.preview && (
            <p className="text-xs text-foreground/40 mt-0.5 line-clamp-1">{item.preview}</p>
          )}
        </div>
        <ChevronRight
          className={`w-4 h-4 text-foreground/20 shrink-0 mt-0.5 transition-transform duration-200 ${
            isExpanded ? 'rotate-90' : ''
          }`}
        />
      </div>
    </button>
  );
}
