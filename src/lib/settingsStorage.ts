export interface AppSettings {
  currentFont: string;
  animationsEnabled: boolean;
  backgroundEnabled: boolean;
  glowEnabled: boolean;
  soundEnabled: boolean;
  glowColor: string;
  suggestionsEnabled: boolean;
  textTransformSettings: {
    reverse: boolean;
    uppercase: boolean;
    lowercase: boolean;
  };
}

const SETTINGS_STORAGE_KEY = 'notepad-3d-settings';

const DEFAULT_SETTINGS: AppSettings = {
  currentFont: 'Inter',
  animationsEnabled: true,
  backgroundEnabled: true,
  glowEnabled: false,
  soundEnabled: true,
  glowColor: '#ffd700',
  suggestionsEnabled: true,
  textTransformSettings: {
    reverse: false,
    uppercase: false,
    lowercase: false
  }
};

export function saveSettings(settings: Partial<AppSettings>) {
  try {
    const currentSettings = loadSettings();
    const newSettings = { ...currentSettings, ...settings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

export function loadSettings(): AppSettings {
  try {
    const settings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!settings) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(settings) };
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
}