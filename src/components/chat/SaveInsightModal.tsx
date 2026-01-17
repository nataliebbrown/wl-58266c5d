import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Message } from '@/types/chat';
import { Insight } from '@/types/dashboard';

interface SaveInsightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: Message | null;
  onSave: (insight: Omit<Insight, 'id'>) => void;
}

const CATEGORIES: { value: Insight['category']; label: string; description: string }[] = [
  { value: 'pattern', label: 'Pattern Discovery', description: 'Connections between passages' },
  { value: 'cultural', label: 'Cultural Context', description: 'Historical & cultural insights' },
  { value: 'personal', label: 'Personal Growth', description: 'Application to your life' },
  { value: 'theological', label: 'Theological Insight', description: 'Doctrinal understanding' }
];

export function SaveInsightModal({ open, onOpenChange, message, onSave }: SaveInsightModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Insight['category']>('personal');

  const handleSave = () => {
    if (!message || !title.trim()) return;

    onSave({
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      title: title.trim(),
      preview: message.content.slice(0, 150) + (message.content.length > 150 ? '...' : ''),
      category,
      fullContent: message.content
    });

    // Reset form
    setTitle('');
    setCategory('personal');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bookmark className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle>Save Insight</DialogTitle>
          </div>
          <DialogDescription>
            Capture this moment of discovery to revisit later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title input */}
          <div className="space-y-2">
            <Label htmlFor="insight-title">Title</Label>
            <Input
              id="insight-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this insight a memorable title..."
              className="focus-visible:ring-primary/50"
            />
          </div>

          {/* Category selection */}
          <div className="space-y-3">
            <Label>Category</Label>
            <RadioGroup value={category} onValueChange={(v) => setCategory(v as Insight['category'])}>
              <div className="grid gap-2">
                {CATEGORIES.map(cat => (
                  <label
                    key={cat.value}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem value={cat.value} />
                    <div>
                      <p className="font-medium text-sm">{cat.label}</p>
                      <p className="text-xs text-muted-foreground">{cat.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Preview */}
          {message && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Preview
              </p>
              <p className="text-sm font-spiritual line-clamp-3">
                {message.content}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            Save Insight
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}