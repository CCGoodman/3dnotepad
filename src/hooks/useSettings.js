import { useState, useCallback } from 'react';
import { loadSettings, saveSettings } from '@/lib/settingsStorage';
export function useSettings() {
    const [settings, setSettings] = useState(() => loadSettings());
    const updateSettings = useCallback((updates) => {
        setSettings(prev => {
            const newSettings = { ...prev, ...updates };
            saveSettings(newSettings);
            return newSettings;
        });
    }, []);
    return {
        settings,
        updateSettings
    };
}
