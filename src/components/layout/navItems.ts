import {
  Home,
  MessageCircle,
  BookOpen,
  Calendar,
  Compass,
  Lightbulb,
  GitBranch,
  Clock,
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
}

export const navItems: NavItem[] = [
  { icon: Home, label: 'Home', id: 'home', path: '/dashboard', available: true },
  { icon: MessageCircle, label: 'Chat', id: 'chat', path: '/chat', available: true, moduleType: 'wisdom' },
  { icon: BookOpen, label: 'Bible', id: 'bible', path: '/bible', available: true },
  { icon: Compass, label: 'Learn', id: 'learn', path: '/learn', available: true },
  { icon: Calendar, label: 'Today', id: 'today', path: '/today', available: false, moduleType: 'formation' },
  { icon: Lightbulb, label: 'Insights', id: 'insights', path: '/insights', available: true },
  { icon: GitBranch, label: 'Patterns', id: 'patterns', path: '/patterns', available: false, moduleType: 'patterns' },
  { icon: Clock, label: 'TimeWalk', id: 'timewalk', path: '/timewalk', available: false, moduleType: 'timewalk' },
];
