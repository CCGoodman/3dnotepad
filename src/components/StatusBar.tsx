import { motion } from 'framer-motion';
import { Clock, Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface StatusBarProps {
  wordCount: number;
  characterCount: number;
  lastSaved?: string;
}

export function StatusBar({ wordCount, characterCount, lastSaved }: StatusBarProps) {
  return (
    <motion.div 
      className="flex items-center justify-between px-4 py-2 bg-black/20 text-xs text-white/70 rounded-b-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-4">
        <span>{wordCount} words</span>
        <span>{characterCount} characters</span>
        <span>~{Math.ceil(wordCount / 200)} min read</span>
      </div>
      {lastSaved && (
        <div className="flex items-center space-x-1">
          <Save className="h-3 w-3" />
          <span>
            Last saved {formatDistanceToNow(new Date(lastSaved), { addSuffix: true })}
          </span>
        </div>
      )}
    </motion.div>
  );
}