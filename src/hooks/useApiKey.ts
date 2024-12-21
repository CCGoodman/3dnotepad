import { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'mistral-api-key';
const DEFAULT_API_KEY = 'rjNHj5pdpl8Bu9KwL5oMJSZljgIB4CNV';

export function useApiKey() {
  const [apiKey, setApiKey] = useState(() => 
    localStorage.getItem(API_KEY_STORAGE_KEY) || DEFAULT_API_KEY
  );

  useEffect(() => {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
  }, [apiKey]);

  return {
    apiKey,
    setApiKey,
    hasCustomKey: apiKey !== DEFAULT_API_KEY
  };
}