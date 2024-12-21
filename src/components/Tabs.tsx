import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  title: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onNewTab: () => void;
  onCloseTab: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange, onNewTab, onCloseTab }: TabsProps) {
  return (
    <div className="flex items-center space-x-1 bg-black/20 p-1 rounded-t-lg overflow-hidden">
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          className={cn(
            "group relative flex items-center space-x-1 rounded-t-md px-3 py-1.5",
            "cursor-pointer text-sm transition-colors",
            activeTab === tab.id ? "bg-white/20" : "hover:bg-white/10"
          )}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{tab.title || 'Untitled'}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCloseTab(tab.id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      ))}
      <motion.button
        onClick={onNewTab}
        className="rounded-md p-1.5 hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
