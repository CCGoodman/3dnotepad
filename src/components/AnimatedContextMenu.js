import { jsx as _jsx } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { ContextMenu } from './ContextMenu';
export function AnimatedContextMenu({ show, x, y, ...props }) {
    return (_jsx(AnimatePresence, { children: show && (_jsx(motion.div, { initial: {
                opacity: 0,
                scale: 0.9,
                y: y - 10
            }, animate: {
                opacity: 1,
                scale: 1,
                y: y,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            }, exit: {
                opacity: 0,
                scale: 0.9,
                transition: {
                    duration: 0.15
                }
            }, style: {
                position: 'fixed',
                left: x,
                pointerEvents: show ? 'auto' : 'none'
            }, children: _jsx(motion.div, { initial: { rotate: -5, scale: 0.95 }, animate: {
                    rotate: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                    }
                }, children: _jsx(ContextMenu, { x: x, y: y, ...props }) }) })) }));
}
