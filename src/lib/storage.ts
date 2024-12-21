// Add this to the existing storage.ts file

const CHAT_STORAGE_KEY = 'notepad-3d-chat';

export const STORAGE_KEY = 'notepad-3d-content';

export interface TabStorage {
  tabs: Tab[];
  activeTabId: string;
}

export function loadChatMessages() {
  return getFromLocalStorage(CHAT_STORAGE_KEY) || [];
}


export function saveToLocalStorage(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getFromLocalStorage(key: string) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function saveNotepadContent(content: string) {
  saveToLocalStorage(STORAGE_KEY, {
    content,
    lastSaved: new Date().toISOString()
  });
}

export function saveTabsToStorage(tabs: Tab[], activeTabId: string) {
  saveToLocalStorage('notepad-tabs', { tabs, activeTabId });
}

export function loadTabsFromStorage(): TabStorage | null {
  return getFromLocalStorage('notepad-tabs');
}

export function loadNotepadContent() {
  const savedTabs = getFromLocalStorage('notepad-tabs');
  if (savedTabs) {
    return savedTabs;
  }
  return {
    content: '',
    lastSaved: null
  };
}

const MAX_MESSAGES = 100; // Keep last 50 messages
const MAX_MESSAGE_SIZE = 100000; // ~100KB per message

export function saveChatMessages(messages: any[]) {
  try {
    // Keep only recent messages
    const recentMessages = messages.slice(-MAX_MESSAGES);
    
    // Trim large messages
    const trimmedMessages = recentMessages.map(msg => ({
      ...msg,
      content: msg.content.length > MAX_MESSAGE_SIZE 
        ? msg.content.slice(0, MAX_MESSAGE_SIZE) + '...(truncated)'
        : msg.content
    }));

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(trimmedMessages));
  } catch (error) {
    console.warn('Storage quota exceeded, clearing old messages');
    // Clear old messages if quota exceeded
    localStorage.removeItem(CHAT_STORAGE_KEY);
    // Try saving again with just the latest message
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([messages[messages.length - 1]]));
    }
  }
}