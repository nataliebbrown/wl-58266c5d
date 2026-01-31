import { useEffect, Component, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasCompletedQuiz } from '@/lib/onboardingState';
import { SacredRhythmDashboard } from '@/components/dashboard/SacredRhythmDashboard';

// Diagnostic error boundary — shows the error on screen
class DashboardErrorBoundary extends Component<
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
    console.error('[Dashboard Error]', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-10 font-sans text-destructive">
          <h2 className="text-lg font-semibold mb-2">Dashboard Error</h2>
          <pre className="whitespace-pre-wrap text-sm text-foreground/70">
            {this.state.error.message}
          </pre>
          <pre className="whitespace-pre-wrap text-xs text-foreground/40 mt-2">
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to onboarding if quiz not completed
    if (!hasCompletedQuiz()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <DashboardErrorBoundary>
      <SacredRhythmDashboard />
    </DashboardErrorBoundary>
  );
}
