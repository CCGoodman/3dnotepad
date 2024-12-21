import { motion } from 'framer-motion';
import { Copy, Trash2, Clipboard, Scissors, Save, Palette, FileText, FileSpreadsheet, File } from 'lucide-react';
import { SpellingSuggestions } from './SpellingSuggestions';
import { useState } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onSave: () => void;
  onSavePDF: () => void;
  onSaveCSV: () => void;
  onTheme: () => void;
  selectedText?: string;
  onReplace?: (newWord: string) => void;
}

export function ContextMenu({ 
  x, 
  y, 
  onCopy, 
  onCut, 
  onPaste, 
  onDelete, 
  onSave,
  onSavePDF,
  onSaveCSV,
  onTheme,
  selectedText,
  onReplace
}: ContextMenuProps) {
  const [showSaveFormats, setShowSaveFormats] = useState(false);

  const menuItems = [
    { icon: Scissors, label: 'Cut', onClick: onCut },
    { icon: Copy, label: 'Copy', onClick: onCopy },
    { icon: Clipboard, label: 'Paste', onClick: onPaste },
    { icon: Trash2, label: 'Delete', onClick: onDelete, className: 'text-red-400' },
    { 
      icon: Save, 
      label: 'Save As', 
      onClick: () => setShowSaveFormats(!showSaveFormats), 
      className: 'text-green-400',
      submenu: showSaveFormats && [
        { icon: FileText, label: 'Text File (.txt)', onClick: onSave },
        { icon: File, label: 'PDF File (.pdf)', onClick: onSavePDF },
        { icon: FileSpreadsheet, label: 'CSV File (.csv)', onClick: onSaveCSV }
      ]
    },
    { icon: Palette, label: 'Theme', onClick: onTheme }
  ];

  const menuAnimation = {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      {...menuAnimation}
      className="fixed z-50 rounded-lg bg-black/30 p-2 backdrop-blur-lg"
      style={{ left: x, top: y }}
    >
      <div className="flex flex-col space-y-1">
        {selectedText && (
          <div className="px-4 py-2 text-xs text-white/70 border-b border-white/10">
            {selectedText.length} characters
          </div>
        )}

        {selectedText && onReplace && (
          <SpellingSuggestions
            selectedText={selectedText}
            onReplace={onReplace}
          />
        )}

        {menuItems.map(({ icon: Icon, label, onClick, className, submenu }) => (
          <div key={label}>
            <button
              onClick={onClick}
              className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10 w-full ${className || ''}`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
            {submenu && (
              <div className="ml-4 pl-4 border-l border-white/10">
                {submenu.map(({ icon: SubIcon, label: subLabel, onClick: subOnClick }) => (
                  <button
                    key={subLabel}
                    onClick={(e) => {
                      e.stopPropagation();
                      subOnClick();
                    }}
                    className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10 w-full"
                  >
                    <SubIcon className="h-4 w-4" />
                    <span>{subLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}