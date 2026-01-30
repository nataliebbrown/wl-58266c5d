import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasCompletedQuiz } from '@/lib/onboardingState';
import { SacredRhythmDashboard } from '@/components/dashboard/SacredRhythmDashboard';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to onboarding if quiz not completed
    if (!hasCompletedQuiz()) {
      navigate('/');
    }
  }, [navigate]);

  return <SacredRhythmDashboard />;
}
