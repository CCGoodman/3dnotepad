import { useState, useMemo } from 'react';

interface TextTransformSettings {
  reverse: boolean;
  uppercase: boolean;
  lowercase: boolean;
}

export function useTextTransform(text: string) {
  const [settings, setSettings] = useState<TextTransformSettings>({
    reverse: false,
    uppercase: false,
    lowercase: false,
  });

  const transformedText = useMemo(() => {
    if (!text) return '';
    
    let result = text;

    if (settings.reverse) {
      result = result.split('\n').map(line => 
        line.split(' ').map(word => 
          word.split('').reverse().join('')
        ).join(' ')
      ).join('\n');
    }
    
    if (settings.uppercase) {
      result = result.toUpperCase();
    }
    if (settings.lowercase) {
      result = result.toLowerCase();
    }

    return result;
  }, [text, settings]);

  const toggleSetting = (setting: keyof TextTransformSettings) => {
    setSettings(prev => {
      if (setting === 'uppercase' && !prev.uppercase) {
        return { ...prev, [setting]: true, lowercase: false };
      }
      if (setting === 'lowercase' && !prev.lowercase) {
        return { ...prev, [setting]: true, uppercase: false };
      }
      return { ...prev, [setting]: !prev[setting] };
    });
  };

  return {
    transformedText,
    textTransformSettings: settings,
    toggleSetting,
  };
}
