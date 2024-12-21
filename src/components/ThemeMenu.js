import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Palette, Check, GripHorizontal } from 'lucide-react';
import { useDrag } from '@/hooks/useDrag';
export function ThemeMenu({ x, y, themes, currentTheme, onSelectTheme, onClose }) {
    const { position, handleDragStart } = useDrag({ initialPosition: { x, y } });
    const menuAnimation = {
        initial: { opacity: 0, scale: 0.95 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };
    return (_jsxs(motion.div, { ...menuAnimation, className: "fixed z-50 w-48 rounded-lg bg-black/30 p-3 backdrop-blur-lg cursor-move", style: { left: position.x, top: position.y }, drag: true, dragMomentum: false, onDragStart: handleDragStart, dragConstraints: { left: 0, right: window.innerWidth - 192, top: 0, bottom: window.innerHeight - 400 }, children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Palette, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs font-medium", children: "Theme" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(GripHorizontal, { className: "h-3.5 w-3.5 text-white/50" }), _jsxs(motion.button, { onClick: onClose, className: "flex items-center space-x-1 rounded-md bg-white/10 px-2 py-0.5 text-xs", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Check, { className: "h-3 w-3" }), _jsx("span", { children: "Apply" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 gap-1", children: themes.map((theme) => (_jsxs(motion.button, { onClick: () => onSelectTheme(theme.id), className: `flex items-center space-x-2 rounded-md px-2 py-1.5 text-xs transition-colors ${theme.menuHoverBackground} ${currentTheme.id === theme.id ? 'bg-white/20' : ''}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("div", { className: `h-2.5 w-2.5 rounded-full ${theme.accentColor}` }), _jsx("span", { children: theme.name })] }, theme.id))) })] }));
}
