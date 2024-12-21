import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface EditableTabTitleProps {
  title: string;
  isActive: boolean;
  onChange: (newTitle: string) => void;
}

export function EditableTabTitle({ title, isActive, onChange }: EditableTabTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editableTitle.trim()) {
      onChange(editableTitle);
    } else {
      setEditableTitle(title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditableTitle(title);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={editableTitle}
      onChange={(e) => setEditableTitle(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "bg-transparent px-1 outline-none border-b border-white/20",
        "focus:border-white/40 transition-colors"
      )}
      style={{ width: `${Math.max(editableTitle.length, 1) * 8}px` }}
    />
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      className={cn(
        "cursor-text select-none",
        isActive ? "text-white" : "text-white/70"
      )}
    >
      {title}
    </span>
  );
}
