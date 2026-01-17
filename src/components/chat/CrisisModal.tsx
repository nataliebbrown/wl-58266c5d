import { Heart, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CrisisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: 'low' | 'medium' | 'high';
}

export function CrisisModal({ open, onOpenChange, level }: CrisisModalProps) {
  const isHighLevel = level === 'high';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">
              {isHighLevel ? "I'm concerned about you" : "You're not alone"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed font-spiritual">
            {isHighLevel ? (
              <>
                I can see you're going through something very difficult right now. 
                While I'm here to listen, I want to make sure you get the support you need 
                from someone who can truly help.
              </>
            ) : (
              <>
                It sounds like you're carrying something heavy right now. 
                I'm here to walk alongside you, and I also want to share some resources 
                that might be helpful.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Crisis resources */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Immediate Support
            </h4>
            
            <a
              href="tel:988"
              className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">
                  988 Suicide & Crisis Lifeline
                </p>
                <p className="text-sm text-muted-foreground">
                  Available 24/7 • Call or text 988
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>

            <a
              href="sms:741741?body=HOME"
              className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold group-hover:text-secondary transition-colors">
                  Crisis Text Line
                </p>
                <p className="text-sm text-muted-foreground">
                  Text HOME to 741741
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          </div>

          {/* Encouragement */}
          <div className="bg-muted/50 rounded-lg p-4 font-spiritual">
            <p className="text-sm text-muted-foreground italic">
              "The Lord is close to the brokenhearted and saves those who are crushed in spirit."
            </p>
            <p className="text-xs text-muted-foreground mt-1">— Psalm 34:18</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue Conversation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}