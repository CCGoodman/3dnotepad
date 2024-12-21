import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
export function NoteList({ notes, selectedNote, onSelectNote, onDeleteNote, onToggleFavorite, }) {
    return (_jsx(ScrollArea, { className: "h-[calc(100vh-8rem)] w-full rounded-md border p-4", children: notes.length === 0 ? (_jsx("div", { className: "flex h-full items-center justify-center text-muted-foreground", children: "No notes yet. Create one to get started!" })) : (_jsx("div", { className: "space-y-4", children: notes.map((note) => (_jsxs("div", { className: cn('group flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-accent', selectedNote?.id === note.id && 'bg-accent'), children: [_jsxs("button", { className: "flex-1 text-left", onClick: () => onSelectNote(note), children: [_jsx("h3", { className: "font-semibold", children: note.title || 'Untitled' }), _jsx("p", { className: "text-sm text-muted-foreground", children: format(new Date(note.updatedAt), 'MMM d, yyyy HH:mm') })] }), _jsxs("div", { className: "flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => onToggleFavorite(note.id), children: _jsx(Star, { className: cn('h-4 w-4', note.favorite && 'fill-yellow-400 text-yellow-400') }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => onDeleteNote(note.id), children: _jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })] })] }, note.id))) })) }));
}
