import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
export function Tabs({ tabs, activeTab, onTabChange, onNewTab, onCloseTab }) {
    return (_jsxs("div", { className: "flex items-center space-x-1 bg-black/20 p-1 rounded-t-lg overflow-hidden", children: [tabs.map((tab) => (_jsxs(motion.div, { className: cn("group relative flex items-center space-x-1 rounded-t-md px-3 py-1.5", "cursor-pointer text-sm transition-colors", activeTab === tab.id ? "bg-white/20" : "hover:bg-white/10"), onClick: () => onTabChange(tab.id), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("span", { children: tab.title || 'Untitled' }), _jsx("button", { onClick: (e) => {
                            e.stopPropagation();
                            onCloseTab(tab.id);
                        }, className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-3 w-3" }) })] }, tab.id))), _jsx(motion.button, { onClick: onNewTab, className: "rounded-md p-1.5 hover:bg-white/10 transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Plus, { className: "h-4 w-4" }) })] }));
}
