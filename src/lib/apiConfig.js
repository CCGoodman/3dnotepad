// src/lib/apiConfig.ts
const API_KEY_STORAGE_KEY = 'mistral-api-key';
const DEFAULT_API_KEY = 'rjNHj5pdpl8Bu9KwL5oMJSZljgIB4CNV';
export function getMistralApiKey() {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || DEFAULT_API_KEY;
}
export function setMistralApiKey(key) {
    if (key && key.trim()) {
        localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    }
}
