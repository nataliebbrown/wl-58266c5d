import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Edit2, 
  ChevronRight,
  Sparkles,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Conversation, SuggestedTopic } from '@/types/chat';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  suggestedTopics: SuggestedTopic[];
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onNewConversation: () => void;
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, title: string) => void;
  onSelectTopic: (topic: SuggestedTopic) => void;
}

export function ChatSidebar({
  conversations,
  currentConversation,
  suggestedTopics,
  isLoading,
  isOpen,
  onClose,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onSelectTopic
}: ChatSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleStartEdit = (conv: Conversation) => {
    setEditingId(conv.id);
    setEditValue(conv.title);
  };

  const handleSaveEdit = () => {
    if (editingId && editValue.trim()) {
      onRenameConversation(editingId, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteConversation(deleteId);
      setDeleteId(null);
    }
  };

  // Group conversations by date
  const groupedConversations = conversations.reduce((groups, conv) => {
    const today = new Date();
    const convDate = conv.updatedAt;
    
    let group = 'Older';
    if (convDate.toDateString() === today.toDateString()) {
      group = 'Today';
    } else if (convDate.toDateString() === new Date(today.setDate(today.getDate() - 1)).toDateString()) {
      group = 'Yesterday';
    } else if (convDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      group = 'This Week';
    }

    if (!groups[group]) groups[group] = [];
    groups[group].push(conv);
    return groups;
  }, {} as Record<string, Conversation[]>);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          "fixed left-0 top-0 h-full w-80 z-50",
          "md:relative md:translate-x-0",
          "bg-background border-r border-border",
          "flex flex-col",
          !isOpen && "md:flex hidden"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Conversations</h2>
          <div className="flex items-center gap-2">
            <Button
              onClick={onNewConversation}
              size="sm"
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          {/* Suggested Topics */}
          {suggestedTopics.length > 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-ochre" />
                <span className="text-sm font-medium text-muted-foreground">
                  Suggested Topics
                </span>
              </div>
              <div className="space-y-2">
                {suggestedTopics.slice(0, 3).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic(topic)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg",
                      "bg-muted/50 hover:bg-muted transition-colors",
                      "text-sm group"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{topic.title}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation List */}
          <div className="p-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No conversations yet</p>
                <p className="text-xs mt-1">Start a new conversation with Sophia</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedConversations).map(([group, convs]) => (
                  <div key={group}>
                    <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      {group}
                    </h3>
                    <div className="space-y-1">
                      {convs.map(conv => (
                        <div
                          key={conv.id}
                          className={cn(
                            "group relative rounded-lg transition-colors",
                            currentConversation?.id === conv.id
                              ? "bg-primary/10"
                              : "hover:bg-muted"
                          )}
                        >
                          {editingId === conv.id ? (
                            <div className="p-2">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onBlur={handleSaveEdit}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveEdit();
                                  if (e.key === 'Escape') setEditingId(null);
                                }}
                                autoFocus
                                className="h-8 text-sm"
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => onSelectConversation(conv)}
                              className="w-full text-left p-3 pr-16"
                            >
                              <p className="text-sm font-medium truncate">
                                {conv.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {conv.messageCount} messages
                              </p>
                            </button>
                          )}

                          {/* Action buttons */}
                          {editingId !== conv.id && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEdit(conv);
                                }}
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteId(conv.id);
                                }}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </motion.aside>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this conversation and all its messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}