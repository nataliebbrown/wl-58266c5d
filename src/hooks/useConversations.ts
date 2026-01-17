import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Conversation } from '@/types/chat';
import { toast } from 'sonner';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
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
      toast.error('Failed to load conversations');
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to start a conversation');
        return null;
      }

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
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
      const { error } = await supabase
        .from('conversations')
        .update({ title })
        .eq('id', id);

      if (error) throw error;

      setConversations(prev => 
        prev.map(conv => 
          conv.id === id ? { ...conv, title } : conv
        )
      );

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
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setConversations(prev => prev.filter(conv => conv.id !== id));
      
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