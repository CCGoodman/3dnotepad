import { useEffect } from 'react';
export function useClickOutside(ref, handler, excludeRefs = []) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // Check if click was inside any of the excluded elements
            const clickedInsideExcluded = excludeRefs.some(excludeRef => excludeRef.current && excludeRef.current.contains(event.target));
            if (!clickedInsideExcluded) {
                handler();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler, excludeRefs]);
}
