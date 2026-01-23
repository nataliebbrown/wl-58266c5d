import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useOnboardingOverlay } from '@/hooks/useOnboardingOverlay';
import { WelcomeDashboard } from '@/components/dashboard/WelcomeDashboard';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { OnboardingOverlay } from '@/components/onboarding-overlay/OnboardingOverlay';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    stats, 
    insights, 
    isLoading, 
    isFirstTime,
    hasCompletedOnboarding, 
    getPersonaFromOnboarding,
    markFirstActionTaken,
  } = useUserProfile();
  const overlayState = useOnboardingOverlay();

  useEffect(() => {
    // Redirect to onboarding if not completed
    if (!isLoading && !hasCompletedOnboarding()) {
      navigate('/');
    }
  }, [isLoading, hasCompletedOnboarding, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <div className="animate-pulse text-[#8A7356]">Loading...</div>
      </div>
    );
  }

  const personaData = getPersonaFromOnboarding();
  const userName = "Friend";
  const spiritualBackground = personaData?.spiritualBackground || 'default';

  // Show first-time welcome dashboard for new users
  if (isFirstTime) {
    return (
      <>
        {/* Onboarding overlay for first-time visitors */}
        <OnboardingOverlay 
          userName={userName}
          spiritualBackground={spiritualBackground}
          overlayState={overlayState}
        />
        
        <WelcomeDashboard
          userName={userName}
          spiritualBackground={spiritualBackground}
          onStartJourney={markFirstActionTaken}
        />
      </>
    );
  }

  // Main dashboard for returning users
  return (
    <>
      {/* Onboarding overlay if needed */}
      {overlayState.showOverlay && (
        <OnboardingOverlay 
          userName={userName}
          spiritualBackground={spiritualBackground}
          overlayState={overlayState}
        />
      )}
      
      <MainDashboard
        userName={userName}
        spiritualBackground={spiritualBackground}
        stats={stats}
        insights={insights}
      />
    </>
  );
}
