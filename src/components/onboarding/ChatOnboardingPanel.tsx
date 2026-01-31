import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';
import {
  markQuizCompleted,
  markQuizStarted,
  saveQuizProgress,
  getQuizProgress,
} from '@/lib/onboardingState';
import {
  SpiritualBackground,
  LearningStyle,
  CommunityPreference,
  CurrentSeason,
  DEFAULT_ONBOARDING_DATA,
} from '@/types/onboarding';
import { getPersonaName } from '@/lib/personaNames';
import { Sprout, Heart, Users, GraduationCap, HelpCircle, BookOpen, Eye, MessageCircle, Hand, GitBranch, User, Crown, Search, Blend, CloudRain, Compass, TrendingUp, ChevronLeft, LucideIcon } from 'lucide-react';
import sophiaOrb from "@/assets/sophia-orb-brown.svg";

// ============ Quiz Data ============

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

// ============ Sophia Acknowledgments ============

const acknowledgments: Record<number, Record<string, string>> = {
  0: {
    new_to_faith: "What a beautiful beginning! Every great journey starts with curiosity, and I'm so glad you're here.",
    believer_going_deeper: "I love that hunger for more! There's always deeper to go, and I can't wait to explore that with you.",
    pastor_leader: "What a noble calling! I'm here to support your ministry and walk alongside you.",
    seminary_student: "The pursuit of deeper understanding is a wonderful gift \u2014 let's dig into it together!",
    exploring_faith: "Your honesty is refreshing. Questions are the doorway to wisdom, and this is a safe place to ask them.",
  },
  1: {
    reading_reflection: "A contemplative heart \u2014 there's so much beauty in quiet reflection. I'll make sure we lean into that.",
    visual_learner: "Seeing truth unfold visually can be so powerful! I'll keep that in mind as we journey together.",
    conversation_discussion: "There's something sacred about learning through dialogue \u2014 and that's exactly what we'll do here!",
    hands_on_interactive: "Engaging with truth through experience makes it come alive \u2014 I love that about you!",
    connections_patterns: "Discovering the threads that connect everything \u2014 that's a real gift. Let's put it to good use!",
  },
  2: {
    individual_study: "Personal time with God is so foundational. I'll be right here whenever you're ready to go deeper.",
    small_group: "Community sharpens and strengthens our faith \u2014 there's nothing quite like growing together!",
    group_leader: "Leading others in discovery is a beautiful calling. I'd love to help equip you for that!",
    seeking_community: "You're not meant to walk this path alone \u2014 and you won't have to.",
    both_personal_group: "The balance of solitude and community is so healthy. We'll nurture both!",
  },
};

// ============ Helpers ============

const FIELD_KEYS = ['spiritualBackground', 'learningStyle', 'communityPreference', 'currentSeason'] as const;

function findOptionTitle(questionIndex: number, value: string): string {
  const option = quizQuestions[questionIndex]?.options.find(o => o.value === value);
  return option?.title ?? value;
}

// ============ Chat Message Type ============

interface ChatMessage {
  id: string;
  type: 'sophia' | 'user';
  content: string;
  questionId?: number;
  showOptions?: boolean;
  personaTitle?: string;
}

// ============ Sophia Avatar ============

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

// ============ Main Component ============

interface ChatOnboardingPanelProps {
  onComplete?: () => void;
}

