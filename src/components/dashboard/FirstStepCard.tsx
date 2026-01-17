import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageCircle, BookOpen, Languages, Users, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FIRST_STEP_CONTENT, 
  LEARNING_STYLE_MODIFIERS,
  FirstStepContent 
} from '@/types/firstTimeExperience';
import { SpiritualBackground, LearningStyle } from '@/types/onboarding';
import { toast } from 'sonner';

interface FirstStepCardProps {
  spiritualBackground: SpiritualBackground;
  learningStyle: LearningStyle;
  onSkip: () => void;
}

const getIcon = (action: string) => {
  switch (action) {
    case 'wisdom-guide':
      return MessageCircle;
    case 'patterns':
      return Compass;
    case 'languages':
      return Languages;
    default:
      return BookOpen;
  }
};

export function FirstStepCard({ spiritualBackground, learningStyle, onSkip }: FirstStepCardProps) {
  const navigate = useNavigate();
  const content: FirstStepContent = FIRST_STEP_CONTENT[spiritualBackground];
  const learningModifier = LEARNING_STYLE_MODIFIERS[learningStyle];
  
  const PrimaryIcon = getIcon(content.primaryAction);

  const handlePrimaryAction = () => {
    switch (content.primaryAction) {
      case 'wisdom-guide':
        toast.info("Wisdom Guide coming in Phase 3!");
        break;
      case 'patterns':
        toast.info(content.alertMessage || "Pattern Discovery coming in Phase 6!");
        break;
      case 'languages':
        toast.info(content.alertMessage || "Translation Bridge coming in Phase 6!");
        break;
      default:
        toast.info(content.alertMessage || "Coming soon!");
    }
  };

  const handleSecondaryAction = () => {
    switch (content.secondaryAction) {
      case 'wisdom-guide':
        toast.info("Wisdom Guide coming in Phase 3!");
        break;
      default:
        toast.info(content.alertMessage || "Coming soon!");
    }
  };

  // Modify invitation based on learning style
  const getModifiedInvitation = () => {
    let invitation = content.invitation;
    
    if (learningStyle === 'visual_learner') {
      invitation = invitation.replace('explore', 'visualize and explore');
    } else if (learningStyle === 'conversation_discussion') {
      invitation = invitation.replace('explore', 'discuss and explore');
    } else if (learningStyle === 'hands_on_interactive') {
      invitation = invitation.replace('explore', 'interactively explore');
    } else if (learningStyle === 'connections_patterns') {
      invitation = invitation.replace('explore', 'discover connections as you explore');
    }
    
    return invitation;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-card via-card to-sage/10">
        {/* Subtle pulsing glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sage/10 pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <CardContent className="relative z-10 p-8 md:p-12">
          {/* Header with sparkle */}
          <div className="flex items-center gap-2 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 text-ochre" />
            </motion.div>
            <span className="text-sm font-medium text-ochre tracking-wide uppercase">
              Your First Step
            </span>
            {learningModifier.icon && (
              <span className="ml-2 text-sm">{learningModifier.icon}</span>
            )}
          </div>

          {/* Main headline */}
          <h2 className="font-spiritual text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight">
            {content.headline}
          </h2>

          {/* Invitation text */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            {getModifiedInvitation()}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              onClick={handlePrimaryAction}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <PrimaryIcon className="mr-2 h-5 w-5" />
              {content.primaryCta}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryAction}
              className="border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-8 py-6 text-lg font-medium transition-all duration-300"
            >
              {content.secondaryCta}
            </Button>
          </div>

          {/* Skip link */}
          <motion.button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            whileHover={{ x: 2 }}
          >
            Or skip to explore on your own →
          </motion.button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
