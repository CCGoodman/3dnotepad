import { useState, useMemo } from 'react';
export function useTextTransform(text) {
    const [settings, setSettings] = useState({
        uppercase: false,
        lowercase: false,
    });
    const transformedText = useMemo(() => {
        if (!text)
            return '';
        let result = text;
        if (settings.uppercase) {
            result = result.toUpperCase();
        }
        if (settings.lowercase) {
            result = result.toLowerCase();
        }
        return result;
    }, [text, settings]);
    const toggleSetting = (setting) => {
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
