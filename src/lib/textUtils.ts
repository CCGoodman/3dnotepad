export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getCharacterCount(text: string): number {
  return text.length;
}

export function getReadingTime(text: string): number {
  const words = getWordCount(text);
  return Math.ceil(words / 200); // Average reading speed: 200 words per minute
}