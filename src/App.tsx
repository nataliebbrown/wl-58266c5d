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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper to conditionally show GlobalSophia based on route
function AppContent() {
  const location = useLocation();

  // Don't show floating Sophia on dashboard (it has an inline chat panel)
  const isFirstTime = isFirstTimeUser();
  const showGlobalSophia = false; // Dashboard now has DashboardSophiaPanel

  // Show bottom tab bar on authenticated routes (not onboarding/intro)
  const showTabBar = ['/dashboard', '/chat', '/bible', '/insights', '/more'].some(
    p => location.pathname.startsWith(p)
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/bible" element={<Bible />} />
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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
