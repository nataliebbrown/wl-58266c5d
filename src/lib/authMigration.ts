import { supabase } from '@/integrations/supabase/client';

const MIGRATED_KEY = 'wl_data_migrated';

/**
 * Migrates localStorage data (conversations, messages) to Supabase
 * after a user signs up or signs in for the first time.
 * Runs once, then sets a flag to prevent re-running.
 */
export async function migrateLocalDataToSupabase(userId: string): Promise<void> {
  // Skip if already migrated
  if (localStorage.getItem(MIGRATED_KEY) === 'true') return;

  try {
    // Migrate conversations
    const rawConvs = localStorage.getItem('wl_conversations');
    if (rawConvs) {
      const conversations = JSON.parse(rawConvs) as Array<{
        id: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        topic?: string;
        personaCode?: string;
        messageCount: number;
      }>;

      for (const conv of conversations) {
        // Insert conversation
        await supabase.from('conversations').upsert({
          id: conv.id,
          user_id: userId,
          title: conv.title,
          topic: conv.topic ?? null,
          persona_code: conv.personaCode ?? null,
          message_count: conv.messageCount,
          created_at: conv.createdAt,
          updated_at: conv.updatedAt,
        });

        // Migrate messages for this conversation
        const rawMsgs = localStorage.getItem(`wl_messages_${conv.id}`);
        if (rawMsgs) {
          const messages = JSON.parse(rawMsgs) as Array<{
            id: string;
            role: string;
            content: string;
            createdAt: string;
          }>;

          // Insert in batches to avoid payload limits
          for (const msg of messages) {
            await supabase.from('messages').upsert({
              id: msg.id,
              conversation_id: conv.id,
              user_id: userId,
              role: msg.role,
              content: msg.content,
              created_at: msg.createdAt,
            });
          }
        }
      }
    }

    // Mark migration as complete
    localStorage.setItem(MIGRATED_KEY, 'true');
  } catch (err) {
    console.error('Data migration failed:', err);
    // Don't block the user — they can still use the app.
    // Migration can be retried on next sign-in since the flag isn't set.
  }
}
