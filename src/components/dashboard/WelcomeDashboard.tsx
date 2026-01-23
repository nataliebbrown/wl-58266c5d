import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTimeBasedGreeting, formatDate, PERSONA_CONFIGS } from '@/types/wholelicity';
import { Suspense, lazy } from 'react';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

interface WelcomeDashboardProps {
  userName: string;
  spiritualBackground?: string | null;
  onStartJourney: () => void;
}

export function WelcomeDashboard({ 
  userName, 
  spiritualBackground,
  onStartJourney 
}: WelcomeDashboardProps) {
  const navigate = useNavigate();
  const config = PERSONA_CONFIGS[spiritualBackground || 'default'] || PERSONA_CONFIGS.default;
  const greeting = getTimeBasedGreeting();

  const handleStartConversation = () => {
    onStartJourney();
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex flex-col">
      {/* Minimal Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/logo_black.svg" 
            alt="Wholelicity" 
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <p className="text-sm text-[#756653]">{formatDate()}</p>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl"
        >
          {/* Greeting */}
          <p className="text-[#756653] text-sm font-light tracking-wider uppercase mb-2">
            {greeting}
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-[#262721] mb-3">
            Welcome, {userName}
          </h1>
          <p className="text-lg text-[#756653] font-light mb-12">
            {config.greeting}
          </p>

          {/* Sophia Orb */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12"
          >
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{
                background: 'radial-gradient(circle, #C5B49B 0%, #8A7356 40%, transparent 70%)',
                transform: 'scale(1.4)',
              }}
            />
            <Suspense fallback={
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #C5B49B, #8A7356, #DED1BA)',
                }}
              />
            }>
              <NoiseOrb 
                size="100%" 
                preset="sophia" 
                noiseIntensity={0.4} 
                speed={1.5} 
              />
            </Suspense>
          </motion.div>

          {/* Sophia Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#8A7356]" />
              <span className="text-sm text-[#756653] font-light tracking-wider">
                MEET SOPHIA
              </span>
            </div>
            <p className="text-[#5A4C3A] text-lg leading-relaxed max-w-md mx-auto font-light">
              I'm your AI companion for spiritual formation. 
              I'm here to explore scripture with you, ask thoughtful questions, 
              and help you discover insights at your own pace.
            </p>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <Button
              onClick={handleStartConversation}
              size="lg"
              className="bg-[#756653] hover:bg-[#5A4C3A] text-white px-8 py-6 text-lg font-light tracking-wide rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {config.primaryActionLabel}
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Subtle reassurance */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-6 text-sm text-[#C5B49B] font-light"
          >
            No pressure. Just conversation.
          </motion.p>
        </motion.div>
      </main>

      {/* Coming Soon Preview - Subtle */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="px-6 py-6 border-t border-[#DED1BA]/50"
      >
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs text-[#C5B49B] font-light tracking-wider">
            MORE COMING SOON
          </p>
          <p className="text-sm text-[#756653] mt-1">
            Pattern Discovery • Community • Historical Immersion • Cross-Cultural Insights
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
