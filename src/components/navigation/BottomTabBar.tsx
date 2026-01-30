import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, MessageCircle, Lightbulb, MoreHorizontal } from 'lucide-react';

interface Tab {
  icon: typeof Home;
  label: string;
  path: string;
}

const tabs: Tab[] = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: BookOpen, label: 'Scripture', path: '/bible' },
  { icon: MessageCircle, label: 'Sophia', path: '/chat' },
  { icon: Lightbulb, label: 'Insights', path: '/insights' },
  { icon: MoreHorizontal, label: 'More', path: '/more' },
];

export function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(222, 209, 186, 0.3)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around h-14">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path ||
            (tab.path === '/dashboard' && location.pathname === '/');

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <div className="relative">
                <Icon
                  className={`w-[22px] h-[22px] transition-colors duration-200 ${
                    isActive ? 'text-[#87A96B]' : 'text-foreground/40'
                  }`}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#87A96B]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] leading-tight transition-colors duration-200 ${
                  isActive ? 'text-[#87A96B] font-medium' : 'text-foreground/40'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
