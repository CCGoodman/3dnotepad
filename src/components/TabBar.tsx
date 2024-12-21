import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Tab } from '@/types/tab';
import { EditableTabTitle } from './EditableTabTitle';
import { cn } from '@/lib/utils';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  onNewTab: () => void;
  onCloseTab: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
}

export function TabBar({
  tabs,
  activeTabId,
  onTabChange,
  onNewTab,
  onCloseTab,
  onTitleChange
}: TabBarProps) {
  return (
    <div className="flex items-center space-x-1 bg-black/20 p-1 rounded-t-lg overflow-hidden">
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          className={cn(
            "group relative flex items-center space-x-2 rounded-t-md px-3 py-1.5",
            "cursor-pointer text-sm transition-colors",
            activeTabId === tab.id
              ? "bg-white/20 shadow-lg" // Active tab with subtle shadow
              : "hover:bg-white/10 transition-all" // Hover effect for inactive tabs
          )}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <EditableTabTitle
            title={tab.title}
            isActive={activeTabId === tab.id}
            onChange={(newTitle) => onTitleChange(tab.id, newTitle)}
          />
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          )}
        </motion.div>
      ))}
      {tabs.length < 8 && (
        <motion.button
          onClick={onNewTab}
          className="rounded-md p-1.5 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
}
