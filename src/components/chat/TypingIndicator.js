import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function TypingIndicator() {
    return (_jsxs("div", { className: "flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10", children: [_jsx(motion.span, { className: "w-2 h-2 bg-white/50 rounded-full", animate: { scale: [1, 1.2, 1] }, transition: { duration: 1, repeat: Infinity, repeatDelay: 0.2 } }), _jsx(motion.span, { className: "w-2 h-2 bg-white/50 rounded-full", animate: { scale: [1, 1.2, 1] }, transition: { duration: 1, repeat: Infinity, repeatDelay: 0.3 } }), _jsx(motion.span, { className: "w-2 h-2 bg-white/50 rounded-full", animate: { scale: [1, 1.2, 1] }, transition: { duration: 1, repeat: Infinity, repeatDelay: 0.4 } })] }));
}
