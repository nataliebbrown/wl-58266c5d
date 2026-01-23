import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  Flame,
  Lightbulb,
  Network,
  Clock,
  Users,
  Globe,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  getTimeBasedGreeting, 
  formatDate, 
  PERSONA_CONFIGS,
  MODULE_INFO,
  ModuleType 
} from '@/types/wholelicity';
import { UserStats, Insight } from '@/types/dashboard';
import { Suspense, lazy, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const NoiseOrb = lazy(() => import('@/components/NoiseOrb'));

interface MainDashboardProps {
  userName: string;
  spiritualBackground?: string | null;
  stats: UserStats;
  insights: Insight[];
}

const DAILY_PROMPTS = [
  "What's been on your heart today?",
  "Is there a passage that's been speaking to you lately?",
  "What question about faith has been lingering in your mind?",
  "How are you experiencing God's presence this week?",
  "Is there something you'd like to explore deeper today?",
];

const MODULE_ICONS: Record<ModuleType, React.ReactNode> = {
  formation: <Sparkles className="w-5 h-5" />,
  wisdom: <MessageCircle className="w-5 h-5" />,
  community: <Users className="w-5 h-5" />,
  patterns: <Network className="w-5 h-5" />,
  timewalk: <Clock className="w-5 h-5" />,
  translation: <Globe className="w-5 h-5" />,
};

export function MainDashboard({ 
  userName, 
  spiritualBackground,
  stats,
  insights 
}: MainDashboardProps) {
  const navigate = useNavigate();
  const config = PERSONA_CONFIGS[spiritualBackground || 'default'] || PERSONA_CONFIGS.default;
  const greeting = getTimeBasedGreeting();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Get a consistent daily prompt based on the date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const dailyPrompt = DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('wl-dark-mode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('wl-dark-mode', String(isDarkMode));
  }, [isDarkMode]);

  const handleStartConversation = () => {
    navigate('/chat');
  };

  const handleModuleClick = (module: ModuleType) => {
    if (MODULE_INFO[module].available) {
      if (module === 'wisdom') {
        navigate('/chat');
      }
    } else {
      toast.info(`${MODULE_INFO[module].name} coming soon!`, {
        description: "We're building something special for you.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-4xl">
          <div className="flex items-center gap-2">
            <img 
              src="/logo_black.svg" 
              alt="Wholelicity" 
              className="h-7 w-auto dark:hidden"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <img 
              src="/logo_white.svg" 
              alt="Wholelicity" 
              className="h-7 w-auto hidden dark:block"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground mb-1">{formatDate()}</p>
          <h1 className="text-2xl md:text-3xl font-light text-foreground">
            {greeting}, {userName}
          </h1>
          <p className="text-muted-foreground mt-1">{config.greeting}</p>
        </motion.section>

        {/* Sophia Card - Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-[#262721] via-[#5A4C3A] to-[#756653] text-white">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Mini Sophia Orb */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <div 
                    className="absolute inset-0 rounded-full blur-2xl opacity-50"
                    style={{
                      background: 'radial-gradient(circle, #C5B49B 0%, transparent 70%)',
                      transform: 'scale(1.3)',
                    }}
                  />
                  <Suspense fallback={
                    <div 
                      className="w-full h-full rounded-full"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, #C5B49B, #756653, #DED1BA)',
                      }}
                    />
                  }>
                    <NoiseOrb 
                      size="100%" 
                      preset="sophia" 
                      noiseIntensity={0.3} 
                      speed={1.2} 
                    />
                  </Suspense>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#DED1BA]" />
                    <span className="text-sm text-[#DED1BA] font-light tracking-wider uppercase">
                      Sophia
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-light mb-4 text-white/90">
                    "{dailyPrompt}"
                  </p>
                  <Button
                    onClick={handleStartConversation}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full px-6"
                  >
                    Continue Conversation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journey Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-medium text-foreground mb-4">Your Journey</h2>
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Flame className="w-6 h-6 text-[#756653] mx-auto mb-2" />
                <p className="text-2xl font-medium text-foreground">{stats.daysActive}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-6 h-6 text-[#756653] mx-auto mb-2" />
                <p className="text-2xl font-medium text-foreground">{stats.conversationCount}</p>
                <p className="text-xs text-muted-foreground">Conversations</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <Lightbulb className="w-6 h-6 text-[#756653] mx-auto mb-2" />
                <p className="text-2xl font-medium text-foreground">{stats.insightsCount}</p>
                <p className="text-xs text-muted-foreground">Insights</p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Recent Insights */}
        {insights.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-lg font-medium text-foreground mb-4">Recent Insights</h2>
            <div className="space-y-3">
              {insights.slice(0, 3).map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card 
                    className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => toast.info('Full insight view coming soon!')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#DED1BA]/30 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-4 h-4 text-[#756653]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {insight.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {insight.preview}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {insight.date}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Explore Modules */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-medium text-foreground mb-4">Explore</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(MODULE_INFO).map(([key, module], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <Card 
                  className={cn(
                    "border-0 shadow-sm transition-all cursor-pointer h-full",
                    module.available 
                      ? "hover:shadow-md hover:scale-[1.02]" 
                      : "opacity-60"
                  )}
                  onClick={() => handleModuleClick(key as ModuleType)}
                >
                  <CardContent className="p-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${module.color}20` }}
                    >
                      <div style={{ color: module.color }}>
                        {MODULE_ICONS[key as ModuleType]}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-0.5">
                      {module.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {module.description}
                    </p>
                    {!module.available && (
                      <span className="inline-block mt-2 text-[10px] text-[#756653] bg-[#DED1BA]/30 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8 text-sm text-muted-foreground"
        >
          <p className="font-light">Where Ancient Wisdom Meets Modern Discovery</p>
        </motion.footer>
      </main>
    </div>
  );
}
