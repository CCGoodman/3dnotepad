import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { EditableTabTitle } from './EditableTabTitle';
import { cn } from '@/lib/utils';
export function TabBar({ tabs, activeTabId, onTabChange, onNewTab, onCloseTab, onTitleChange }) {
    return (_jsxs("div", { className: "flex items-center space-x-1 bg-black/20 p-1 rounded-t-lg overflow-hidden", children: [tabs.map((tab) => (_jsxs(motion.div, { className: cn("group relative flex items-center space-x-2 rounded-t-md px-3 py-1.5", "cursor-pointer text-sm transition-colors", activeTabId === tab.id
                    ? "bg-white/20 shadow-lg" // Active tab with subtle shadow
                    : "hover:bg-white/10 transition-all" // Hover effect for inactive tabs
                ), onClick: () => onTabChange(tab.id), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(EditableTabTitle, { title: tab.title, isActive: activeTabId === tab.id, onChange: (newTitle) => onTitleChange(tab.id, newTitle) }), tabs.length > 1 && (_jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            onCloseTab(tab.id);
                        }, className: "opacity-0 group-hover:opacity-100 transition-opacity", children: "\u00D7" }))] }, tab.id))), tabs.length < 8 && (_jsx(motion.button, { onClick: onNewTab, className: "rounded-md p-1.5 hover:bg-white/10 transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Plus, { className: "h-4 w-4" }) }))] }));
}
