import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export function StatusBar({ wordCount, characterCount, lastSaved }) {
    return (_jsxs(motion.div, { className: "flex items-center justify-between px-4 py-2 bg-black/20 text-xs text-white/70 rounded-b-lg", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { children: [wordCount, " words"] }), _jsxs("span", { children: [characterCount, " characters"] }), _jsxs("span", { children: ["~", Math.ceil(wordCount / 200), " min read"] })] }), lastSaved && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Save, { className: "h-3 w-3" }), _jsxs("span", { children: ["Last saved ", formatDistanceToNow(new Date(lastSaved), { addSuffix: true })] })] }))] }));
}
