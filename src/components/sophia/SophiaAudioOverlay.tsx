import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SophiaAudioOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SophiaAudioOverlay({ isOpen, onClose }: SophiaAudioOverlayProps) {
  const [isMicActive, setIsMicActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Placeholder for future audio functionality
  const handleMicToggle = () => {
    setIsMicActive(!isMicActive);
    // Future: Start/stop voice recording
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Future: Mute/unmute Sophia's voice
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
          />

          {/* Overlay Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {/* Mini Sophia Avatar */}
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center"
                      animate={isSpeaking ? {
                        boxShadow: [
                          '0 0 10px hsl(var(--primary) / 0.4)',
                          '0 0 20px hsl(var(--primary) / 0.6)',
                          '0 0 10px hsl(var(--primary) / 0.4)',
                        ],
                      } : {}}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      {/* Eyes */}
                      <div className="flex gap-2" style={{ marginBottom: '4px' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-cream" />
                        <div className="w-1.5 h-1.5 rounded-full bg-cream" />
                      </div>
                    </motion.div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full border-2 border-card" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Sophia</h3>
                    <p className="text-xs text-muted-foreground">Your spiritual companion</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-card-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 flex flex-col items-center">
                {/* Large Sophia Avatar with Audio Visualization */}
                <div className="relative mb-6">
                  {/* Audio wave rings */}
                  {isSpeaking && (
                    <>
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute inset-0 rounded-full border-2 border-primary/30"
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1 + ring * 0.3, opacity: 0 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: ring * 0.3,
                          }}
                        />
                      ))}
                    </>
                  )}

                  {/* Main Avatar */}
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center relative overflow-hidden shadow-xl"
                    animate={isSpeaking ? {
                      boxShadow: [
                        '0 0 20px hsl(var(--primary) / 0.4)',
                        '0 0 40px hsl(var(--primary) / 0.6)',
                        '0 0 20px hsl(var(--primary) / 0.4)',
                      ],
                    } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {/* Face */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Eyes */}
                      <div className="absolute flex gap-5" style={{ top: '35%' }}>
                        <motion.div
                          className="w-3 h-3 rounded-full bg-cream"
                          animate={{ scaleY: [1, 0.2, 1] }}
                          transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                        <motion.div
                          className="w-3 h-3 rounded-full bg-cream"
                          animate={{ scaleY: [1, 0.2, 1] }}
                          transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            repeatDelay: 3,
                            delay: 0.05,
                          }}
                        />
                      </div>

                      {/* Mouth */}
                      <motion.div
                        className="absolute bg-cream/90 rounded-full"
                        style={{ bottom: '28%' }}
                        animate={isSpeaking ? {
                          width: ['16px', '22px', '14px', '20px', '16px'],
                          height: ['8px', '14px', '6px', '12px', '8px'],
                        } : {
                          width: '18px',
                          height: '8px',
                        }}
                        transition={isSpeaking ? {
                          duration: 0.3,
                          repeat: Infinity,
                        } : {}}
                      />

                      {/* Cheeks */}
                      <div className="absolute flex gap-12" style={{ top: '45%' }}>
                        <div className="w-3 h-2 rounded-full bg-cream/30" />
                        <div className="w-3 h-2 rounded-full bg-cream/30" />
                      </div>
                    </div>

                    {/* Sparkles */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-cream rounded-full"
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cream rounded-full"
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    />
                  </motion.div>
                </div>

                {/* Status Text */}
                <p className="text-muted-foreground text-center mb-6 font-spiritual text-lg">
                  {isMicActive 
                    ? "I'm listening..." 
                    : isSpeaking 
                      ? "Speaking..." 
                      : "Tap the microphone to talk with me"
                  }
                </p>

                {/* Audio Controls */}
                <div className="flex items-center gap-4">
                  {/* Mute Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleMuteToggle}
                    className={`w-12 h-12 rounded-full ${isMuted ? 'text-destructive border-destructive' : ''}`}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>

                  {/* Main Mic Button */}
                  <motion.button
                    onClick={handleMicToggle}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isMicActive 
                        ? 'bg-destructive text-destructive-foreground' 
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {isMicActive ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                  </motion.button>

                  {/* Placeholder for balance */}
                  <div className="w-12 h-12" />
                </div>

                {/* Coming Soon Notice */}
                <p className="text-xs text-muted-foreground mt-6 text-center">
                  Voice conversations coming soon. For now, chat with Sophia in text.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
