import { useEffect, Component, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasCompletedQuiz } from '@/lib/onboardingState';
import { CurriculumOverview } from '@/components/curriculum/CurriculumOverview';

class LearnErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[Learn Error]', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', color: '#900' }}>
          <h2>Learn Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.message}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, opacity: 0.7 }}>
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Learn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCompletedQuiz()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <LearnErrorBoundary>
      <div className="h-screen bg-background">
        <CurriculumOverview />
      </div>
    </LearnErrorBoundary>
  );
}
