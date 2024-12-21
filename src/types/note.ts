export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}

export type NoteCreate = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;