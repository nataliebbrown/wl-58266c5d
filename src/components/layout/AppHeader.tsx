import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Settings,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import logoBlack from '@/assets/logo_black.svg';
import logoWhite from '@/assets/logo_white.svg';
import type { ModuleType } from '@/types/wholelicity';
import { ModulePreviewModal } from '@/components/modules/ModulePreviewModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import { navItems, type NavItem } from './navItems';

// ============ Component ============

interface AppHeaderProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function AppHeader({ isDarkMode, onToggleDarkMode }: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [previewModule, setPreviewModule] = useState<ModuleType | null>(null);
  const { getPersonaFromOnboarding } = useUserProfile();
  const personaData = getPersonaFromOnboarding();
  const userName = personaData?.name || 'Natalie';

  const iconColor = isDarkMode ? '#FBF9F5' : '#5A4C3A';
  const navIconColor = isDarkMode ? '#FBF9F5' : '#5A4C3A';

  const handleNavClick = (item: NavItem) => {
    if (!item.available) {
      if (item.moduleType) setPreviewModule(item.moduleType);
      return;
    }
    navigate(item.path);
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

        {/* Center — Nav Icons (hidden on mobile/tablet where BottomTabBar shows) */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const activeBg = isDarkMode
              ? 'rgba(241, 241, 239, 0.15)'
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
                      background: isDarkMode ? '#FBF9F5' : '#2F2921',
                      color: isDarkMode ? '#171411' : '#FBF9F5',
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
                background: isDarkMode ? 'rgba(241, 241, 239, 0.12)' : 'rgba(90, 76, 58, 0.1)',
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

          {/* Dark/Light mode toggle */}
          {onToggleDarkMode && (
            <div className="relative group flex items-center">
              <button
                onClick={onToggleDarkMode}
                className="transition-opacity hover:opacity-70"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode
                  ? <Sun className="w-[18px] h-[18px]" style={{ color: iconColor }} strokeWidth={1.5} />
                  : <Moon className="w-[18px] h-[18px]" style={{ color: iconColor }} strokeWidth={1.5} />
                }
              </button>
              <span
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150"
                style={{
                  background: isDarkMode ? '#FBF9F5' : '#2F2921',
                  color: isDarkMode ? '#171411' : '#FBF9F5',
                }}
              >
                {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              </span>
            </div>
          )}
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
