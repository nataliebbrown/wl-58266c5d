import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Message, UserPersona } from '@/types/chat';
import { detectCrisis } from '@/lib/crisisDetection';
import { toast } from 'sonner';

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-sophia`;

interface UseSophiaChatOptions {
  userPersona?: UserPersona | null;
  conversationId?: string | null;
  onCrisisDetected?: (level: 'low' | 'medium' | 'high') => void;
}

export function useSophiaChat({ 
  userPersona, 
  conversationId,
  onCrisisDetected 
}: UseSophiaChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadMessages = useCallback(async (convId: string) => {
    try {
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
      toast.error('Failed to load conversation history');
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
      const apiMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

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

      // Save messages to database if we have a conversation
      if (conversationId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Save user message
          await supabase.from('messages').insert({
            id: userMessage.id,
            conversation_id: conversationId,
            user_id: user.id,
            role: 'user',
            content: userMessage.content
          });

          // Save assistant message
          await supabase.from('messages').insert({
            id: assistantMessage.id,
            conversation_id: conversationId,
            user_id: user.id,
            role: 'assistant',
            content: assistantContent
          });

          // Update conversation message count
          await supabase
            .from('conversations')
            .update({ 
              message_count: messages.length + 2,
              updated_at: new Date().toISOString()
            })
            .eq('id', conversationId);
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
  }, [messages, isTyping, userPersona, conversationId, onCrisisDetected]);

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