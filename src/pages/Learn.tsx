import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasCompletedQuiz } from '@/lib/onboardingState';
import { initializeProgress } from '@/lib/curriculum/curriculumProgress';
import { CurriculumOverview } from '@/components/curriculum/CurriculumOverview';

export default function Learn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCompletedQuiz()) {
      navigate('/');
      return;
    }
    initializeProgress();
  }, [navigate]);

  return (
    <div className="h-full">
      <CurriculumOverview />
    </div>
  );
}
