import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { GlobalSophia } from "@/components/sophia/GlobalSophia";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FirstTimeDashboard from "./pages/FirstTimeDashboard";
import Chat from "./pages/Chat";
import OrbTest from "./pages/OrbTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Standalone first-time dashboard for testing
function FirstTimeDashboardTest() {
  return (
    <FirstTimeDashboard
      userName="Friend"
      spiritualBackground="exploring-faith"
      onFirstActionTaken={() => console.log('First action taken!')}
    />
  );
}

// Wrapper to conditionally show GlobalSophia based on route
function AppContent() {
  const location = useLocation();
  
  // Show floating Sophia on these routes
  const showGlobalSophia = ['/dashboard', '/dashboard/first-time'].some(
    path => location.pathname.startsWith(path)
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/first-time" element={<FirstTimeDashboardTest />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/orb-test" element={<OrbTest />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showGlobalSophia && <GlobalSophia />}
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
