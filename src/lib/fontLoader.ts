export async function loadGoogleFont(url: string) {
  try {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Wait for font to load
    await document.fonts.ready;
  } catch (error) {
    console.error('Error loading font:', error);
  }
}

export function loadCustomFont(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const fontFamily = `custom-font-${Date.now()}`;
        const fontFace = new FontFace(fontFamily, e.target?.result as ArrayBuffer);
        
        fontFace.load().then((loadedFace) => {
          document.fonts.add(loadedFace);
          resolve(fontFamily);
        }).catch(reject);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}