import { useCallback } from 'react';
import { SiteConfig, PageConfig, PageType } from '../types/index';

export const usePageManagement = (config: SiteConfig, onConfigChange: (config: SiteConfig) => void) => {
  
  const addPage = useCallback((name: string, type: PageType = 'custom') => {
    const newPage: PageConfig = {
      id: `page-${Date.now()}`,
      name,
      type,
      sections: [],
    };

    const updatedConfig = {
      ...config,
      pages: [...config.pages, newPage],
    };

    onConfigChange(updatedConfig);
  }, [config, onConfigChange]);

  const removePage = useCallback((pageId: string) => {
    const updatedConfig = {
      ...config,
      pages: config.pages.filter(p => p.id !== pageId),
    };

    onConfigChange(updatedConfig);
  }, [config, onConfigChange]);

  const updatePageName = useCallback((pageId: string, newName: string) => {
    const updatedConfig = {
      ...config,
      pages: config.pages.map(p =>
        p.id === pageId ? { ...p, name: newName } : p
      ),
    };

    onConfigChange(updatedConfig);
  }, [config, onConfigChange]);

  return {
    addPage,
    removePage,
    updatePageName,
  };
};
