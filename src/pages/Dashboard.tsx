import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/dashboard/Navbar';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { FirstTimeHero } from '@/components/dashboard/FirstTimeHero';
import { FirstStepCard } from '@/components/dashboard/FirstStepCard';
import { FirstTimeStatsSection } from '@/components/dashboard/FirstTimeStatsSection';
import { CollapsibleQuickActions } from '@/components/dashboard/CollapsibleQuickActions';
import { FormationFocusCard } from '@/components/dashboard/FormationFocusCard';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { InsightsSection } from '@/components/dashboard/InsightsSection';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { ComingSoonSection } from '@/components/dashboard/ComingSoonSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { SpiritualBackground, LearningStyle } from '@/types/onboarding';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    stats, 
    insights, 
    isLoading, 
    isFirstVisit,
    hasCompletedOnboarding, 
    getPersonaFromOnboarding,
    completeFirstVisit,
  } = useUserProfile();

  useEffect(() => {
    // Redirect to onboarding if not completed
    if (!isLoading && !hasCompletedOnboarding()) {
      navigate('/');
    }
  }, [isLoading, hasCompletedOnboarding, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-gentle text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const personaData = getPersonaFromOnboarding();

  const handleSkipFirstTime = () => {
    completeFirstVisit();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {isFirstVisit ? (
            <motion.div
              key="first-time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <FirstTimeHero 
                userName="Friend" 
                spiritualBackground={personaData?.spiritualBackground as SpiritualBackground}
              />
              
              <FirstStepCard
                spiritualBackground={personaData?.spiritualBackground as SpiritualBackground || 'exploring_faith'}
                learningStyle={personaData?.learningStyle as LearningStyle || 'reading_reflection'}
                onSkip={handleSkipFirstTime}
              />
              
              <FirstTimeStatsSection />
              
              <CollapsibleQuickActions />
            </motion.div>
          ) : (
            <motion.div
              key="returning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <HeroSection 
                userName="Friend" 
                spiritualBackground={personaData?.spiritualBackground}
              />
              <FormationFocusCard />
              <div className="my-8" />
              <StatsSection stats={stats} />
              <InsightsSection insights={insights} />
              <QuickActionsSection />
              <ComingSoonSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
