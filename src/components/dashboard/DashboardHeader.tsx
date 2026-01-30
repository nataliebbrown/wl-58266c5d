import { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  MessageCircle,
  BookOpen,
  Calendar,
  Lightbulb,
  GitBranch,
  Clock,
  Settings,
  User,
  LucideIcon,
} from 'lucide-react';
import logoBlack from '@/assets/logo_black.svg';
import logoWhite from '@/assets/logo_white.svg';
import type { ModuleType } from '@/types/wholelicity';
import { ModulePreviewModal } from '@/components/modules/ModulePreviewModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useDrawerExpand } from './DrawerExpandContext';

const Chat = lazy(() => import('@/pages/Chat'));
const Bible = lazy(() => import('@/pages/Bible'));

// ============ Quick Access Items ============

interface QuickAccessItem {
  icon: LucideIcon;
  label: string;
  id: string;
  available: boolean;
  moduleType?: ModuleType;
}

const quickAccessItems: QuickAccessItem[] = [
  { icon: Home, label: 'Home', id: 'home', available: true },
  { icon: MessageCircle, label: 'Chat', id: 'chat', available: true, moduleType: 'wisdom' },
  { icon: BookOpen, label: 'Bible', id: 'bible', available: true },
  { icon: Calendar, label: 'Today', id: 'today', available: false, moduleType: 'formation' },
  { icon: Lightbulb, label: 'Insights', id: 'insights', available: true },
  { icon: GitBranch, label: 'Patterns', id: 'patterns', available: false, moduleType: 'patterns' },
  { icon: Clock, label: 'TimeWalk', id: 'timewalk', available: false, moduleType: 'timewalk' },
];

// ============ Lazy page wrappers ============

function ExpandedChat() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40">Loading...</div>}>
      <Chat embedded />
    </Suspense>
  );
}

function ExpandedBible() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full text-foreground/40">Loading...</div>}>
      <Bible embedded />
    </Suspense>
  );
}

// ============ Component ============

interface DashboardHeaderProps {
  timeLabel?: string;
  isDarkMode?: boolean;
}

export function DashboardHeader({ isDarkMode }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { expand, collapse, expandedId } = useDrawerExpand();
  const [previewModule, setPreviewModule] = useState<ModuleType | null>(null);
  const { getPersonaFromOnboarding } = useUserProfile();
  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || 'Natalie';

  const iconColor = isDarkMode ? '#F4EFE6' : '#5A4C3A';
  const navIconColor = isDarkMode ? '#F4EFE6' : '#5A4C3A';

  const handleNavClick = (item: QuickAccessItem) => {
    if (!item.available) {
      if (item.moduleType) setPreviewModule(item.moduleType);
      return;
    }

    switch (item.id) {
      case 'home':
        collapse();
        break;
      case 'chat':
        expand(<ExpandedChat />, 'chat');
        break;
      case 'bible':
        expand(<ExpandedBible />, 'bible');
        break;
      case 'insights':
        navigate('/insights');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header className="relative flex items-center px-0 py-5">
        {/* Logo */}
        <img
          src={isDarkMode ? logoWhite : logoBlack}
          alt="Wholelicity"
          className="h-7 flex-shrink-0"
        />

        {/* Center — Quick Access Nav Icons */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              (item.id === 'home' && expandedId === null) ||
              (item.id !== 'home' && expandedId === item.id);
            const activeBg = isDarkMode
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(90, 76, 58, 0.12)';

            return (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isActive ? 'gap-2 px-4' : 'w-10'
                  }`}
                  style={{
                    background: isActive ? activeBg : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Icon
                    className="w-[18px] h-[18px] transition-colors flex-shrink-0"
                    style={{ color: navIconColor }}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {isActive && (
                    <span
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: navIconColor }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
                {!isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150"
                    style={{
                      background: isDarkMode ? '#F4EFE6' : '#3D3E35',
                      color: isDarkMode ? '#1E1F1A' : '#F4EFE6',
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right — Name, Avatar, Settings */}
        <div className="flex items-center gap-6 flex-shrink-0 ml-auto">
          {/* User name + Profile avatar */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-sm font-medium"
              style={{ color: iconColor }}
            >
              {userName}
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(90, 76, 58, 0.1)',
              }}
            >
              <User className="w-[18px] h-[18px]" style={{ color: iconColor }} strokeWidth={1.5} />
            </div>
          </div>

          {/* Settings */}
          <button
            onClick={() => navigate('/settings')}
            className="transition-opacity hover:opacity-70"
          >
            <Settings className="w-[18px] h-[18px]" style={{ color: iconColor }} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <ModulePreviewModal
        module={previewModule}
        open={previewModule !== null}
        onClose={() => setPreviewModule(null)}
      />
    </>
  );
}
