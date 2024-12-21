import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
export function ImagePreview({ src, onClose, isFullscreen = false }) {
    if (!src)
        return null;
    return (_jsx(AnimatePresence, { children: isFullscreen && (_jsx(motion.div, { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsxs(motion.div, { className: "relative max-w-full max-h-full", initial: { scale: 0.9 }, animate: { scale: 1 }, exit: { scale: 0.9 }, children: [_jsx("button", { className: "absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75", onClick: onClose, "aria-label": "Close", children: _jsx(X, { className: "w-6 h-6" }) }), _jsx("img", { src: src, alt: "Preview", className: "rounded-lg max-w-[90vw] max-h-[90vh] object-contain" })] }) })) }));
}
