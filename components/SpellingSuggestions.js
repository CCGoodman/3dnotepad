import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getWordSuggestions } from '@/lib/spellcheck';
export function SpellingSuggestions({ selectedText, onReplace }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchSuggestions() {
            if (!selectedText)
                return;
            setLoading(true);
            try {
                const words = await getWordSuggestions(selectedText);
                setSuggestions(words.filter(word => word !== selectedText));
            }
            catch (error) {
                console.error('Error fetching suggestions:', error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchSuggestions();
    }, [selectedText]);
    if (!suggestions.length && !loading)
        return null;
    return (_jsxs("div", { className: "px-2 py-1 border-b border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between px-2 py-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(BookOpen, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: "Suggestions" })] }), loading && (_jsx("div", { className: "animate-pulse text-xs text-white/50", children: "Loading..." }))] }), _jsx("div", { className: "max-h-32 overflow-y-auto", children: suggestions.map((word, index) => (_jsx(motion.button, { initial: { opacity: 0, x: -10 }, animate: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.05 }
                    }, onClick: () => onReplace(word), className: "w-full text-left px-4 py-1.5 text-sm rounded hover:bg-white/10 transition-colors", children: word }, word))) })] }));
}
