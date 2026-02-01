import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  MessageSquare,
  Trash2,
  Edit2,
  ChevronRight,
  Sparkles,
  Search,
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

  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = searchQuery.trim()
    ? conversations.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : conversations;

  const filteredGrouped = filteredConversations.reduce((groups, conv) => {
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

  const displayGroups = searchQuery.trim() ? filteredGrouped : groupedConversations;

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

      {/* Sidebar — always visible on md+, slide-in on mobile */}
      <aside
        className={cn(
          // Mobile: fixed overlay
          "fixed left-0 top-0 h-full w-80 z-50 md:z-auto",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: static column, always visible
          "md:relative md:translate-x-0 md:w-80 md:flex-shrink-0",
          "bg-background/80 md:bg-transparent",
          "backdrop-blur-xl md:backdrop-blur-none",
          "border-r border-border/30",
          "flex flex-col"
        )}
      >
        {/* Search + New */}
        <div className="p-4 pb-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground/80">Chats</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onNewConversation}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/[0.06] hover:bg-foreground/[0.1] transition-colors"
                aria-label="New conversation"
              >
                <Plus className="h-4 w-4 text-foreground/60" />
              </button>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center bg-foreground/[0.06] hover:bg-foreground/[0.1] transition-colors md:hidden"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4 text-foreground/60" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground/[0.04] border border-foreground/[0.06]">
            <Search className="w-3.5 h-3.5 text-foreground/30 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/30 text-foreground/80"
              aria-label="Search conversations"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 min-w-0 overflow-hidden">
          {/* Suggested Topics (only when no search and few conversations) */}
          {!searchQuery && suggestedTopics.length > 0 && conversations.length < 5 && (
            <div className="px-4 pb-3 border-b border-foreground/[0.06]">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="h-3.5 w-3.5 text-foreground/30" />
                <span className="text-[11px] font-medium text-foreground/40 uppercase tracking-wider">
                  Suggested
                </span>
              </div>
              <div className="space-y-1">
                {suggestedTopics.slice(0, 3).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic(topic)}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-foreground/[0.04] transition-colors text-sm group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground/70">{topic.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-foreground/20 group-hover:text-foreground/40 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation List */}
          <div className="px-3 py-2 overflow-hidden">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-14 w-full rounded-lg" />
                ))}
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-foreground/40">
                <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">{searchQuery ? 'No matches' : 'No conversations yet'}</p>
                {!searchQuery && (
                  <p className="text-xs mt-1 text-foreground/30">Start a new conversation with Sophia</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(displayGroups).map(([group, convs]) => (
                  <div key={group}>
                    <h3 className="text-[11px] font-medium text-foreground/35 mb-1 uppercase tracking-wider px-2">
                      {group}
                    </h3>
                    <div className="space-y-0.5">
                      {convs.map(conv => (
                        <div
                          key={conv.id}
                          className={cn(
                            "group relative rounded-lg transition-colors overflow-hidden",
                            currentConversation?.id === conv.id
                              ? "bg-foreground/[0.07]"
                              : "hover:bg-foreground/[0.03]"
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
                              className="block w-full text-left px-2.5 py-2.5 min-w-0 overflow-hidden"
                            >
                              <p className="text-sm font-medium text-foreground/80 overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(320px-3.5rem)] group-hover:max-w-[calc(320px-7rem)] transition-all">
                                {conv.title}
                              </p>
                              <p className="text-[11px] text-foreground/35 mt-0.5">
                                {conv.messageCount} messages
                              </p>
                            </button>
                          )}

                          {/* Action buttons */}
                          {editingId !== conv.id && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-foreground/40 hover:text-foreground/70"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEdit(conv);
                                }}
                                aria-label="Rename conversation"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive/60 hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteId(conv.id);
                                }}
                                aria-label="Delete conversation"
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
      </aside>

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