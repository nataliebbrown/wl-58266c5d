import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navItems, type NavItem } from '@/components/layout/navItems';
import type { ModuleType } from '@/types/wholelicity';
import { ModulePreviewModal } from '@/components/modules/ModulePreviewModal';

export function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [previewModule, setPreviewModule] = useState<ModuleType | null>(null);

  const handleTabClick = (item: NavItem) => {
    if (!item.available) {
      if (item.moduleType) setPreviewModule(item.moduleType);
      return;
    }
    navigate(item.path);
  };

  return (
    <>
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
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/');

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item)}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 relative"
                style={{ minHeight: '44px', minWidth: '44px', opacity: item.available ? 1 : 0.4 }}
              >
                <div className="relative">
                  <Icon
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${
                      isActive ? 'text-hl-green' : 'text-foreground/40'
                    }`}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-hl-green"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </div>
                <span
                  className={`text-[10px] leading-tight transition-colors duration-200 ${
                    isActive ? 'text-hl-green font-medium' : 'text-foreground/40'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <ModulePreviewModal
        module={previewModule}
        open={previewModule !== null}
        onClose={() => setPreviewModule(null)}
      />
    </>
  );
}
