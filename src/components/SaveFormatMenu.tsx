import { motion, AnimatePresence } from 'framer-motion';
import { FileText, File, FileSpreadsheet } from 'lucide-react';

interface SaveFormatMenuProps {
  onSave: () => void;
  onSavePDF: () => void;
  onSaveCSV: () => void;
}

export function SaveFormatMenu({ onSave, onSavePDF, onSaveCSV }: SaveFormatMenuProps) {
  const menuItems = [
    { icon: FileText, label: 'Text File (.txt)', onClick: onSave },
    { icon: File, label: 'PDF File (.pdf)', onClick: onSavePDF },
    { icon: FileSpreadsheet, label: 'CSV File (.csv)', onClick: onSaveCSV }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: 1, 
        height: 'auto',
        transition: {
          height: {
            type: "spring",
            stiffness: 500,
            damping: 30
          },
          opacity: {
            duration: 0.2
          }
        }
      }}
      exit={{ 
        opacity: 0, 
        height: 0,
        transition: {
          height: {
            duration: 0.2
          },
          opacity: {
            duration: 0.1
          }
        }
      }}
      className="ml-4 pl-4 border-l border-white/10 overflow-hidden"
    >
      {menuItems.map(({ icon: Icon, label, onClick }) => (
        <motion.button
          key={label}
          initial={{ x: -20, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10 w-full"
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}