import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWordSuggestions } from '@/lib/spellcheck';

interface SpellingSuggestionsProps {
  selectedText: string;
  onReplace: (word: string) => void;
}

export function SpellingSuggestions({ selectedText, onReplace }: SpellingSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSuggestions() {
      if (!selectedText) return;
      
      setLoading(true);
      try {
        const words = await getWordSuggestions(selectedText);
        setSuggestions(words.filter(word => word !== selectedText));
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [selectedText]);

  if (!suggestions.length && !loading) return null;

  return (
    <div className="px-2 py-1 border-b border-white/10">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">Suggestions</span>
        </div>
        {loading && (
          <div className="animate-pulse text-xs text-white/50">
            Loading...
          </div>
        )}
      </div>
      
      <div className="max-h-32 overflow-y-auto">
        {suggestions.map((word, index) => (
          <motion.button
            key={word}
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: index * 0.05 }
            }}
            onClick={() => onReplace(word)}
            className="w-full text-left px-4 py-1.5 text-sm rounded hover:bg-white/10 transition-colors"
          >
            {word}
          </motion.button>
        ))}
      </div>
    </div>
  );
}