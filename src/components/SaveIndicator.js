import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export function SaveIndicator({ lastSaved }) {
    return (_jsx(AnimatePresence, { mode: "wait", children: lastSaved && (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: {
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1]
            }, className: "flex items-center gap-2 text-xs text-white/50 absolute bottom-2 left-2", children: [_jsx(Save, { className: "h-3 w-3" }), _jsxs("span", { children: ["Last saved ", formatDistanceToNow(new Date(lastSaved), { addSuffix: true })] })] })) }));
}
