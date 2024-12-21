import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { ContextMenu } from '@/components/ContextMenu';
import { ThemeMenu } from '@/components/ThemeMenu';
import { Settings } from '@/components/Settings';
import { cn } from '@/lib/utils';
import { saveFile } from '@/lib/fileUtils';
import { useTheme } from '@/hooks/useTheme';
import { useZoom } from '@/hooks/useZoom';
import { saveNotepadContent, loadNotepadContent } from '@/lib/storage';
import { useTextTransform } from '@/hooks/useTextTransform';
import { useTextEffects } from '@/hooks/useTextEffects';
import { getSelectedText } from '@/lib/textSelection';
import { useClickOutside } from '@/hooks/useClickOutside';
import { playSound, playTypeSound, toggleSound } from '@/lib/sounds';
import { TabBar } from '@/components/TabBar';
import { useTabs } from '@/hooks/useTabs';
import { loadSettings } from '@/lib/settingsStorage';
import { SaveIndicator } from '@/components/SaveIndicator';
import { AiChat } from '@/components/AiChat';
export default function App() {
    const { tabs, activeTab, activeTabId, setActiveTabId, createTab, closeTab, updateTab } = useTabs(8);
    const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);
    const [content, setContent] = useState('');
    const [lastSaved, setLastSaved] = useState(null);
    const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, show: false });
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const [themeMenuPosition, setThemeMenuPosition] = useState({ x: 0, y: 0 });
    const [showSettings, setShowSettings] = useState(false);
    const [currentFont, setCurrentFont] = useState('Inter');
    const [animationsEnabled, setAnimationsEnabled] = useState(true);
    const [backgroundEnabled, setBackgroundEnabled] = useState(true);
    const [glowEnabled, setGlowEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [glowColor, setGlowColor] = useState('#ffd700');
    const textareaRef = useRef(null);
    const contextMenuRef = useRef(null);
    const themeMenuRef = useRef(null);
    const settingsRef = useRef(null);
    const settings = loadSettings();
    const { currentTheme, themes, changeTheme } = useTheme();
    const fontSize = useZoom(16);
    const saveTimeoutRef = useRef();
    const { transformedText, textTransformSettings, toggleSetting } = useTextTransform(activeTab.content);
    const { effects, addEffect, removeEffect, getEffectForPosition } = useTextEffects();
    useEffect(() => {
        toggleSound(soundEnabled);
    }, [soundEnabled]);
    // Click outside handlers
    useClickOutside(contextMenuRef, () => setContextMenu(prev => ({ ...prev, show: false })));
    useClickOutside(themeMenuRef, () => setShowThemeMenu(false));
    useClickOutside(settingsRef, () => setShowSettings(false));
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = {
        damping: 20,
        stiffness: 25,
        mass: 4.5
    };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);
    const rotateX = useTransform(y, [-100, 100], [8, -8]);
    const rotateY = useTransform(x, [-100, 100], [-8, 8]);
    useEffect(() => {
        const savedData = loadNotepadContent();
        setContent(savedData.content);
        setLastSaved(savedData.lastSaved);
    }, []);
    useEffect(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = window.setTimeout(() => {
            saveNotepadContent(activeTab.content);
            updateTab(activeTabId, {
                lastSaved: new Date().toISOString()
            });
            playSound('save');
        }, 1000);
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [activeTab.content, activeTabId, updateTab]);
    const handleMouseMove = (e) => {
        if (!animationsEnabled)
            return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * 0.18;
        const moveY = (e.clientY - centerY) * 0.18;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    const handleWheel = (e) => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop += e.deltaY;
        }
    };
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.addEventListener('wheel', handleWheel, { passive: true });
        }
        return () => {
            if (textarea) {
                textarea.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);
    const handleContextMenu = (e) => {
        e.preventDefault();
        playSound('menu');
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            show: true
        });
    };
    const handleCopy = () => {
        if (textareaRef.current) {
            const selection = textareaRef.current.value.substring(textareaRef.current.selectionStart, textareaRef.current.selectionEnd);
            navigator.clipboard.writeText(selection);
            playSound('click');
        }
        setContextMenu({ ...contextMenu, show: false });
    };
    const handleCut = () => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const selection = textareaRef.current.value.substring(start, end);
            navigator.clipboard.writeText(selection);
            const newContent = activeTab.content.substring(0, start) +
                activeTab.content.substring(end);
            updateTab(activeTabId, {
                content: newContent,
                lastSaved: new Date().toISOString()
            });
            playSound('click');
        }
        setContextMenu({ ...contextMenu, show: false });
    };
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (textareaRef.current) {
                const start = textareaRef.current.selectionStart;
                const end = textareaRef.current.selectionEnd;
                const newContent = activeTab.content.substring(0, start) +
                    text +
                    activeTab.content.substring(end);
                updateTab(activeTabId, {
                    content: newContent,
                    lastSaved: new Date().toISOString()
                });
                playSound('click');
            }
        }
        catch (err) {
            console.error('Failed to paste:', err);
        }
        setContextMenu({ ...contextMenu, show: false });
    };
    const handleDelete = () => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const newContent = activeTab.content.substring(0, start) +
                activeTab.content.substring(end);
            updateTab(activeTabId, {
                content: newContent,
                lastSaved: new Date().toISOString()
            });
            playSound('click');
        }
        setContextMenu({ ...contextMenu, show: false });
    };
    const handleSave = async (format = 'txt') => {
        console.log(`Saving in format: ${format}`); // Log the format to verify
        try {
            await saveFile(activeTab.content, format);
            playSound('save');
            setContextMenu({ ...contextMenu, show: false });
        }
        catch (err) {
            console.error('Failed to save file:', err);
        }
    };
    const handleThemeClick = () => {
        setThemeMenuPosition({ x: contextMenu.x, y: contextMenu.y });
        setShowThemeMenu(true);
        playSound('menu');
        setContextMenu({ ...contextMenu, show: false });
    };
    const handleTextChange = (e) => {
        updateTab(activeTabId, {
            content: e.target.value,
            lastSaved: new Date().toISOString()
        });
        playTypeSound();
    };
    const handleReplaceWord = (newWord) => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            // Use activeTab.content instead of content
            const newContent = activeTab.content.substring(0, start) +
                newWord +
                activeTab.content.substring(end);
            // Update the specific tab's content
            updateTab(activeTabId, {
                content: newContent,
                lastSaved: new Date().toISOString()
            });
            playSound('click');
        }
        setContextMenu({ ...contextMenu, show: false });
    };
    return (_jsxs("div", { className: cn("flex h-screen items-center justify-center", backgroundEnabled ? currentTheme.background : "bg-black", "transition-colors duration-700"), onContextMenu: handleContextMenu, children: [_jsx(motion.button, { className: "fixed right-4 top-4 z-50 rounded-full bg-black/30 p-2 backdrop-blur-lg", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: () => {
                    setShowSettings(true);
                    playSound('menu');
                }, onMouseEnter: () => playSound('hover'), children: _jsx(SettingsIcon, { className: "h-5 w-5" }) }), _jsx(motion.div, { className: "perspective-1000", onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, style: {
                    rotateX: animationsEnabled ? rotateX : 0,
                    rotateY: animationsEnabled ? rotateY : 0,
                    transition: { duration: 1.5 }
                }, children: _jsxs("div", { className: cn("w-[800px] rounded-xl", backgroundEnabled ? "backdrop-blur-lg" : "", `bg-gradient-to-br ${currentTheme.accentColor}`), children: [_jsx(TabBar, { tabs: tabs, activeTabId: activeTabId, onTabChange: setActiveTabId, onNewTab: createTab, onCloseTab: closeTab, onTitleChange: (id, title) => updateTab(id, { title }) }), _jsxs("div", { className: "p-8", children: [_jsx("textarea", { ref: textareaRef, value: transformedText, onChange: handleTextChange, style: {
                                        fontFamily: currentFont,
                                        fontSize: `${fontSize}px`,
                                        '--glow-color': glowColor // Add this line
                                    }, className: cn("h-[500px] w-full resize-none rounded-lg p-4", "placeholder-white/50", "focus:outline-none focus:ring-2 focus:ring-white/20", "text-lg leading-relaxed", "scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20", "transition-all duration-300", currentTheme.editorBackground, currentTheme.textColor, glowEnabled && "text-glow"), "data-glow-color": glowEnabled ? glowColor : undefined, placeholder: "Start typing..." }), _jsx(SaveIndicator, { lastSaved: activeTab.lastSaved })] })] }) }), contextMenu.show && (_jsx("div", { ref: contextMenuRef, children: _jsx(ContextMenu, { x: contextMenu.x, y: contextMenu.y, onCut: handleCut, onCopy: handleCopy, onPaste: handlePaste, onDelete: handleDelete, onSave: () => handleSave('txt'), onSavePDF: () => handleSave('pdf'), onSaveCSV: () => handleSave('csv'), onTheme: handleThemeClick, selectedText: getSelectedText(textareaRef), onReplace: suggestionsEnabled ? handleReplaceWord : undefined }) })), showThemeMenu && (_jsx("div", { ref: themeMenuRef, children: _jsx(ThemeMenu, { x: themeMenuPosition.x, y: themeMenuPosition.y, themes: themes, currentTheme: currentTheme, onSelectTheme: (themeId) => {
                        changeTheme(themeId);
                        playSound('menu');
                    }, onClose: () => setShowThemeMenu(false) }) })), showSettings && (_jsx("div", { ref: settingsRef, children: _jsx(Settings, { onClose: () => {
                        setShowSettings(false);
                        playSound('menu');
                    }, onFontChange: (font) => {
                        setCurrentFont(font);
                        playSound('click');
                    }, currentFont: currentFont, animationsEnabled: animationsEnabled, onToggleAnimations: (enabled) => {
                        setAnimationsEnabled(enabled);
                        playSound('click');
                    }, backgroundEnabled: backgroundEnabled, onToggleBackground: (enabled) => {
                        setBackgroundEnabled(enabled);
                        playSound('click');
                    }, textTransformSettings: textTransformSettings, onToggleTextTransform: (setting) => {
                        toggleSetting(setting);
                        playSound('click');
                    }, glowEnabled: glowEnabled, onToggleGlow: (enabled) => {
                        setGlowEnabled(enabled);
                        playSound('click');
                    }, soundEnabled: soundEnabled, onToggleSound: setSoundEnabled, glowColor: glowColor, onGlowColorChange: setGlowColor, suggestionsEnabled: suggestionsEnabled, onToggleSuggestions: setSuggestionsEnabled }) })), _jsx(AiChat, {})] }));
}
