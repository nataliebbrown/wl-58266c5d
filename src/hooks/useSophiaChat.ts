import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message, UserPersona } from '@/types/chat';
import { detectCrisis } from '@/lib/crisisDetection';
import { toast } from 'sonner';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-sophia`;

// ============ Auth Helper ============

async function getAuthUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

// ============ localStorage Message Helpers ============

function loadLocalMessages(convId: string): Message[] {
  try {
    const raw = localStorage.getItem(`wl_messages_${convId}`);
    if (!raw) return [];
    return JSON.parse(raw).map((m: Record<string, unknown>) => ({
      ...m,
      createdAt: new Date(m.createdAt as string),
    }));
  } catch {
    return [];
  }
}

function saveLocalMessages(convId: string, msgs: Message[]) {
  localStorage.setItem(`wl_messages_${convId}`, JSON.stringify(msgs));
}

function updateLocalConversationCount(convId: string, count: number) {
  try {
    const raw = localStorage.getItem('wl_conversations');
    if (!raw) return;
    const convs = JSON.parse(raw);
    const updated = convs.map((c: Record<string, unknown>) =>
      c.id === convId ? { ...c, messageCount: count, updatedAt: new Date().toISOString() } : c
    );
    localStorage.setItem('wl_conversations', JSON.stringify(updated));
  } catch {
    // Ignore localStorage errors
  }
}

// ============ Hook ============

interface UseSophiaChatOptions {
  userPersona?: UserPersona | null;
  conversationId?: string | null;
  systemContext?: string;
  onCrisisDetected?: (level: 'low' | 'medium' | 'high') => void;
}

export function useSophiaChat({
  userPersona,
  conversationId,
  systemContext,
  onCrisisDetected
}: UseSophiaChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Keep a ref so the save logic always reads the latest conversationId,
  // even when it was set mid-request via lazy conversation creation.
  const conversationIdRef = useRef(conversationId);
  conversationIdRef.current = conversationId;

  const loadMessages = useCallback(async (convId: string) => {
    try {
      const userId = await getAuthUserId();

      if (!userId) {
        // Fallback: load from localStorage
        const local = loadLocalMessages(convId);
        setMessages(local);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      const loadedMessages: Message[] = (data || []).map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        createdAt: new Date(msg.created_at),
        isSavedInsight: msg.is_saved_insight
      }));

      setMessages(loadedMessages);
    } catch (err) {
      console.error('Failed to load messages:', err);
      // Fall back to localStorage on error
      const local = loadLocalMessages(convId);
      if (local.length > 0) {
        setMessages(local);
      } else {
        toast.error('Failed to load conversation history');
      }
    }
  }, []);

  const sendMessage = useCallback(async (content: string): Promise<boolean> => {
    if (!content.trim() || isTyping) return false;

    setError(null);

    // Check for crisis keywords (with spiritual false-positive filtering)
    const crisis = detectCrisis(content);
    if (crisis.detected && crisis.level !== 'none' && onCrisisDetected) {
      onCrisisDetected(crisis.level as 'low' | 'medium' | 'high');
    }

    // Create user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      createdAt: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      // Build message history for API
      const apiMessages = [
        ...(systemContext ? [{ role: 'system' as const, content: systemContext }] : []),
        ...[...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content
        })),
      ];

      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: apiMessages,
          userPersona
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      let textBuffer = '';

      // Create assistant message placeholder
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        createdAt: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        // Process line by line
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content;
            if (deltaContent) {
              assistantContent += deltaContent;
              // Update the assistant message with new content
              setMessages(prev =>
                prev.map((m, i) =>
                  i === prev.length - 1
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            // Incomplete JSON, put it back
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Save messages to database if we have a conversation.
      // Read from ref so lazy-created conversations are picked up.
      const activeConvId = conversationIdRef.current;
      if (activeConvId) {
        const userId = await getAuthUserId();

        if (userId) {
          // Save to Supabase
          await supabase.from('messages').insert({
            id: userMessage.id,
            conversation_id: activeConvId,
            user_id: userId,
            role: 'user',
            content: userMessage.content
          });

          await supabase.from('messages').insert({
            id: assistantMessage.id,
            conversation_id: activeConvId,
            user_id: userId,
            role: 'assistant',
            content: assistantContent
          });

          await supabase
            .from('conversations')
            .update({
              message_count: messages.length + 2,
              updated_at: new Date().toISOString()
            })
            .eq('id', activeConvId);
        } else {
          // Fallback: save to localStorage
          const existing = loadLocalMessages(activeConvId);
          existing.push(
            { id: userMessage.id, role: 'user', content: userMessage.content, createdAt: userMessage.createdAt },
            { id: assistantMessage.id, role: 'assistant', content: assistantContent, createdAt: assistantMessage.createdAt },
          );
          saveLocalMessages(activeConvId, existing);
          updateLocalConversationCount(activeConvId, existing.length);
        }
      }

      return true;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return false;
      }

      console.error('Send message error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      toast.error(errorMessage);

      // Remove the assistant placeholder on error
      setMessages(prev => prev.slice(0, -1));
      return false;
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  }, [messages, isTyping, userPersona, conversationId, systemContext, onCrisisDetected]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTyping(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    cancelRequest,
    clearMessages,
    loadMessages,
    setMessages
  };
}
