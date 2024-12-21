export function formatLongText(text: string, maxLength: number = 500): string {
  const sentences = text.split(/(?<=[.!?])\s+/); // Improved sentence splitting
  let lines: string[] = [];
  let currentLine = '';

  sentences.forEach(sentence => {
    if ((currentLine + ' ' + sentence).trim().length > maxLength) {
      // Push the current line if adding the sentence exceeds max length
      if (currentLine) lines.push(currentLine.trim());
      currentLine = sentence; // Start a new line with the current sentence
    } else {
      // Append the sentence to the current line
      currentLine += (currentLine ? ' ' : '') + sentence;
    }
  });

  if (currentLine) lines.push(currentLine.trim()); // Add any leftover text
  return lines.join('\n'); // Join lines with line breaks
}
