import { useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseDragProps {
  initialPosition: Position;
}

export function useDrag({ initialPosition }: UseDragProps) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return {
    position,
    setPosition,
    isDragging,
    handleDragStart,
    handleDragEnd,
  };
}