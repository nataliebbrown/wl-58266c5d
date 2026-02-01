import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
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
import type { BibleReference } from '@/lib/bibleApi';
import { Insight } from '@/types/dashboard';
import { toast } from 'sonner';
import { hasCompletedQuiz, hasChatGreetingBeenSeen, markChatGreetingSeen, markFullyOnboarded } from '@/lib/onboardingState';
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
            className="flex justify-start mb-4"
          >
            <div
              className="rounded-2xl px-3 py-2 text-sm leading-relaxed bg-white/60 dark:bg-wl-olive-300/15 text-foreground max-w-[85%]"
              style={{ backdropFilter: 'blur(4px)' }}
            >
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
            <div className="flex justify-start mb-8">
              <div
                className="rounded-2xl px-3 py-2 text-sm leading-relaxed bg-white/60 dark:bg-wl-olive-300/15 text-foreground max-w-[85%]"
                style={{ backdropFilter: 'blur(4px)' }}
              >
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
              className="flex flex-wrap gap-2 mb-4"
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
                  className="px-4 py-2 rounded-full text-sm border border-wl-olive/15 dark:border-wl-olive-300/15 hover:border-wl-olive/35 dark:hover:border-wl-olive-300/35 hover:bg-wl-olive/5 dark:hover:bg-wl-olive-300/5 transition-all duration-200 text-foreground/80 hover:text-foreground"
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

export default function Chat() {
  const navigate = useNavigate();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (!hasCompletedOnboarding()) {
      navigate('/');
    }
  }, [hasCompletedOnboarding, navigate]);

  // Detect first visit after quiz — show persona greeting once
  useEffect(() => {
    if (hasCompletedQuiz() && !hasChatGreetingBeenSeen()) {
      markChatGreetingSeen();
      // Also mark fully onboarded if not already (e.g. user came here before the tour)
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

  // Handle clicking a Bible passage reference in Sophia's response
  const handlePassageClick = useCallback((ref: BibleReference) => {
    navigate('/bible', {
      state: { initialReference: ref, conversationId: currentConversation?.id },
    });
  }, [navigate, currentConversation]);

  // Get user name from persona
  const userName = personaData?.name || undefined;

  const showWelcome = messages.length === 0 && !isTyping && !isFirstVisit;
  const showFirstVisitGreeting = messages.length === 0 && isFirstVisit;

  return (
    <div className="h-full flex transition-colors duration-300 bg-white/70 dark:bg-[linear-gradient(145deg,#2F2921,#241E17)]">
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
        {/* Sidebar toggle (mobile) */}
        <div className="flex items-center gap-3 px-4 py-2 md:hidden flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open chat history"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {currentConversation && (
            <p className="text-sm font-medium text-foreground/60 truncate">
              {currentConversation.title}
            </p>
          )}
        </div>

        {/* Chat content */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-8 md:px-16 pt-10 pb-6">
              <div>
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
                        onPassageClick={handlePassageClick}
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
