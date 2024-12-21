import { useState } from 'react';
export function useDrag({ initialPosition }) {
    const [position, setPosition] = useState(initialPosition);
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
