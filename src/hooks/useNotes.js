import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
export function useNotes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const createNote = useCallback((note) => {
        const newNote = {
            id: uuidv4(),
            ...note,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setNotes((prev) => [newNote, ...prev]);
        return newNote;
    }, []);
    const updateNote = useCallback((id, updates) => {
        setNotes((prev) => prev.map((note) => note.id === id
            ? { ...note, ...updates, updatedAt: new Date() }
            : note));
    }, []);
    const deleteNote = useCallback((id) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        if (selectedNote?.id === id) {
            setSelectedNote(null);
        }
    }, [selectedNote]);
    const toggleFavorite = useCallback((id) => {
        setNotes((prev) => prev.map((note) => note.id === id
            ? { ...note, favorite: !note.favorite, updatedAt: new Date() }
            : note));
    }, []);
    return {
        notes,
        selectedNote,
        setSelectedNote,
        createNote,
        updateNote,
        deleteNote,
        toggleFavorite,
    };
}
