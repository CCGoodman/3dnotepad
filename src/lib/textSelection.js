export function getSelectedText(textareaRef) {
    if (!textareaRef.current)
        return '';
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    return textareaRef.current.value.substring(start, end);
}
