import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';
import { markQuizCompleted } from '@/lib/onboardingState';
import { 
  SpiritualBackground, 
  LearningStyle, 
  CommunityPreference, 
  CurrentSeason,
  PERSONA_TITLES,
  LEARNING_MODIFIERS,
} from '@/types/onboarding';
import { Sprout, Heart, Users, GraduationCap, HelpCircle, BookOpen, Eye, MessageCircle, Hand, GitBranch, User, Crown, Search, Blend, CloudRain, Compass, TrendingUp, LucideIcon } from 'lucide-react';
import introBackground from "@/assets/BG_1.png";
import wholelicityLogo from "@/assets/logo_white.svg";
import sophiaOrb from "@/assets/sophia-orb-brown.svg";

interface QuizQuestion {
  id: number;
  question: string;
  subtext?: string;
  options: Array<{
    value: string;
    icon: LucideIcon;
    title: string;
  }>;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Where are you in your spiritual journey?",
    options: [
      { value: 'new_to_faith', icon: Sprout, title: "I'm new to faith and the Bible" },
      { value: 'believer_going_deeper', icon: Heart, title: "I've been a believer for years but want to go deeper" },
      { value: 'pastor_leader', icon: Users, title: "I'm a pastor/ministry leader looking for better tools" },
      { value: 'seminary_student', icon: GraduationCap, title: "I'm studying theology or in seminary" },
      { value: 'exploring_faith', icon: HelpCircle, title: "I'm exploring faith and have questions" },
    ],
  },
  {
    id: 2,
    question: "How do you learn best?",
    options: [
      { value: 'reading_reflection', icon: BookOpen, title: "I learn best by reading and reflection" },
      { value: 'visual_learner', icon: Eye, title: "I'm a visual learner who loves maps, images, and diagrams" },
      { value: 'conversation_discussion', icon: MessageCircle, title: "I learn through conversation and discussion" },
      { value: 'hands_on_interactive', icon: Hand, title: "I prefer hands-on, interactive experiences" },
      { value: 'connections_patterns', icon: GitBranch, title: "I like discovering connections and patterns" },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to grow spiritually?",
    options: [
      { value: 'individual_study', icon: User, title: "I prefer individual, personal study" },
      { value: 'small_group', icon: Users, title: "I'm part of a small group or Bible study" },
      { value: 'group_leader', icon: Crown, title: "I lead groups and need facilitation help" },
      { value: 'seeking_community', icon: Search, title: "I'm looking for spiritual community" },
      { value: 'both_personal_group', icon: Blend, title: "I like both personal and group experiences" },
    ],
  },
  {
    id: 4,
    question: "What brings you to explore deeper spiritual formation right now?",
    subtext: "This helps us personalize your experience",
    options: [
      { value: 'deeper_relationship', icon: Heart, title: "Seeking deeper relationship with God" },
      { value: 'questions_doubts', icon: HelpCircle, title: "Working through questions or doubts" },
      { value: 'difficult_situation', icon: CloudRain, title: "Dealing with a difficult life situation" },
      { value: 'ministry_preparation', icon: Compass, title: "Preparing for ministry or leadership" },
      { value: 'understand_bible', icon: BookOpen, title: "Wanting to understand the Bible better" },
      { value: 'spiritual_growth', icon: TrendingUp, title: "Looking for spiritual growth and formation" },
    ],
  },
];

interface ChatMessage {
  id: string;
  type: 'sophia' | 'user';
  content: string;
  questionId?: number;
  showOptions?: boolean;
  personaTitle?: string;
}

