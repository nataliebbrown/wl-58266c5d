import {
  Home,
  MessageCircle,
  BookOpen,
  Calendar,
  Compass,
  Lightbulb,
  NotebookPen,
  GitBranch,
  Clock,
  Wind,
  Footprints,
  type LucideIcon,
} from 'lucide-react';
import type { ModuleType } from '@/types/wholelicity';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  id: string;
  path: string;
  available: boolean;
  moduleType?: ModuleType;
  /** Leave out of the phone bottom bar (which only fits about 8 icons) */
  hideOnMobile?: boolean;
}

export const navItems: NavItem[] = [
  { icon: Home, label: 'Home', id: 'home', path: '/dashboard', available: true },
  { icon: MessageCircle, label: 'Chat', id: 'chat', path: '/chat', available: true, moduleType: 'wisdom' },
  { icon: BookOpen, label: 'Bible', id: 'bible', path: '/bible', available: true },
  { icon: Wind, label: 'Meditate', id: 'meditate', path: '/meditate', available: true },
  { icon: Compass, label: 'Learn', id: 'learn', path: '/learn', available: true },
  { icon: Calendar, label: 'Today', id: 'today', path: '/today', available: true, moduleType: 'formation' },
  { icon: Footprints, label: 'Journey', id: 'journey', path: '/journey', available: true, hideOnMobile: true },
  { icon: Lightbulb, label: 'Insights', id: 'insights', path: '/insights', available: true },
  { icon: NotebookPen, label: 'Journal', id: 'journal', path: '/journal', available: true },
  { icon: GitBranch, label: 'Patterns', id: 'patterns', path: '/patterns', available: false, moduleType: 'patterns' },
  { icon: Clock, label: 'TimeWalk', id: 'timewalk', path: '/timewalk', available: false, moduleType: 'timewalk' },
];
