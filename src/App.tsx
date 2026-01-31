import { Component, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GlobalSophia } from "@/components/sophia/GlobalSophia";
import { BottomTabBar } from "@/components/navigation/BottomTabBar";
import { isFirstTimeUser } from "@/lib/onboardingState";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Bible from "./pages/Bible";
import OrbTest from "./pages/OrbTest";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";

// Diagnostic error boundary — shows runtime errors on screen
class AppErrorBoundary extends Component<
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
    console.error('[App Error]', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace' }}>
          <h2 style={{ color: '#900' }}>App Error</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#900' }}>
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

const queryClient = new QueryClient();

// Wrapper to conditionally show GlobalSophia based on route
function AppContent() {
  const location = useLocation();

  // Show floating Sophia on pages that don't already have a chat pane
  const hideSophiaOrb = ['/', '/dashboard', '/chat'].some(
    p => location.pathname === p || (p !== '/' && location.pathname.startsWith(p + '/'))
  );
  const showGlobalSophia = !hideSophiaOrb && !isFirstTimeUser();

  // Show bottom tab bar on authenticated routes (not onboarding/intro)
  const showTabBar = ['/dashboard', '/chat', '/bible', '/learn', '/insights', '/more'].some(
    p => location.pathname.startsWith(p)
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/bible" element={<Bible />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/orb-test" element={<OrbTest />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showGlobalSophia && <GlobalSophia />}
      {showTabBar && <BottomTabBar />}
    </>
  );
}

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
