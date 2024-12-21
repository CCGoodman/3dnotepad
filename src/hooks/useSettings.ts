import { useState, useCallback } from 'react';
import { AppSettings, loadSettings, saveSettings } from '@/lib/settingsStorage';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
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