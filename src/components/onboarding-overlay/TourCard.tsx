import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, LayoutDashboard, MessageCircle, Link2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SophiaAvatar } from './SophiaAvatar';
import { 
  SOPHIA_GREETINGS, 
  TOUR_RECOMMENDATIONS, 
  TOUR_STEP_CONTENT 
} from '@/types/onboarding-overlay';

interface TourCardProps {
  step: number;
  userName: string;
  spiritualBackground: string;
  onNext: () => void;
  onBack: () => void;
  onDismiss: () => void;
  onComplete: (action: string) => void;
}

const stepIcons = [null, LayoutDashboard, MessageCircle, Link2, Rocket];

export function TourCard({
  step,
  userName,
  spiritualBackground,
  onNext,
  onBack,
  onDismiss,
  onComplete,
}: TourCardProps) {
  const greeting = SOPHIA_GREETINGS[spiritualBackground] || SOPHIA_GREETINGS.default;
  const recommendation = TOUR_RECOMMENDATIONS[spiritualBackground] || TOUR_RECOMMENDATIONS.default;
  const stepContent = TOUR_STEP_CONTENT[spiritualBackground] || TOUR_STEP_CONTENT.default;
  
  const StepIcon = stepIcons[step];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <SophiaAvatar size="lg" />
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal mt-6">
              Welcome, {userName}!
            </h2>
            <p className="text-lg text-terracotta font-medium">
              I'm Sophia, Your Spiritual Formation Guide
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-md">
              {greeting}
            </p>
            <p className="text-muted-foreground mt-4">
              Would you like a quick tour of how WL can serve your spiritual formation?
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <span>⏱️</span>
              <span>Just 2 minutes</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
              <Button 
                onClick={onNext}
                className="bg-terracotta hover:bg-terracotta/90 text-white px-8"
              >
                Yes, Show Me
              </Button>
              <Button 
                variant="outline"
                onClick={onDismiss}
                className="border-charcoal/20 text-charcoal hover:bg-cream"
              >
                I'll Explore Myself
              </Button>
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
              <LayoutDashboard className="w-8 h-8 text-sage" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-charcoal mt-4">
              Your Spiritual Growth Command Center
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-md">
              This is your Personal Formation Hub. Here you'll see your progress, 
              daily suggestions tailored to your journey, and insights from your explorations.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3 max-w-md">
              Think of it as your spiritual formation dashboard—always showing where you are 
              and suggesting where to go next.
            </p>
          </>
        );
      
      case 3:
        return (
          <>
            <div className="w-16 h-16 rounded-full bg-terracotta/20 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-terracotta" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-charcoal mt-4">
              Conversations That Transform
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-md">
              I'm not just a chatbot—I use Socratic questioning to help you 
              discover insights for yourself.
            </p>
            <div className="bg-sage/10 rounded-lg p-4 mt-4 max-w-md">
              <p className="text-sm text-charcoal italic">
                "{stepContent.description}"
              </p>
            </div>
          </>
        );
      
      case 4:
        return (
          <>
            <div className="w-16 h-16 rounded-full bg-ochre/20 flex items-center justify-center">
              <Link2 className="w-8 h-8 text-ochre" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-charcoal mt-4">
              Everything Works Together
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-md">
              WL isn't just separate tools—it's an integrated ecosystem. 
              Discoveries in one area enhance everything else:
            </p>
            <ul className="text-sm text-muted-foreground mt-4 space-y-2 max-w-md">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                Conversations → Saved as insights
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                Patterns → Discussed in community
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
                History → Enriches understanding
              </li>
            </ul>
            <p className="text-muted-foreground text-sm mt-4 max-w-md">
              The platform learns from how you engage and becomes more personalized over time.
            </p>
          </>
        );
      
      case 5:
        return (
          <>
            <div className="w-16 h-16 rounded-full bg-terracotta/20 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-terracotta" />
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-charcoal mt-4">
              Ready to Begin?
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4 max-w-md">
              {recommendation.text}
            </p>
            <Button 
              onClick={() => onComplete(recommendation.route)}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-8 mt-6"
              size="lg"
            >
              {recommendation.cta}
            </Button>
            <button 
              onClick={onDismiss}
              className="text-sm text-muted-foreground hover:text-charcoal mt-4 underline-offset-2 hover:underline"
            >
              Or explore all pathways
            </button>
          </>
        );
      
      default:
        return null;
    }
  };

  const totalSteps = 5;
  const showNavigation = step > 1 && step < 5;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative bg-cream rounded-2xl shadow-2xl w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(184, 90, 62, 0.1)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-charcoal/10 transition-colors z-10"
        aria-label="Close tour"
      >
        <X className="w-5 h-5 text-charcoal/60" />
      </button>

      {/* Navigation arrows for middle steps */}
      {showNavigation && (
        <>
          <button
            onClick={onBack}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-charcoal/10 transition-colors hidden md:flex"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-6 h-6 text-charcoal/60" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-charcoal/10 transition-colors hidden md:flex"
            aria-label="Next step"
          >
            <ChevronRight className="w-6 h-6 text-charcoal/60" />
          </button>
        </>
      )}

      {/* Content */}
      <div className="p-8 md:p-12 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons for mobile (middle steps) */}
        {showNavigation && (
          <div className="flex gap-4 mt-6 md:hidden">
            <Button variant="outline" onClick={onBack} size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button onClick={onNext} size="sm" className="bg-terracotta hover:bg-terracotta/90">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i + 1 === step
                  ? 'bg-terracotta'
                  : i + 1 < step
                  ? 'bg-sage'
                  : 'bg-charcoal/20'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Step {step} of {totalSteps}
        </p>
      </div>
    </motion.div>
  );
}
