import { useEffect, useRef } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '@/lib/storage';
export function useAutoSave(content, noteId) {
    const saveTimeoutRef = useRef();
    useEffect(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = window.setTimeout(() => {
            saveToLocalStorage(`note_${noteId}`, {
                content,
                timestamp: new Date().toISOString(),
            });
        }, 1000);
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [content, noteId]);
    return {
        savedContent: getFromLocalStorage(`note_${noteId}`)?.content || '',
        lastSaved: getFromLocalStorage(`note_${noteId}`)?.timestamp,
    };
}
