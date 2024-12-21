import { useState } from 'react';
import { themes } from '@/lib/themes';
const THEME_STORAGE_KEY = 'notepad-theme';
const DEFAULT_THEME_ID = 'cosmic'; // Set Cosmic Dreams as default
export function useTheme() {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedThemeId = localStorage.getItem(THEME_STORAGE_KEY);
        return savedThemeId
            ? themes.find(t => t.id === savedThemeId) || themes.find(t => t.id === DEFAULT_THEME_ID)
            : themes.find(t => t.id === DEFAULT_THEME_ID);
    });
    const changeTheme = (themeId) => {
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
            setCurrentTheme(theme);
            localStorage.setItem(THEME_STORAGE_KEY, themeId);
        }
    };
    return {
        currentTheme,
        themes,
        changeTheme
    };
}
