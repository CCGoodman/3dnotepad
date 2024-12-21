import { useState, useCallback, useEffect } from 'react';
import { Tab } from '@/types/tab';
import { v4 as uuidv4 } from 'uuid';
import { saveTabsToStorage, loadTabsFromStorage } from '@/lib/storage';

export function useTabs(maxTabs: number = 8) {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saved = loadTabsFromStorage();
    return saved?.tabs || [{
      id: uuidv4(),
      title: 'Untitled',
      content: '',
      lastSaved: null
    }];
  });
  
  const [activeTabId, setActiveTabId] = useState<string>(() => {
    const saved = loadTabsFromStorage();
    return saved?.activeTabId || tabs[0].id;
  });

  // Save tabs whenever they change
  useEffect(() => {
    saveTabsToStorage(tabs, activeTabId);
  }, [tabs, activeTabId]);

  const createTab = useCallback(() => {
    if (tabs.length >= maxTabs) return;

    const newTab: Tab = {
      id: uuidv4(),
      title: 'Untitled',
      content: '',
      lastSaved: null
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, [tabs.length, maxTabs]);

  const closeTab = useCallback((id: string) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== id);
      if (newTabs.length === 0) {
        // Create a new tab if we're closing the last one
        const newTab = {
          id: uuidv4(),
          title: 'Untitled',
          content: '',
          lastSaved: null
        };
        return [newTab];
      }
      return newTabs;
    });

    // If we're closing the active tab, switch to the previous tab
    if (activeTabId === id) {
      setActiveTabId(prev => {
        const index = tabs.findIndex(tab => tab.id === prev);
        const newIndex = Math.max(0, index - 1);
        return tabs[newIndex]?.id || tabs[0].id;
      });
    }
  }, [activeTabId, tabs]);

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs(prev => prev.map(tab => 
      tab.id === id ? { ...tab, ...updates } : tab
    ));
  }, []);

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  return {
    tabs,
    activeTab,
    activeTabId,
    setActiveTabId,
    createTab,
    closeTab,
    updateTab
  };
}
