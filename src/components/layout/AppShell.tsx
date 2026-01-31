import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTimePeriod } from '@/lib/timeAwareness';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';
import { GlobalSophia } from '@/components/sophia/GlobalSophia';
import { SophiaOrbInterceptProvider } from '@/components/sophia/SophiaOrbInterceptContext';
import { isFirstTimeUser } from '@/lib/onboardingState';
import { DarkModeContext } from './DarkModeContext';

export function AppShell() {
  const location = useLocation();
  const { config } = useTimePeriod();

  // Dark mode: defaults to time-based (evening/night = dark), with manual override
  const timeBasedDark = config.textColor !== '#5A4C3A';
  const [darkOverride, setDarkOverride] = useState<boolean | null>(null);
  const isDarkMode = darkOverride !== null ? darkOverride : timeBasedDark;
  const toggleDarkMode = useCallback(() => {
    setDarkOverride(prev => prev !== null ? !prev : !timeBasedDark);
  }, [timeBasedDark]);

  const drawerBg = isDarkMode ? '#241E17' : '#F1EDE9';
  const outerBg = isDarkMode ? '#171411' : '#E3DCD3';

  // Show floating Sophia on pages that don't already have a chat pane
  const hideSophiaOrb = ['/dashboard', '/chat'].some(
    p => location.pathname === p || location.pathname.startsWith(p + '/')
  );
  const showGlobalSophia = !hideSophiaOrb && !isFirstTimeUser();

  return (
    <SophiaOrbInterceptProvider>
    <DarkModeContext.Provider value={isDarkMode}>
      <div
        className={`h-screen lg:overflow-hidden overflow-auto flex flex-col${isDarkMode ? ' dark' : ''}`}
        style={{ background: outerBg }}
      >
        {/* Noise overlay for subtle texture */}
        <div className="noise-overlay" />

        {/* Header */}
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <AppHeader isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        </div>

        {/* Bottom drawer container */}
        <div
          className="flex-1 min-h-0 rounded-t-[28px] overflow-hidden"
          style={{
            background: drawerBg,
            boxShadow: isDarkMode
              ? '0 -8px 40px rgba(12, 12, 10, 0.6), 0 -2px 12px rgba(12, 12, 10, 0.4), inset 0 1px 0 rgba(241, 241, 239, 0.06)'
              : '0 -8px 40px rgba(90, 76, 58, 0.12), 0 -2px 12px rgba(90, 76, 58, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            borderTop: isDarkMode
              ? '1px solid rgba(241, 241, 239, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          <Outlet />
        </div>
      </div>

      {showGlobalSophia && <GlobalSophia />}
      <BottomTabBar />
    </DarkModeContext.Provider>
    </SophiaOrbInterceptProvider>
  );
}
