import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen gradient-radial-warm flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Animated orbs */}
        <div className="relative w-32 h-32 mb-10 mx-auto">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-8 rounded-full bg-primary/40"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.2,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-12 rounded-full bg-primary"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.4,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-spiritual font-semibold text-foreground mb-4"
        >
          Creating your personalized journey...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground font-spiritual"
        >
          Preparing a spiritual formation path just for you
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 w-64 mx-auto"
        >
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
