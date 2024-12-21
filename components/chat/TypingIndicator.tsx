import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10">
      <motion.span
        className="w-2 h-2 bg-white/50 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
      />
      <motion.span
        className="w-2 h-2 bg-white/50 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3 }}
      />
      <motion.span
        className="w-2 h-2 bg-white/50 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
      />
    </div>
  );
}