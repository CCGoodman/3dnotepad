import { motion, AnimatePresence } from 'framer-motion';
import { ContextMenu } from './ContextMenu';

interface AnimatedContextMenuProps {
  show: boolean;
  x: number;
  y: number;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onSave: () => void;
  onTheme: () => void;
  selectedText?: string;
  onReplace?: (newWord: string) => void;
}

export function AnimatedContextMenu({
  show,
  x,
  y,
  ...props
}: AnimatedContextMenuProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ 
            opacity: 0,
            scale: 0.9,
            y: y - 10
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: y,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20
            }
          }}
          exit={{ 
            opacity: 0,
            scale: 0.9,
            transition: {
              duration: 0.15
            }
          }}
          style={{ 
            position: 'fixed',
            left: x,
            pointerEvents: show ? 'auto' : 'none'
          }}
        >
          <motion.div
            initial={{ rotate: -5, scale: 0.95 }}
            animate={{ 
              rotate: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
          >
            <ContextMenu
              x={x}
              y={y}
              {...props}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}