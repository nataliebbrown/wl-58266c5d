import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ArrowLeft, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { WelcomeScreen } from '@/components/chat/WelcomeScreen';
import { CrisisModal } from '@/components/chat/CrisisModal';
import { SaveInsightModal } from '@/components/chat/SaveInsightModal';
import { useSophiaChat } from '@/hooks/useSophiaChat';
import { useConversations } from '@/hooks/useConversations';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Message, getSuggestedTopics, SuggestedTopic, UserPersona } from '@/types/chat';
import { Insight } from '@/types/dashboard';
import { toast } from 'sonner';
import { SophiaAvatar } from '@/components/sophia/SophiaAvatar';
import { getOnboardingState, markFullyOnboarded } from '@/lib/onboardingState';
import { getPersonaGreeting, getPersonaTopics } from '@/lib/sophiaMessages';
import { saveInsight as saveToConstellation } from '@/lib/insights';

// ============ First Visit Greeting (uses persona-specific messages) ============

function FirstVisitGreeting({
  greetingTyping,
  showGreeting,
  spiritualBackground,
  onSelectTopic,
}: {
  greetingTyping: boolean;
  showGreeting: boolean;
  spiritualBackground?: string;
  onSelectTopic: (topic: SuggestedTopic) => void;
}) {
  const greeting = getPersonaGreeting(spiritualBackground);
  const topics = getPersonaTopics(spiritualBackground);

  return (
    <div className="py-6">
      <AnimatePresence>
        {greetingTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 mb-4"
          >
            <div className="chat-sophia-avatar rounded-full flex-shrink-0">
              <SophiaAvatar size="sm" />
            </div>
            <div className="chat-bubble-sophia px-4 py-3 rounded-2xl rounded-tl-sm">
              <TypingIndicator />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-3 mb-8">
              <div className="chat-sophia-avatar rounded-full flex-shrink-0">
                <SophiaAvatar size="sm" />
              </div>
              <div className="chat-bubble-sophia px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                {greeting.paragraphs.map((paragraph, i) => (
                  <p key={i} className={`text-[15px] leading-relaxed ${i > 0 ? 'mt-2' : ''}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-wrap gap-2 ml-12 mb-4"
            >
              {topics.slice(0, 4).map((topic, index) => (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.08 }}
                  onClick={() => onSelectTopic({
                    id: topic.id,
                    title: topic.title,
                    prompt: topic.prompt,
                    category: 'exploration',
                  })}
                  className="px-4 py-2 rounded-full text-sm bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/90 hover:border-[#87A96B]/30 transition-all duration-200 text-foreground/80 hover:text-foreground"
                >
                  {topic.title}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Main Chat Component ============

export default function Chat({ embedded }: { embedded?: boolean } = {}) {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [crisisModal, setCrisisModal] = useState<{ open: boolean; level: 'low' | 'medium' | 'high' }>({
    open: false,
    level: 'low'
  });
  const [saveInsightModal, setSaveInsightModal] = useState<{ open: boolean; message: Message | null }>({
    open: false,
    message: null
  });
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set());
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingTyping, setGreetingTyping] = useState(false);

  // Hooks
  const { hasCompletedOnboarding, getPersonaFromOnboarding, addInsight } = useUserProfile();
  const {
    conversations,
    currentConversation,
    isLoading: conversationsLoading,
    createConversation,
    updateConversationTitle,
    deleteConversation,
    selectConversation
  } = useConversations();

  // Get user persona from onboarding
  const personaData = getPersonaFromOnboarding();
  const userPersona: UserPersona | null = personaData ? {
    spiritualBackground: personaData.spiritualBackground || '',
    learningStyle: personaData.learningStyle || '',
    communityPreference: personaData.communityPreference || '',
    currentSeason: personaData.currentSeason || ''
  } : null;

  const {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
    loadMessages
  } = useSophiaChat({
    userPersona,
    conversationId: currentConversation?.id,
    onCrisisDetected: (level) => {
      setCrisisModal({ open: true, level });
    }
  });

  // Get suggested topics based on persona
  const suggestedTopics = getSuggestedTopics(userPersona || undefined);

  // Initialize dark mode from localStorage (default to light mode)
  useEffect(() => {
    const savedMode = localStorage.getItem('wl-dark-mode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      // Default to light mode
      setIsDarkMode(false);
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

  // Redirect to onboarding if not completed (skip when embedded in modal)
  useEffect(() => {
    if (!embedded && !hasCompletedOnboarding()) {
      navigate('/');
    }
  }, [embedded, hasCompletedOnboarding, navigate]);

  // Detect first visit from quiz completion
  useEffect(() => {
    const state = getOnboardingState();
    if (state.phase === 'quiz-completed') {
      markFullyOnboarded();
      setIsFirstVisit(true);
      setGreetingTyping(true);
      const timer = setTimeout(() => {
        setGreetingTyping(false);
        setShowGreeting(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    if (currentConversation) {
      loadMessages(currentConversation.id);
    } else {
      clearMessages();
    }
  }, [currentConversation, loadMessages, clearMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle sending a message
  const handleSendMessage = useCallback(async (content: string) => {
    // Clear first-visit greeting when user sends a message
    if (isFirstVisit) {
      setIsFirstVisit(false);
    }

    // Create conversation if needed
    if (!currentConversation) {
      const conv = await createConversation(
        content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        undefined,
        userPersona?.spiritualBackground
      );
      if (!conv) return;
    }

    await sendMessage(content);
  }, [currentConversation, createConversation, sendMessage, userPersona, isFirstVisit]);

  // Handle topic selection
  const handleSelectTopic = useCallback(async (topic: SuggestedTopic) => {
    const conv = await createConversation(topic.title, topic.category, userPersona?.spiritualBackground);
    if (conv) {
      setSidebarOpen(false);
      await sendMessage(topic.prompt);
    }
  }, [createConversation, sendMessage, userPersona]);

  // Handle new conversation
  const handleNewConversation = useCallback(() => {
    selectConversation(null);
    clearMessages();
    setSidebarOpen(false);
  }, [selectConversation, clearMessages]);

  // Handle save insight
  const handleSaveInsight = useCallback((message: Message) => {
    setSaveInsightModal({ open: true, message });
  }, []);

  const handleConfirmSaveInsight = useCallback((insight: Omit<Insight, 'id'>) => {
    addInsight(insight);

    // Also save to the constellation data layer
    saveToConstellation({
      title: insight.title,
      content: insight.fullContent || insight.preview,
      theme: insight.title,
      tags: [insight.category],
      source: {
        type: 'chat',
        reference: currentConversation?.title,
      },
      conversationId: currentConversation?.id,
    });

    if (saveInsightModal.message) {
      setSavedMessageIds(prev => new Set([...prev, saveInsightModal.message!.id]));
    }
    toast.success('Insight saved to your constellation');
  }, [addInsight, saveInsightModal.message, currentConversation]);

  // Get user name from persona
  const userName = personaData?.name || undefined;

  const showWelcome = messages.length === 0 && !isTyping && !isFirstVisit;
  const showFirstVisitGreeting = messages.length === 0 && isFirstVisit;

  return (
    <div className={`${embedded ? 'h-full' : 'h-screen'} flex chat-bg-light transition-colors duration-300`}>
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentConversation={currentConversation}
        suggestedTopics={suggestedTopics}
        isLoading={conversationsLoading}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewConversation={handleNewConversation}
        onSelectConversation={(conv) => {
          selectConversation(conv);
          setSidebarOpen(false);
        }}
        onDeleteConversation={deleteConversation}
        onRenameConversation={updateConversationTitle}
        onSelectTopic={handleSelectTopic}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        {!embedded && (
          <header className="h-16 flex items-center justify-between px-4 md:px-10">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="gap-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="chat-sophia-avatar rounded-full">
                <SophiaAvatar size="sm" />
              </div>
              <div className="text-left">
                <h1 className="font-semibold text-sm text-foreground">Sophia</h1>
                <p className="text-xs text-muted-foreground">
                  {currentConversation?.title || 'Your spiritual companion'}
                </p>
              </div>
            </div>

            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </header>
        )}

        {/* Chat container with glassmorphism */}
        <div className="flex-1 flex flex-col min-h-0 px-4 md:px-10 pb-4 md:pb-6">
          <div className="flex-1 flex flex-col chat-container-glass overflow-hidden">
            {/* Messages area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 md:px-8 py-6">
              <div className="max-w-[900px] mx-auto">
                {showFirstVisitGreeting ? (
                  <FirstVisitGreeting
                    greetingTyping={greetingTyping}
                    showGreeting={showGreeting}
                    spiritualBackground={userPersona?.spiritualBackground}
                    onSelectTopic={(topic) => {
                      setIsFirstVisit(false);
                      handleSelectTopic(topic);
                    }}
                  />
                ) : showWelcome ? (
                  <WelcomeScreen
                    userName={userName}
                    suggestedTopics={suggestedTopics}
                    onSelectTopic={handleSelectTopic}
                  />
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onSaveInsight={message.role === 'assistant' ? handleSaveInsight : undefined}
                        isSaved={savedMessageIds.has(message.id)}
                        index={index}
                      />
                    ))}
                    
                    <AnimatePresence>
                      {isTyping && <TypingIndicator />}
                    </AnimatePresence>
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input area */}
            <ChatInput
              onSend={handleSendMessage}
              isLoading={isTyping}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CrisisModal
        open={crisisModal.open}
        onOpenChange={(open) => setCrisisModal(prev => ({ ...prev, open }))}
        level={crisisModal.level}
      />

      <SaveInsightModal
        open={saveInsightModal.open}
        onOpenChange={(open) => setSaveInsightModal(prev => ({ ...prev, open }))}
        message={saveInsightModal.message}
        onSave={handleConfirmSaveInsight}
      />
    </div>
  );
}
