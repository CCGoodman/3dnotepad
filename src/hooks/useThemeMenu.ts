import { useState } from 'react';
import { Position } from '@/types/position';

export function useThemeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const open = (x: number, y: number) => {
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