import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
export function EditableTabTitle({ title, isActive, onChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState(title);
    const inputRef = useRef(null);
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
        }
        else {
            setEditableTitle(title);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
        else if (e.key === 'Escape') {
            setEditableTitle(title);
            setIsEditing(false);
        }
    };
    return isEditing ? (_jsx("input", { ref: inputRef, type: "text", value: editableTitle, onChange: (e) => setEditableTitle(e.target.value), onBlur: handleBlur, onKeyDown: handleKeyDown, className: cn("bg-transparent px-1 outline-none border-b border-white/20", "focus:border-white/40 transition-colors"), style: { width: `${Math.max(editableTitle.length, 1) * 8}px` } })) : (_jsx("span", { onDoubleClick: handleDoubleClick, className: cn("cursor-text select-none", isActive ? "text-white" : "text-white/70"), children: title }));
}
