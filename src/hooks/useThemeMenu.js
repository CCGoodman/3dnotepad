import { useState } from 'react';
export function useThemeMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const open = (x, y) => {
        setPosition({ x, y });
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };
    return {
        isOpen,
        position,
        open,
        close
    };
}
