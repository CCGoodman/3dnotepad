import { motion, AnimatePresence } from 'framer-motion';
import { Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SaveIndicatorProps {
  lastSaved: string | null;
}

export function SaveIndicator({ lastSaved }: SaveIndicatorProps) {
  return (
    <AnimatePresence mode="wait">
      {lastSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="flex items-center gap-2 text-xs text-white/50 absolute bottom-2 left-2"
        >
          <Save className="h-3 w-3" />
          <span>
            Last saved {formatDistanceToNow(new Date(lastSaved), { addSuffix: true })}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}