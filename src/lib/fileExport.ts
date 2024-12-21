import { jsPDF } from 'jspdf';

export async function exportToPDF(content: string, filename: string = 'note'): Promise<void> {
  const doc = new jsPDF();
  
  // Split content into lines that fit the page width
  const lines = doc.splitTextToSize(content, 180);
  
  // Add text with proper line spacing
  doc.setFontSize(12);
  let y = 20;
  lines.forEach((line: string) => {
    if (y > 280) { // Check if we need a new page
      doc.addPage();
      y = 20;
    }
    doc.text(line, 15, y);
    y += 7;
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
}

export function exportToCSV(content: string, filename: string = 'note'): void {
  // Convert content to CSV format (simple conversion)
  const csvContent = content.split('\n')
    .map(line => line.replace(/,/g, ';')) // Replace commas with semicolons to avoid CSV issues
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}