export function ChatOnboardingPanel({ onComplete }: ChatOnboardingPanelProps) {
  const navigate = useNavigate();
  const { data, updateData, processResults } = useOnboarding();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [answers, setAnswers] = useState<Record<number, { value: string; title: string } | 'skipped'>>({});
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

  // Start the conversation on mount (or resume from saved progress)
  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check for saved progress
    const progress = getQuizProgress();

    if (progress && progress.currentQuestionIndex > 0) {
      // Resume: restore hook data from saved answers
      for (const [indexStr, value] of Object.entries(progress.answers)) {
        const idx = parseInt(indexStr);
        if (idx < FIELD_KEYS.length) {
          updateData(FIELD_KEYS[idx], value as SpiritualBackground & LearningStyle & CommunityPreference & CurrentSeason);
        }
      }

      // Rebuild answers state
      const restored: Record<number, { value: string; title: string } | 'skipped'> = {};
      for (const [indexStr, value] of Object.entries(progress.answers)) {
        const idx = parseInt(indexStr);
        restored[idx] = { value, title: findOptionTitle(idx, value) };
      }
      setAnswers(restored);

      const savedIndex = progress.currentQuestionIndex;
      setCurrentQuestionIndex(savedIndex);

      // Show "welcome back" then current question
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{
          id: 'sophia-welcome',
          type: 'sophia',
          content: "Welcome back! Let's continue where we left off...",
        }]);

        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: `sophia-q${savedIndex}`,
              type: 'sophia',
              content: quizQuestions[savedIndex].question,
              questionId: savedIndex,
              showOptions: true,
            }]);
          }, 700);
        }, 300);
      }, 800);

      return;
    }

    // First visit: mark quiz started and show welcome
    markQuizStarted();
    setIsTyping(true);

    const welcomeTimer = setTimeout(() => {
      setIsTyping(false);
      setMessages([{
        id: 'sophia-welcome',
        type: 'sophia',
        content: "Welcome! I'm Sophia, your guide on this journey. Let me ask you a few questions to personalize your experience.",
      }]);

      const typingTimer = setTimeout(() => {
        setIsTyping(true);

        const questionTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: 'sophia-q0',
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============ Answer Selection ============

  const handleSelectOption = (questionIndex: number, value: string, title: string) => {
    // Record the answer
    const newAnswers = { ...answers, [questionIndex]: { value, title } };
    setAnswers(newAnswers);

    // Add user response as a message, hide options on the question
    setMessages(prev => {
      const updated = prev.map(msg =>
        msg.questionId === questionIndex ? { ...msg, showOptions: false } : msg
      );
      return [...updated, {
        id: `user-q${questionIndex}`,
        type: 'user' as const,
        content: title,
      }];
    });

    // Update the onboarding hook data
    updateData(FIELD_KEYS[questionIndex], value as SpiritualBackground & LearningStyle & CommunityPreference & CurrentSeason);

    // Save progress
    const rawAnswers: Record<number, string> = {};
    for (const [idx, ans] of Object.entries(newAnswers)) {
      if (ans !== 'skipped') rawAnswers[Number(idx)] = ans.value;
    }

    const nextIndex = questionIndex + 1;

    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      saveQuizProgress(nextIndex, rawAnswers);

      // Show acknowledgment, then next question
      const ack = acknowledgments[questionIndex]?.[value];

      if (ack) {
        // Typing → acknowledgment → typing → next question
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: `sophia-ack-${questionIndex}`,
              type: 'sophia',
              content: ack,
            }]);

            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                  id: `sophia-q${nextIndex}`,
                  type: 'sophia',
                  content: quizQuestions[nextIndex].question,
                  questionId: nextIndex,
                  showOptions: true,
                }]);
              }, 700);
            }, 300);
          }, 700);
        }, 400);
      } else {
        // No acknowledgment for this question — just show next
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              id: `sophia-q${nextIndex}`,
              type: 'sophia',
              content: quizQuestions[nextIndex].question,
              questionId: nextIndex,
              showOptions: true,
            }]);
          }, 800);
        }, 600);
      }
    } else {
      // Last question — show results
      saveQuizProgress(nextIndex, rawAnswers);
      showQuizResults(value as SpiritualBackground);
    }
  };

  // ============ Skip Question ============

  const handleSkipQuestion = (questionIndex: number) => {
    // Record skip
    const newAnswers = { ...answers, [questionIndex]: 'skipped' as const };
    setAnswers(newAnswers);

    // Hide options on current question
    setMessages(prev => prev.map(msg =>
      msg.questionId === questionIndex ? { ...msg, showOptions: false } : msg
    ));

    // Save progress (skipped questions not included in answers)
    const rawAnswers: Record<number, string> = {};
    for (const [idx, ans] of Object.entries(newAnswers)) {
      if (ans !== 'skipped') rawAnswers[Number(idx)] = ans.value;
    }

    const nextIndex = questionIndex + 1;

    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      saveQuizProgress(nextIndex, rawAnswers);

      // Brief Sophia message, then next question
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: `sophia-skip-${questionIndex}`,
            type: 'sophia',
            content: "No worries! We can explore that later...",
          }]);

          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, {
                id: `sophia-q${nextIndex}`,
                type: 'sophia',
                content: quizQuestions[nextIndex].question,
                questionId: nextIndex,
                showOptions: true,
              }]);
            }, 700);
          }, 300);
        }, 600);
      }, 300);
    } else {
      // Last question was skipped — show results with defaults
      saveQuizProgress(nextIndex, rawAnswers);
      const bg = (data.spiritualBackground ?? DEFAULT_ONBOARDING_DATA.spiritualBackground) as SpiritualBackground;
      showQuizResults(bg);
    }
  };

  // ============ Skip Entire Quiz ============

  const handleSkipQuiz = () => {
    markQuizCompleted({
      spiritualBackground: DEFAULT_ONBOARDING_DATA.spiritualBackground,
      learningStyle: DEFAULT_ONBOARDING_DATA.learningStyle,
      communityPreference: DEFAULT_ONBOARDING_DATA.communityPreference,
      currentSeason: DEFAULT_ONBOARDING_DATA.currentSeason,
    });

    if (onComplete) {
      onComplete();
    } else {
      navigate('/chat');
    }
  };

  // ============ Back Navigation ============

  const handleGoBack = () => {
    if (currentQuestionIndex === 0) return;

    const prevIndex = currentQuestionIndex - 1;
    const prevAnswer = answers[prevIndex];

    // Remove messages related to going forward from prevIndex
    setMessages(prev => {
      const filtered = prev.filter(msg => {
        // Remove current question
        if (msg.id === `sophia-q${currentQuestionIndex}`) return false;
        // Remove previous answer's follow-up messages
        if (prevAnswer === 'skipped') {
          if (msg.id === `sophia-skip-${prevIndex}`) return false;
        } else {
          if (msg.id === `user-q${prevIndex}`) return false;
          if (msg.id === `sophia-ack-${prevIndex}`) return false;
        }
        return true;
      });

      // Re-enable options on the previous question
      return filtered.map(msg =>
        msg.id === `sophia-q${prevIndex}` ? { ...msg, showOptions: true } : msg
      );
    });

    // Clear the previous answer from state
    setAnswers(prev => {
      const next = { ...prev };
      delete next[prevIndex];
      return next;
    });

    // Clear the data in the onboarding hook
    if (prevAnswer && prevAnswer !== 'skipped') {
      updateData(FIELD_KEYS[prevIndex], null as unknown as SpiritualBackground & LearningStyle & CommunityPreference & CurrentSeason);
    }

    setCurrentQuestionIndex(prevIndex);

    // Save updated progress
    const rawAnswers: Record<number, string> = {};
    for (const [idx, ans] of Object.entries(answers)) {
      if (Number(idx) !== prevIndex && ans !== 'skipped') {
        rawAnswers[Number(idx)] = ans.value;
      }
    }
    saveQuizProgress(prevIndex, rawAnswers);
  };

  // ============ Quiz Results ============

  const showQuizResults = (lastSpiritualValue: SpiritualBackground) => {
    processResults();

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: 'sophia-analyzing',
          type: 'sophia',
          content: "Thank you for sharing! Let me put this together...",
        }]);

        setTimeout(() => {
          const selectedSpiritual = data.spiritualBackground || lastSpiritualValue;
          const learningStyle = data.learningStyle ?? DEFAULT_ONBOARDING_DATA.learningStyle!;
          const community = data.communityPreference ?? DEFAULT_ONBOARDING_DATA.communityPreference!;
          const season = data.currentSeason ?? DEFAULT_ONBOARDING_DATA.currentSeason!;

          const personaTitle = getPersonaName(
            selectedSpiritual,
            learningStyle,
            community,
            season,
          );

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
              id: 'sophia-persona',
              type: 'sophia',
              content: description,
              personaTitle,
            }]);

            setTimeout(() => {
              setShowContinueButton(true);
            }, 1000);
          }, 1200);
        }, 1500);
      }, 700);
    }, 600);
  };

  // ============ Continue (quiz complete) ============

  const handleContinue = () => {
    // Fill in defaults for any skipped questions
    const finalData = {
      spiritualBackground: data.spiritualBackground ?? DEFAULT_ONBOARDING_DATA.spiritualBackground,
      learningStyle: data.learningStyle ?? DEFAULT_ONBOARDING_DATA.learningStyle,
      communityPreference: data.communityPreference ?? DEFAULT_ONBOARDING_DATA.communityPreference,
      currentSeason: data.currentSeason ?? DEFAULT_ONBOARDING_DATA.currentSeason,
    };

    markQuizCompleted(finalData);

    if (onComplete) {
      onComplete();
    } else {
      navigate('/chat');
    }
  };

  // ============ Render ============

  return (
    <div className="h-full flex flex-col relative">
      {/* Skip quiz link — top right */}
      {!showContinueButton && (
        <button
          onClick={handleSkipQuiz}
          className="absolute top-4 right-6 text-white/50 hover:text-white/80 text-sm z-20 transition-colors"
        >
          I'll personalize later
        </button>
      )}

      {/* Back button + progress dots — left side */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 flex flex-col items-center gap-3 z-20">
        {/* Back button */}
        {currentQuestionIndex > 0 && !showContinueButton && (
          <button
            onClick={handleGoBack}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors mb-1"
            aria-label="Go back"
          >
            <ChevronLeft className="w-4 h-4 text-white/80" />
          </button>
        )}

        {/* Progress dots */}
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentQuestionIndex >= step - 1
                ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto pt-12 pb-28 px-16"
      >
        <div className="w-full space-y-6">
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
                        ? 'bg-white/10 text-white rounded-tr-sm'
                        : 'bg-white/80 text-charcoal rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {message.personaTitle ? (
                      <div className="text-[15px] leading-relaxed">
                        <p>Based on your responses, I see you as</p>
                        <p
                          className="text-2xl my-3"
                          style={{ fontFamily: '"Libre Bodoni", Georgia, serif' }}
                        >
                          {message.personaTitle}
                        </p>
                        <p>{message.content}</p>
                        <p className="mt-3">I'm excited to journey with you!</p>
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
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 hover:bg-white/90 border border-white/50 hover:border-charcoal/20 transition-all duration-200 text-left group shadow-sm"
                          >
                            <div className="w-8 h-8 rounded-lg bg-charcoal/10 flex items-center justify-center flex-shrink-0 group-hover:bg-charcoal/15 transition-colors">
                              <Icon className="w-4 h-4 text-charcoal/70" />
                            </div>
                            <span className="text-charcoal/80 text-sm group-hover:text-charcoal transition-colors">
                              {option.title}
                            </span>
                          </motion.button>
                        );
                      })}

                      {/* Skip this question link */}
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => handleSkipQuestion(message.questionId!)}
                        className="w-full text-center text-white/40 hover:text-white/70 text-xs py-2 transition-colors"
                      >
                        Skip this question
                      </motion.button>
                    </motion.div>
                  )}
                </div>

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
                <div className="bg-white/80 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
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

      {/* Continue button overlay */}
      {showContinueButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute bottom-6 left-16 right-16 z-20"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full py-3 px-6 rounded-full text-white font-medium text-base shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#2F2921', outline: '7px solid rgba(47, 41, 33, 0.25)', outlineOffset: '0px' }}
          >
            Let's go!
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
