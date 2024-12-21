import { loadGoogleFont } from '@/lib/fontLoader';

export const fonts = [
  { name: 'Inter', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  { name: 'Roboto', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' },
  { name: 'Playfair Display', type: 'serif', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
  { name: 'Cairo', type: 'arabic', url: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap' },
  { name: 'Amiri', type: 'arabic', url: 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap' },
  { name: 'Tajawal', type: 'arabic', url: 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap' },
  { name: 'Almarai', type: 'arabic', url: 'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap' },
  { name: 'Lato', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap' },
  { name: 'Montserrat', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' },
  { name: 'Poppins', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
  { name: 'Source Code Pro', type: 'monospace', url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap' },
  { name: 'Fira Code', type: 'monospace', url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap' },
  { name: 'JetBrains Mono', type: 'monospace', url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' },
  { name: 'Merriweather', type: 'serif', url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap' },
  { name: 'Crimson Text', type: 'serif', url: 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap' },
  { name: 'IBM Plex Sans', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap' },
  { name: 'IBM Plex Mono', type: 'monospace', url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap' },
  { name: 'Noto Sans', type: 'sans-serif', url: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap' },
  { name: 'Noto Kufi Arabic', type: 'arabic', url: 'https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap' },
  { name: 'Noto Naskh Arabic', type: 'arabic', url: 'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap' }
];

// Load all fonts
fonts.forEach(font => loadGoogleFont(font.url));