import profanity from './profanity.json';
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const DATAMUSE_API_URL = 'https://api.datamuse.com/words';
const METAPHONE_API_URL = 'https://api.metaphone.com/v1/suggest';
export async function getWordSuggestions(word) {
    try {
        // First check if it's a valid word
        const dictionaryResponse = await fetch(`${DICTIONARY_API_URL}${word}`);
        if (dictionaryResponse.ok) {
            return [word]; // Word is correct
        }
        // If not valid, get suggestions from multiple sources
        const suggestions = await Promise.all([
            getDatamuseSuggestions(word),
            getSoundAlikeSuggestions(word),
            getProfanityAlternatives(word)
        ]);
        // Combine and deduplicate suggestions
        const allSuggestions = Array.from(new Set(suggestions.flat()))
            .filter(suggestion => suggestion !== word)
            .slice(0, 5); // Limit to top 5 suggestions
        return allSuggestions;
    }
    catch (error) {
        console.error('Error in spell check:', error);
        return [];
    }
}
async function getDatamuseSuggestions(word) {
    try {
        // Get suggestions based on spelling and sound
        const [spellingResults, soundResults] = await Promise.all([
            fetch(`${DATAMUSE_API_URL}?sp=${word}&max=3`).then(r => r.json()),
            fetch(`${DATAMUSE_API_URL}?sl=${word}&max=3`).then(r => r.json())
        ]);
        const suggestions = [...spellingResults, ...soundResults]
            .map((result) => result.word)
            .filter(Boolean);
        return Array.from(new Set(suggestions));
    }
    catch (error) {
        console.error('Error getting Datamuse suggestions:', error);
        return [];
    }
}
async function getSoundAlikeSuggestions(word) {
    try {
        // Get suggestions based on how the word sounds
        const response = await fetch(`${DATAMUSE_API_URL}?rel=syn&ml=${word}&max=3`);
        const data = await response.json();
        return data.map(item => item.word);
    }
    catch (error) {
        console.error('Error getting sound-alike suggestions:', error);
        return [];
    }
}
function getProfanityAlternatives(word) {
    // Check if the word might be an attempt at profanity
    const profanityList = profanity;
    // Convert to lowercase for comparison
    const lowercaseWord = word.toLowerCase();
    // Check for similar profanity patterns
    for (const [badWord, alternatives] of Object.entries(profanityList)) {
        if (isSimularToProfanity(lowercaseWord, badWord)) {
            return Promise.resolve(alternatives);
        }
    }
    return Promise.resolve([]);
}
function isSimularToProfanity(input, profanity) {
    // Remove vowels and repeated characters for comparison
    const normalize = (str) => str.replace(/[aeiou]/g, '')
        .replace(/(.)\1+/g, '$1');
    const normalizedInput = normalize(input);
    const normalizedProfanity = normalize(profanity);
    // Check if normalized versions are similar
    return normalizedInput === normalizedProfanity ||
        normalizedProfanity.includes(normalizedInput) ||
        normalizedInput.includes(normalizedProfanity);
}
export function getWordAtPosition(text, position) {
    const beforeCursor = text.slice(0, position);
    const afterCursor = text.slice(position);
    const beforeMatch = beforeCursor.match(/\w+$/);
    const afterMatch = afterCursor.match(/^\w+/);
    if (!beforeMatch && !afterMatch)
        return null;
    const start = beforeMatch ? position - beforeMatch[0].length : position;
    const end = afterMatch ? position + afterMatch[0].length : position;
    const word = text.slice(start, end);
    return { word, start, end };
}
