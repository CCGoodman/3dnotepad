import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface EditorProps {
  note: Note | null;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
}

export function Editor({ note, onUpdateNote }: EditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  if (!note) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center text-muted-foreground">
        Select a note or create a new one to start editing
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <Input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          onUpdateNote(note.id, { title: e.target.value });
        }}
        placeholder="Note title"
        className="text-lg font-semibold"
      />
      <Textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          onUpdateNote(note.id, { content: e.target.value });
        }}
        placeholder="Start writing..."
        className="min-h-[calc(100vh-12rem)] resize-none"
      />
    </div>
  );
}