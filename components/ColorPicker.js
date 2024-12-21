import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function ColorPicker({ x, y, currentColor, onColorChange, onSelectColor, onClose, colors = [
    // Warm colors
    '#FF0000', '#FF5733', '#FFC300', '#FFD700',
    // Cool colors
    '#00FF00', '#33FF57', '#00FFC3', '#A6DAF7',
    // Deep colors
    '#0000FF', '#3357FF', '#C300FF', '#F7A6DA',
    // Additional colors
    '#FF1493', '#7CFF33', '#FFB6C1', '#00FFFF'
] }) {
    const menuAnimation = {
        initial: { opacity: 0, scale: 0.95 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };
    const handleColorSelect = (color) => {
        if (onSelectColor) {
            onSelectColor(color);
        }
        if (onColorChange) {
            onColorChange(color);
        }
        if (onClose) {
            onClose();
        }
    };
    const containerStyles = x !== undefined && y !== undefined
        ? { position: 'fixed', left: x, top: y, zIndex: 50 }
        : { position: 'relative' };
    return (_jsx(motion.div, { ...menuAnimation, className: "rounded-lg bg-transparent", style: containerStyles, children: _jsx("div", { className: "grid grid-cols-8 gap-2 p-3", children: colors.map((color) => (_jsx(motion.button, { onClick: () => handleColorSelect(color), className: "relative h-6 w-6 rounded-full transition-all hover:scale-110 active:scale-95", style: {
                    backgroundColor: color,
                    boxShadow: color === currentColor
                        ? '0 0 0 2px rgba(255,255,255,0.8), 0 0 0 4px rgba(0,0,0,0.2)'
                        : '0 2px 4px rgba(0,0,0,0.2)'
                }, whileHover: {
                    scale: 1.1,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }, whileTap: { scale: 0.95 }, children: color === currentColor && (_jsx(motion.div, { className: "absolute inset-0 rounded-full border-2 border-white/80", initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.2 } })) }, color))) }) }));
}
