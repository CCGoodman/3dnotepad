import { motion } from 'framer-motion';
import { Coffee, Search, X, Upload, Eye, EyeOff, Zap, ZapOff, RotateCcw, ArrowUpAZ, ArrowDownAZ, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { fonts } from '@/lib/fonts';
import { menuAnimations } from '@/lib/animations';
import { loadCustomFont } from '@/lib/fontLoader';
import { playSound } from '@/lib/sounds';
import { radioStations, radioPlayer } from '@/lib/radio';
import { RadioSection } from './RadioSection';
import { ColorPicker } from './ColorPicker';
import { Brain } from 'lucide-react';
import { getMistralApiKey } from '@/lib/apiConfig';
import { useApiKey } from '@/hooks/useApiKey';


interface TextTransformSettings {
  reverse: boolean;
  uppercase: boolean;
  lowercase: boolean;
}

interface SettingsProps {
  onClose: () => void;
  onFontChange: (font: string) => void;
  currentFont: string;
  animationsEnabled: boolean;
  onToggleAnimations: (enabled: boolean) => void;
  backgroundEnabled: boolean;
  onToggleBackground: (enabled: boolean) => void;
  textTransformSettings: TextTransformSettings;
  onToggleTextTransform: (setting: keyof TextTransformSettings) => void;
  glowEnabled: boolean;
  onToggleGlow: (enabled: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  glowColor: string;
  onGlowColorChange: (color: string) => void;
  suggestionsEnabled: boolean;
  onToggleSuggestions: (enabled: boolean) => void;
}

export function Settings({ 
  onClose,
  onFontChange,
  currentFont,
  animationsEnabled,
  onToggleAnimations,
  backgroundEnabled,
  onToggleBackground,
  textTransformSettings,
  onToggleTextTransform,
  glowEnabled,
  onToggleGlow,
  soundEnabled,
  onToggleSound,
  glowColor,
  onGlowColorChange,
  suggestionsEnabled, 
  onToggleSuggestions
}: SettingsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [customFonts, setCustomFonts] = useState<Array<{ name: string, family: string }>>([]);
  const [activeTab, setActiveTab] = useState<'fonts' | 'appearance' | 'extra'>('fonts');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [radioEnabled, setRadioEnabled] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const { apiKey, setApiKey, hasCustomKey } = useApiKey();

  useEffect(() => {
    // Sync with radio player state on mount
    setVolume(radioPlayer.getVolume());
    setCurrentStation(radioPlayer.getCurrentStationId());
    setRadioEnabled(radioPlayer.isCurrentlyPlaying());
  }, []);

  const handleApiKeyChange = (newKey: string) => {
  setApiKey(newKey);
  };
  
  const handleRadioToggle = () => {
    if (!radioEnabled) {
      const firstStation = radioStations[0];
      radioPlayer.play(firstStation);
      setCurrentStation(firstStation.id);
      setRadioEnabled(true);
    } else {
      radioPlayer.stop();
      setRadioEnabled(false);
    }
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    radioPlayer.setVolume(newVolume);
  };

  const handleStationChange = (stationId: string) => {
    const station = radioStations.find(s => s.id === stationId);
    if (station) {
      radioPlayer.play(station);
      setCurrentStation(stationId);
    }
  };

  const filteredFonts = [...fonts, ...customFonts].filter(font => 
    font.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      if (!file.name.toLowerCase().endsWith('.ttf') && !file.name.toLowerCase().endsWith('.otf')) {
        throw new Error('Please upload a .ttf or .otf font file');
      }

      const fontFamily = await loadCustomFont(file);
      const fontName = file.name.replace(/\.(ttf|otf)$/i, '');
      
      setCustomFonts(prev => [...prev, { name: fontName, family: fontFamily }]);
    } catch (error) {
      console.error('Error loading custom font:', error);
    }
  };

  return (
    <motion.div
      {...menuAnimations.slideRight}
      className="fixed right-4 top-4 z-50 w-80 rounded-lg bg-black/30 p-4 backdrop-blur-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-full p-1 hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setActiveTab('fonts')}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm transition-colors",
            activeTab === 'fonts' ? "bg-white/20" : "hover:bg-white/10"
          )}
        >
          Fonts
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm transition-colors",
            activeTab === 'appearance' ? "bg-white/20" : "hover:bg-white/10"
          )}
        >
          Appearance
        </button>
        <button
          onClick={() => setActiveTab('extra')}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm transition-colors",
            activeTab === 'extra' ? "bg-white/20" : "hover:bg-white/10"
          )}
        >
          Extra
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'fonts' && (
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder="Search fonts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md bg-white/10 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            
            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 flex w-full items-center justify-center space-x-2 rounded-md bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="h-4 w-4" />
              <span>Upload Custom Font</span>
            </motion.button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".ttf,.otf"
              className="hidden"
              onChange={handleFileUpload}
            />

            <div className="mt-2 h-48 overflow-y-auto rounded-md bg-black/20 p-2">
              <div className="space-y-1">
                {filteredFonts.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => onFontChange(font.family || font.name)}
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-white/10",
                      currentFont === (font.family || font.name) && "bg-white/20"
                    )}
                    style={{ fontFamily: font.family || font.name }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <button
              onClick={() => onToggleBackground(!backgroundEnabled)}
              className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
                {backgroundEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span>Background Image</span>
              </div>
              <span className="text-xs text-white/70">{backgroundEnabled ? 'Enabled' : 'Disabled'}</span>
            </button>

            <button
              onClick={() => onToggleAnimations(!animationsEnabled)}
              className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
                {animationsEnabled ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
                <span>3D Animation</span>
              </div>
              <span className="text-xs text-white/70">{animationsEnabled ? 'Enabled' : 'Disabled'}</span>
            </button>

            <button
              onClick={() => onToggleSound(!soundEnabled)}
              className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span>Sound Effects</span>
              </div>
              <span className="text-xs text-white/70">{soundEnabled ? 'Enabled' : 'Disabled'}</span>
            </button>
          </div>
        )}

        {activeTab === 'extra' && (
          <div className="space-y-4">
            <button
              onClick={() => onToggleTextTransform('uppercase')}
              className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
                <ArrowUpAZ className="h-4 w-4" />
                <span>Uppercase</span>
              </div>
              <span className="text-xs text-white/70">
                {textTransformSettings.uppercase ? 'Enabled' : 'Disabled'}
              </span>
            </button>

            <button
              onClick={() => onToggleTextTransform('lowercase')}
              className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
                <ArrowDownAZ className="h-4 w-4" />
                <span>Lowercase</span>
              </div>
              <span className="text-xs text-white/70">
                {textTransformSettings.lowercase ? 'Enabled' : 'Disabled'}
              </span>
            </button>

            <button
              onClick={() => onToggleSuggestions(!suggestionsEnabled)}
              className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
              <div className="flex items-center space-x-2">
        <Brain className="h-4 w-4" />
              <span>Word Suggestions</span>
              </div>
      <span className="text-xs text-white/70">
        {suggestionsEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </button>

            <button
             onClick={() => onToggleGlow(!glowEnabled)}
             className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm transition-colors hover:bg-white/10"
            >
            <div className="flex items-center space-x-2">
             <Sparkles className="h-4 w-4" />
             <span>Text Glow</span>
            </div>
             <span className="text-xs text-white/70">
             {glowEnabled ? 'Enabled' : 'Disabled'}
             </span>
            </button>

{/* Add the ColorPicker right after the glow button */}
{glowEnabled && (
  <div className="px-4 py-2">
    <ColorPicker
      currentColor={glowColor}
      onColorChange={onGlowColorChange}
      colors={[
        '#ffd700', // Gold
        '#ff4444', // Red
        '#44ff44', // Green
        '#4444ff', // Blue
        '#ff44ff', // Purple
        '#44ffff', // Cyan
        '#ffffff', // White
        '#ff8800'  // Orange
      ]}
    />
  </div>
)}

            <div className="border-t border-white/10 pt-4">
              <RadioSection
                radioEnabled={radioEnabled}
                volume={volume}
                currentStation={currentStation}
                onToggleRadio={handleRadioToggle}
                onVolumeChange={handleVolumeChange}
                onStationChange={handleStationChange}
                stations={radioStations}
              />
            </div>

            <div className="border-t border-white/10 pt-4">
              <a
                href="https://ko-fi.com/goodman99"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <Coffee className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400">Buy me a coffee</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}