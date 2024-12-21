export function getWordCount(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}
export function getCharacterCount(text) {
    return text.length;
}
export function getReadingTime(text) {
    const words = getWordCount(text);
    return Math.ceil(words / 200); // Average reading speed: 200 words per minute
}
