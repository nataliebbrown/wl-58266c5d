import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Conversation } from '@/types/chat';
import { toast } from 'sonner';

// ============ Auth Helper ============

async function getAuthUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

// ============ localStorage Helpers ============

const CONV_STORAGE_KEY = 'wl_conversations';

function loadLocalConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(CONV_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((c: Record<string, unknown>) => ({
      ...c,
      createdAt: new Date(c.createdAt as string),
      updatedAt: new Date(c.updatedAt as string),
    }));
  } catch {
    return [];
  }
}

function saveLocalConversations(convs: Conversation[]) {
  localStorage.setItem(CONV_STORAGE_KEY, JSON.stringify(convs));
}

// ============ Hook ============

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const userId = await getAuthUserId();

      if (!userId) {
        // Fallback: load from localStorage
        const local = loadLocalConversations();
        setConversations(local);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const mapped: Conversation[] = (data || []).map(conv => ({
        id: conv.id,
        title: conv.title,
        createdAt: new Date(conv.created_at),
        updatedAt: new Date(conv.updated_at),
        topic: conv.topic || undefined,
        personaCode: conv.persona_code || undefined,
        messageCount: conv.message_count
      }));

      setConversations(mapped);
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
      // Fall back to localStorage on error
      const local = loadLocalConversations();
      setConversations(local);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createConversation = useCallback(async (
    title: string = 'New Conversation',
    topic?: string,
    personaCode?: string
  ): Promise<Conversation | null> => {
    try {
      const userId = await getAuthUserId();

      if (!userId) {
        // Fallback: create locally
        const newConversation: Conversation = {
          id: crypto.randomUUID(),
          title,
          createdAt: new Date(),
          updatedAt: new Date(),
          topic,
          personaCode,
          messageCount: 0,
        };
        setConversations(prev => {
          const updated = [newConversation, ...prev];
          saveLocalConversations(updated);
          return updated;
        });
        setCurrentConversation(newConversation);
        return newConversation;
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: userId,
          title,
          topic,
          persona_code: personaCode
        })
        .select()
        .single();

      if (error) throw error;

      const newConversation: Conversation = {
        id: data.id,
        title: data.title,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        topic: data.topic || undefined,
        personaCode: data.persona_code || undefined,
        messageCount: data.message_count
      };

      setConversations(prev => [newConversation, ...prev]);
      setCurrentConversation(newConversation);

      return newConversation;
    } catch (err) {
      console.error('Failed to create conversation:', err);
      toast.error('Failed to start new conversation');
      return null;
    }
  }, []);

  const updateConversationTitle = useCallback(async (id: string, title: string) => {
    try {
      const userId = await getAuthUserId();

      if (userId) {
        const { error } = await supabase
          .from('conversations')
          .update({ title })
          .eq('id', id);
        if (error) throw error;
      }

      setConversations(prev => {
        const updated = prev.map(conv =>
          conv.id === id ? { ...conv, title } : conv
        );
        if (!userId) saveLocalConversations(updated);
        return updated;
      });

      if (currentConversation?.id === id) {
        setCurrentConversation(prev => prev ? { ...prev, title } : null);
      }
    } catch (err) {
      console.error('Failed to update conversation:', err);
      toast.error('Failed to rename conversation');
    }
  }, [currentConversation]);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      const userId = await getAuthUserId();

      if (userId) {
        const { error } = await supabase
          .from('conversations')
          .delete()
          .eq('id', id);
        if (error) throw error;
      }

      setConversations(prev => {
        const updated = prev.filter(conv => conv.id !== id);
        if (!userId) {
          saveLocalConversations(updated);
          // Also remove messages for this conversation
          localStorage.removeItem(`wl_messages_${id}`);
        }
        return updated;
      });

      if (currentConversation?.id === id) {
        setCurrentConversation(null);
      }

      toast.success('Conversation deleted');
    } catch (err) {
      console.error('Failed to delete conversation:', err);
      toast.error('Failed to delete conversation');
    }
  }, [currentConversation]);

  const selectConversation = useCallback((conversation: Conversation | null) => {
    setCurrentConversation(conversation);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return {
    conversations,
    currentConversation,
    isLoading,
    createConversation,
    updateConversationTitle,
    deleteConversation,
    selectConversation,
    refreshConversations: fetchConversations
  };
}
