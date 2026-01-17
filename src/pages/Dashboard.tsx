import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/dashboard/Navbar';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { FormationFocusCard } from '@/components/dashboard/FormationFocusCard';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { InsightsSection } from '@/components/dashboard/InsightsSection';
import { QuickActionsSection } from '@/components/dashboard/QuickActionsSection';
import { ComingSoonSection } from '@/components/dashboard/ComingSoonSection';
import { OnboardingOverlay } from '@/components/onboarding-overlay/OnboardingOverlay';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useOnboardingOverlay } from '@/hooks/useOnboardingOverlay';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    stats, 
    insights, 
    isLoading, 
    hasCompletedOnboarding, 
    getPersonaFromOnboarding 
  } = useUserProfile();
  
  const { showOverlay } = useOnboardingOverlay();

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
  const userName = "Friend";
  const spiritualBackground = personaData?.spiritualBackground || 'default';

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding overlay for first-time visitors */}
      <OnboardingOverlay 
        userName={userName}
        spiritualBackground={spiritualBackground}
      />
      
      {/* Dashboard content - blurred when overlay is active */}
      <div className={showOverlay ? 'dashboard-blurred' : ''}>
        <Navbar />
        <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
          <HeroSection 
            userName={userName}
            spiritualBackground={spiritualBackground}
          />
          <FormationFocusCard />
          <div className="my-8" />
          <StatsSection stats={stats} />
          <InsightsSection insights={insights} />
          <QuickActionsSection />
          <ComingSoonSection />
        </main>
      </div>
    </div>
  );
}
