import { useState, useCallback, useEffect } from 'react';

export function useZoom(initialSize: number = 16) {
  const [fontSize, setFontSize] = useState(initialSize);
  
  const handleZoom = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setFontSize(prev => {
        const newSize = prev + (e.deltaY > 0 ? -1 : 1);
        return Math.min(Math.max(newSize, 8), 72); // Limit between 8px and 72px
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('wheel', handleZoom, { passive: false });
    return () => document.removeEventListener('wheel', handleZoom);
  }, [handleZoom]);

  return fontSize;
}