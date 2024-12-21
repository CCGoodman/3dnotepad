import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Coffee, Search, X, Upload, Eye, EyeOff, Zap, ZapOff, ArrowUpAZ, ArrowDownAZ, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { fonts } from '@/lib/fonts';
import { menuAnimations } from '@/lib/animations';
import { loadCustomFont } from '@/lib/fontLoader';
import { radioStations, radioPlayer } from '@/lib/radio';
import { RadioSection } from './RadioSection';
import { ColorPicker } from './ColorPicker';
import { Brain } from 'lucide-react';
import { useApiKey } from '@/hooks/useApiKey';
export function Settings({ onClose, onFontChange, currentFont, animationsEnabled, onToggleAnimations, backgroundEnabled, onToggleBackground, textTransformSettings, onToggleTextTransform, glowEnabled, onToggleGlow, soundEnabled, onToggleSound, glowColor, onGlowColorChange, suggestionsEnabled, onToggleSuggestions }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [customFonts, setCustomFonts] = useState([]);
    const [activeTab, setActiveTab] = useState('fonts');
    const fileInputRef = useRef(null);
    const [radioEnabled, setRadioEnabled] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentStation, setCurrentStation] = useState(null);
    const { apiKey, setApiKey, hasCustomKey } = useApiKey();
    useEffect(() => {
        // Sync with radio player state on mount
        setVolume(radioPlayer.getVolume());
        setCurrentStation(radioPlayer.getCurrentStationId());
        setRadioEnabled(radioPlayer.isCurrentlyPlaying());
    }, []);
    const handleApiKeyChange = (newKey) => {
        setApiKey(newKey);
    };
    const handleRadioToggle = () => {
        if (!radioEnabled) {
            const firstStation = radioStations[0];
            radioPlayer.play(firstStation);
            setCurrentStation(firstStation.id);
            setRadioEnabled(true);
        }
        else {
            radioPlayer.stop();
            setRadioEnabled(false);
        }
    };
    const handleVolumeChange = (values) => {
        const newVolume = values[0];
        setVolume(newVolume);
        radioPlayer.setVolume(newVolume);
    };
    const handleStationChange = (stationId) => {
        const station = radioStations.find(s => s.id === stationId);
        if (station) {
            radioPlayer.play(station);
            setCurrentStation(stationId);
        }
    };
    const filteredFonts = [...fonts, ...customFonts].filter(font => font.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            if (!file.name.toLowerCase().endsWith('.ttf') && !file.name.toLowerCase().endsWith('.otf')) {
                throw new Error('Please upload a .ttf or .otf font file');
            }
            const fontFamily = await loadCustomFont(file);
            const fontName = file.name.replace(/\.(ttf|otf)$/i, '');
            setCustomFonts(prev => [...prev, { name: fontName, family: fontFamily }]);
        }
        catch (error) {
            console.error('Error loading custom font:', error);
        }
    };
    return (_jsxs(motion.div, { ...menuAnimations.slideRight, className: "fixed right-4 top-4 z-50 w-80 rounded-lg bg-black/30 p-4 backdrop-blur-lg", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Settings" }), _jsx(motion.button, { onClick: onClose, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, className: "rounded-full p-1 hover:bg-white/10", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "mb-4 flex space-x-2", children: [_jsx("button", { onClick: () => setActiveTab('fonts'), className: cn("flex-1 rounded-md px-3 py-1.5 text-sm transition-colors", activeTab === 'fonts' ? "bg-white/20" : "hover:bg-white/10"), children: "Fonts" }), _jsx("button", { onClick: () => setActiveTab('appearance'), className: cn("flex-1 rounded-md px-3 py-1.5 text-sm transition-colors", activeTab === 'appearance' ? "bg-white/20" : "hover:bg-white/10"), children: "Appearance" }), _jsx("button", { onClick: () => setActiveTab('extra'), className: cn("flex-1 rounded-md px-3 py-1.5 text-sm transition-colors", activeTab === 'extra' ? "bg-white/20" : "hover:bg-white/10"), children: "Extra" })] }), _jsxs("div", { className: "space-y-4", children: [activeTab === 'fonts' && (_jsxs("div", { children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-white/50" }), _jsx("input", { type: "text", placeholder: "Search fonts...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full rounded-md bg-white/10 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20" })] }), _jsxs(motion.button, { onClick: () => fileInputRef.current?.click(), className: "mt-2 flex w-full items-center justify-center space-x-2 rounded-md bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/20", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Upload, { className: "h-4 w-4" }), _jsx("span", { children: "Upload Custom Font" })] }), _jsx("input", { ref: fileInputRef, type: "file", accept: ".ttf,.otf", className: "hidden", onChange: handleFileUpload }), _jsx("div", { className: "mt-2 h-48 overflow-y-auto rounded-md bg-black/20 p-2", children: _jsx("div", { className: "space-y-1", children: filteredFonts.map((font) => (_jsx("button", { onClick: () => onFontChange(font.family || font.name), className: cn("w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/10", currentFont === (font.family || font.name) && "bg-white/20"), style: { fontFamily: font.family || font.name }, children: font.name }, font.name))) }) })] })), activeTab === 'appearance' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("button", { onClick: () => onToggleBackground(!backgroundEnabled), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [backgroundEnabled ? _jsx(Eye, { className: "h-4 w-4" }) : _jsx(EyeOff, { className: "h-4 w-4" }), _jsx("span", { children: "Background Image" })] }), _jsx("span", { className: "text-xs text-white/70", children: backgroundEnabled ? 'Enabled' : 'Disabled' })] }), _jsxs("button", { onClick: () => onToggleAnimations(!animationsEnabled), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [animationsEnabled ? _jsx(Zap, { className: "h-4 w-4" }) : _jsx(ZapOff, { className: "h-4 w-4" }), _jsx("span", { children: "3D Animation" })] }), _jsx("span", { className: "text-xs text-white/70", children: animationsEnabled ? 'Enabled' : 'Disabled' })] }), _jsxs("button", { onClick: () => onToggleSound(!soundEnabled), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [soundEnabled ? _jsx(Volume2, { className: "h-4 w-4" }) : _jsx(VolumeX, { className: "h-4 w-4" }), _jsx("span", { children: "Sound Effects" })] }), _jsx("span", { className: "text-xs text-white/70", children: soundEnabled ? 'Enabled' : 'Disabled' })] })] })), activeTab === 'extra' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("button", { onClick: () => onToggleTextTransform('uppercase'), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(ArrowUpAZ, { className: "h-4 w-4" }), _jsx("span", { children: "Uppercase" })] }), _jsx("span", { className: "text-xs text-white/70", children: textTransformSettings.uppercase ? 'Enabled' : 'Disabled' })] }), _jsxs("button", { onClick: () => onToggleTextTransform('lowercase'), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(ArrowDownAZ, { className: "h-4 w-4" }), _jsx("span", { children: "Lowercase" })] }), _jsx("span", { className: "text-xs text-white/70", children: textTransformSettings.lowercase ? 'Enabled' : 'Disabled' })] }), _jsxs("button", { onClick: () => onToggleSuggestions(!suggestionsEnabled), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Brain, { className: "h-4 w-4" }), _jsx("span", { children: "Word Suggestions" })] }), _jsx("span", { className: "text-xs text-white/70", children: suggestionsEnabled ? 'Enabled' : 'Disabled' })] }), _jsxs("button", { onClick: () => onToggleGlow(!glowEnabled), className: "flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Sparkles, { className: "h-4 w-4" }), _jsx("span", { children: "Text Glow" })] }), _jsx("span", { className: "text-xs text-white/70", children: glowEnabled ? 'Enabled' : 'Disabled' })] }), glowEnabled && (_jsx("div", { className: "px-4 py-2", children: _jsx(ColorPicker, { currentColor: glowColor, onColorChange: onGlowColorChange, colors: [
                                        '#ffd700', // Gold
                                        '#ff4444', // Red
                                        '#44ff44', // Green
                                        '#4444ff', // Blue
                                        '#ff44ff', // Purple
                                        '#44ffff', // Cyan
                                        '#ffffff', // White
                                        '#ff8800' // Orange
                                    ] }) })), _jsx("div", { className: "border-t border-white/10 pt-4", children: _jsx(RadioSection, { radioEnabled: radioEnabled, volume: volume, currentStation: currentStation, onToggleRadio: handleRadioToggle, onVolumeChange: handleVolumeChange, onStationChange: handleStationChange, stations: radioStations }) }), _jsx("div", { className: "border-t border-white/10 pt-4", children: _jsxs("a", { href: "https://ko-fi.com/goodman99", target: "_blank", rel: "noopener noreferrer", className: "flex items-center space-x-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10", children: [_jsx(Coffee, { className: "h-4 w-4 text-yellow-400" }), _jsx("span", { className: "text-yellow-400", children: "Buy me a coffee" })] }) })] }))] })] }));
}