// Sophia orb avatar component
function SophiaAvatar() {
  return (
    <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
      <img 
        src={sophiaOrb} 
        alt="Sophia" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}

interface ChatOnboardingProps {
  onComplete?: () => void;
}

export function ChatOnboarding({ onComplete }: ChatOnboardingProps) {
  const navigate = useNavigate();
  const { data, updateData, processResults, persona } = useOnboarding();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  // Start the conversation immediately on mount
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    // Show typing indicator, then add welcome message
    setIsTyping(true);
    
    const welcomeTimer = setTimeout(() => {
      setIsTyping(false);
      setMessages([{
        id: `sophia-welcome`,
        type: 'sophia',
        content: "Welcome! I'm Sophia, your guide on this journey. Let me ask you a few questions to personalize your experience.",
      }]);
      
      // Show typing for first question
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
        
        const questionTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: `sophia-q0`,
            type: 'sophia',
            content: quizQuestions[0].question,
            questionId: 0,
            showOptions: true,
          }]);
        }, 800);
        
        return () => clearTimeout(questionTimer);
      }, 400);
      
      return () => clearTimeout(typingTimer);
    }, 800);
    
    return () => clearTimeout(welcomeTimer);
  }, []);

  const addSophiaMessage = (content: string, questionId?: number, showOptions?: boolean) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: `sophia-${Date.now()}`,
        type: 'sophia',
        content,
        questionId,
        showOptions,
      }]);
    }, 800);
  };

  const handleSelectOption = (questionIndex: number, value: string, title: string) => {
    // Add user response as a message
    setMessages(prev => {
      // Mark the question as answered (hide options)
      const updated = prev.map(msg => 
        msg.questionId === questionIndex ? { ...msg, showOptions: false } : msg
      );
      
      return [...updated, {
        id: `user-${Date.now()}`,
        type: 'user' as const,
        content: title,
      }];
    });

    // Update the data based on question index
    switch (questionIndex) {
      case 0:
        updateData('spiritualBackground', value as SpiritualBackground);
        break;
      case 1:
        updateData('learningStyle', value as LearningStyle);
        break;
      case 2:
        updateData('communityPreference', value as CommunityPreference);
        break;
      case 3:
        updateData('currentSeason', value as CurrentSeason);
        break;
    }

    // Move to next question or complete
    const nextIndex = questionIndex + 1;
    
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => {
        addSophiaMessage(quizQuestions[nextIndex].question, nextIndex, true);
      }, 600);
    } else {
      // All questions answered - process and show results
      setIsProcessing(true);
      processResults();
      
      setTimeout(() => {
        addSophiaMessage("Thank you for sharing! Let me analyze your responses...");
        
        // Show persona result after a brief delay
        setTimeout(() => {
          // Get the persona based on the selections
          const spiritualBg = questionIndex === 3 ? value as SpiritualBackground : data.spiritualBackground;
          const learningStyle = data.learningStyle;
          
          // Use the first selection (spiritual background) to determine base persona
          const selectedSpiritual = data.spiritualBackground || value as SpiritualBackground;
          const baseTitle = PERSONA_TITLES[selectedSpiritual];
          const modifier = learningStyle ? LEARNING_MODIFIERS[learningStyle] : 'Unique';
          const personaTitle = `The ${modifier} ${baseTitle.replace('The ', '')}`;
          
          const personaDescriptions: Record<SpiritualBackground, string> = {
            new_to_faith: "You're beginning an exciting journey of faith discovery. I'll be your patient guide, introducing you to the richness of Scripture in accessible, meaningful ways.",
            believer_going_deeper: "You've walked with God for years and hunger for more. I'll help you uncover fresh insights and deeper connections in familiar passages.",
            pastor_leader: "As a shepherd of God's people, you need robust tools. I'll enhance your sermon preparation, counseling, and teaching with scholarly resources.",
            seminary_student: "Your academic pursuit of theology is noble. I'll support your studies with original language tools, historical context, and theological connections.",
            exploring_faith: "Your questions are welcome here. I'll create a safe space to explore, investigate, and discover truth at your own pace.",
          };
          
          const description = personaDescriptions[selectedSpiritual];
          
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: `sophia-persona`,
              type: 'sophia',
              content: description,
              personaTitle: personaTitle,
            }]);
            
            // Show continue button after persona reveal
            setTimeout(() => {
              setShowContinueButton(true);
            }, 1000);
          }, 1200);
        }, 1500);
      }, 600);
    }
  };

  const handleContinue = () => {
    // Mark quiz as completed and store the quiz data
    markQuizCompleted({
      spiritualBackground: data.spiritualBackground,
      learningStyle: data.learningStyle,
      communityPreference: data.communityPreference,
      currentSeason: data.currentSeason,
    });
    
    if (onComplete) {
      onComplete();
    } else {
      navigate('/dashboard');
    }
  };

  const currentQuestion = currentQuestionIndex >= 0 ? quizQuestions[currentQuestionIndex] : null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${introBackground})` }}
      />
      
      {/* Solid overlay at 80% opacity */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(34, 34, 34, 0.80)',
        }}
      />

      {/* Wholelicity logo - top center */}
      <div className="absolute top-12 left-0 right-0 flex justify-center z-30">
        <img src={wholelicityLogo} alt="Wholelicity" className="h-6 md:h-8" />
      </div>

      {/* Vertical progress dots - far left */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentQuestionIndex >= step - 1 
                ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]' 
                : 'bg-white/25'
            }`}
          />
        ))}
      </div>

      {/* Chat container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 relative z-10 overflow-y-auto px-4 pb-32 pt-32 flex flex-col"
      >
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'sophia' && <SophiaAvatar />}
                
                <div className={`flex flex-col gap-3 ${message.type === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  {/* Message bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-white/15 text-white rounded-tr-sm'
                        : 'bg-white/95 text-charcoal rounded-tl-sm'
                    }`}
                  >
                    {message.personaTitle ? (
                      <div className="text-[15px] leading-relaxed">
                        <p>Based on your responses, I see you as</p>
                        <p className="text-xl font-bold my-3">{message.personaTitle}</p>
                        <p>{message.content}</p>
                        <p className="mt-3">I'm excited to journey with you!</p>
                        
                        {showContinueButton && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleContinue}
                            className="mt-6 w-full py-3 px-6 rounded-full bg-golden text-charcoal font-medium text-base shadow-md hover:shadow-lg transition-all"
                          >
                            Continue to Dashboard
                          </motion.button>
                        )}
                      </div>
                    ) : (
                      <p className="text-[15px] leading-relaxed">{message.content}</p>
                    )}
                  </div>

                  {/* Options for Sophia questions */}
                  {message.type === 'sophia' && message.showOptions && message.questionId !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="w-full space-y-2 mt-1"
                    >
                      {quizQuestions[message.questionId].options.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <motion.button
                            key={option.value}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={() => handleSelectOption(message.questionId!, option.value, option.title)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/40 transition-all duration-200 text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white/90 text-sm group-hover:text-white transition-colors">
                              {option.title}
                            </span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-burnt-orange/80 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 justify-start"
              >
                <SophiaAvatar />
                <div className="bg-white/95 px-4 py-3 rounded-2xl rounded-tl-sm" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-charcoal/40"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-charcoal/40"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-charcoal/40"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
