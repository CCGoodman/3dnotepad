import { Note } from '@/types/note';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export function NoteList({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  onToggleFavorite,
}: NoteListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)] w-full rounded-md border p-4">
      {notes.length === 0 ? (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          No notes yet. Create one to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                'group flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-accent',
                selectedNote?.id === note.id && 'bg-accent'
              )}
            >
              <button
                className="flex-1 text-left"
                onClick={() => onSelectNote(note)}
              >
                <h3 className="font-semibold">{note.title || 'Untitled'}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(note.updatedAt), 'MMM d, yyyy HH:mm')}
                </p>
              </button>
              <div className="flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite(note.id)}
                >
                  <Star
                    className={cn(
                      'h-4 w-4',
                      note.favorite && 'fill-yellow-400 text-yellow-400'
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteNote(note.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}