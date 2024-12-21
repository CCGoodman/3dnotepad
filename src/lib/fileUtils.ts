import { exportToPDF, exportToCSV } from './fileExport';

export type FileFormat = 'txt' | 'pdf' | 'csv';

export async function saveFile(content: string, format: FileFormat = 'txt') {
  try {
    const filename = `note-${new Date().toISOString().slice(0, 10)}`;

    switch (format) {
      case 'pdf':
        await exportToPDF(content, filename);
        break;
      case 'csv':
        exportToCSV(content, filename);
        break;
      default:
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
}