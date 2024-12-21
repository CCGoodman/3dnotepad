import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import { Palette, Check, GripHorizontal } from 'lucide-react';
import { useDrag } from '@/hooks/useDrag';

interface ThemeMenuProps {
  x: number;
  y: number;
  themes: Theme[];
  currentTheme: Theme;
  onSelectTheme: (themeId: string) => void;
  onClose: () => void;
}

export function ThemeMenu({ x, y, themes, currentTheme, onSelectTheme, onClose }: ThemeMenuProps) {
  const { position, handleDragStart } = useDrag({ initialPosition: { x, y } });

  const menuAnimation = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      {...menuAnimation}
      className="fixed z-50 w-48 rounded-lg bg-black/30 p-3 backdrop-blur-lg cursor-move"
      style={{ left: position.x, top: position.y }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      dragConstraints={{ left: 0, right: window.innerWidth - 192, top: 0, bottom: window.innerHeight - 400 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Palette className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Theme</span>
        </div>
        <div className="flex items-center space-x-2">
          <GripHorizontal className="h-3.5 w-3.5 text-white/50" />
          <motion.button
            onClick={onClose}
            className="flex items-center space-x-1 rounded-md bg-white/10 px-2 py-0.5 text-xs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check className="h-3 w-3" />
            <span>Apply</span>
          </motion.button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => onSelectTheme(theme.id)}
            className={`flex items-center space-x-2 rounded-md px-2 py-1.5 text-xs transition-colors ${
              theme.menuHoverBackground
            } ${currentTheme.id === theme.id ? 'bg-white/20' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`h-2.5 w-2.5 rounded-full ${theme.accentColor}`} />
            <span>{theme.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}