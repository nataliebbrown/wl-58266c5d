import { Navbar } from '@/components/dashboard/Navbar';
import { FirstTimeHeroSection } from '@/components/dashboard/first-time/FirstTimeHeroSection';
import { FirstTimeFormationFocus } from '@/components/dashboard/first-time/FirstTimeFormationFocus';
import { FirstTimeStatsSection } from '@/components/dashboard/first-time/FirstTimeStatsSection';
import { FirstTimeInsightsSection } from '@/components/dashboard/first-time/FirstTimeInsightsSection';
import { FirstTimeQuickActions } from '@/components/dashboard/first-time/FirstTimeQuickActions';
import { OnboardingOverlay } from '@/components/onboarding-overlay/OnboardingOverlay';
import { useOnboardingOverlay } from '@/hooks/useOnboardingOverlay';

interface FirstTimeDashboardProps {
  userName: string;
  spiritualBackground?: string | null;
  onFirstActionTaken: () => void;
}

export default function FirstTimeDashboard({ 
  userName, 
  spiritualBackground,
  onFirstActionTaken 
}: FirstTimeDashboardProps) {
  const overlayState = useOnboardingOverlay();

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding overlay for first-time visitors */}
      <OnboardingOverlay 
        userName={userName}
        spiritualBackground={spiritualBackground || 'default'}
        overlayState={overlayState}
      />
      
      {/* Dashboard content */}
      <Navbar />
      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <FirstTimeHeroSection userName={userName} />
        
        {/* Dominant Formation Focus Card */}
        <div className="mb-10">
          <FirstTimeFormationFocus 
            spiritualBackground={spiritualBackground}
            onActionTaken={onFirstActionTaken}
          />
        </div>
        
        {/* De-emphasized sections */}
        <FirstTimeStatsSection />
        <FirstTimeInsightsSection />
        <FirstTimeQuickActions onActionTaken={onFirstActionTaken} />
      </main>
    </div>
  );
}
