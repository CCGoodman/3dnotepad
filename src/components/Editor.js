import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
export function Editor({ note, onUpdateNote }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
        else {
            setTitle('');
            setContent('');
        }
    }, [note]);
    if (!note) {
        return (_jsx("div", { className: "flex h-[calc(100vh-8rem)] items-center justify-center text-muted-foreground", children: "Select a note or create a new one to start editing" }));
    }
    return (_jsxs("div", { className: "space-y-4 p-4", children: [_jsx(Input, { value: title, onChange: (e) => {
                    setTitle(e.target.value);
                    onUpdateNote(note.id, { title: e.target.value });
                }, placeholder: "Note title", className: "text-lg font-semibold" }), _jsx(Textarea, { value: content, onChange: (e) => {
                    setContent(e.target.value);
                    onUpdateNote(note.id, { content: e.target.value });
                }, placeholder: "Start writing...", className: "min-h-[calc(100vh-12rem)] resize-none" })] }));
}
