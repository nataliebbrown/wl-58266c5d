import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTimePeriod } from '@/lib/timeAwareness';
import { AppHeader } from './AppHeader';
import { BottomTabBar } from '@/components/navigation/BottomTabBar';
import { GlobalSophia } from '@/components/sophia/GlobalSophia';
import { SophiaOrbInterceptProvider } from '@/components/sophia/SophiaOrbInterceptContext';
import { isFirstTimeUser } from '@/lib/onboardingState';
import { DarkModeContext } from './DarkModeContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthGateModal } from '@/components/auth/AuthGateModal';

export function AppShell() {
  const location = useLocation();
  const { config } = useTimePeriod();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Show auth gate on all routes except dashboard and terms when not authenticated
  const publicPaths = ['/dashboard', '/terms'];
  const needsAuth = !authLoading && !isAuthenticated && !publicPaths.includes(location.pathname);

  // Dark mode: defaults to time-based (evening/night = dark), with manual override
  // Persisted in localStorage so it survives navigation & refreshes.
  // Cleared on sign-in so the user starts fresh each session.
  const timeBasedDark = config.textColor !== '#5A4C3A';
  const [darkOverride, setDarkOverride] = useState<boolean | null>(() => {
    const stored = localStorage.getItem('wl-dark-mode');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return null;
  });
  const isDarkMode = darkOverride !== null ? darkOverride : timeBasedDark;
  const toggleDarkMode = useCallback(() => {
    setDarkOverride(prev => {
      const next = prev !== null ? !prev : !timeBasedDark;
      localStorage.setItem('wl-dark-mode', next ? 'dark' : 'light');
      return next;
    });
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
      {needsAuth && <AuthGateModal />}
    </DarkModeContext.Provider>
    </SophiaOrbInterceptProvider>
  );
}
