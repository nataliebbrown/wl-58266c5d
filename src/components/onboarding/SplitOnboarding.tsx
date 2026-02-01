import { motion } from 'framer-motion';
import introBackground from "@/assets/BG_1.png";
import wholelicityLogo from "@/assets/logo_white.svg";
import startedText from "@/assets/started.svg";
import { ChatOnboardingPanel } from './ChatOnboardingPanel';

interface SplitOnboardingProps {
  onComplete?: () => void;
}

export function SplitOnboarding({ onComplete }: SplitOnboardingProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full-width Background (matches intro) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${introBackground})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(54, 46, 35, 0.5) 0%, rgba(54, 46, 35, 0.85) 50%, rgba(54, 46, 35, 0.95) 100%)',
        }}
      />

      {/* Logo at Top Left */}
      <div className="absolute top-8 left-8 z-20">
        <img src={wholelicityLogo} alt="Wholelicity" className="h-6 md:h-8" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-screen flex flex-col md:flex-row items-center p-4 md:p-8">
        {/* Left Side - Welcome Message and Tagline at Bottom (hidden on mobile) */}
        <motion.div
          className="hidden md:flex flex-1 flex-col justify-end pb-4 h-full pr-[200px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <img
            src={startedText}
            alt="Let's get started!"
            className="h-auto max-w-full"
          />
        </motion.div>

        {/* Right Side - Liquid Glass Container */}
        <motion.div
          className="w-full md:w-[55%] max-h-screen md:max-h-[calc(100vh-4rem)] flex-1 md:flex-none"
          initial={{ x: '120%' }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glass Container */}
          <div
            className="h-screen md:h-[calc(100vh-4rem)] rounded-none md:rounded-3xl overflow-hidden relative flex flex-col"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 239, 230, 0.18) 0%, rgba(222, 209, 186, 0.1) 50%, rgba(197, 180, 155, 0.06) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(244, 239, 230, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 80px rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Subtle inner glow/gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at top right, rgba(244, 239, 230, 0.4) 0%, transparent 50%)',
              }}
            />

            {/* Chat Content */}
            <div className="relative h-full overflow-hidden">
              <ChatOnboardingPanel onComplete={onComplete} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
