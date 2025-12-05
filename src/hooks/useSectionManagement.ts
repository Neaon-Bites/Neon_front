import { useCallback } from 'react';
import { SiteConfig, SectionType, SectionConfig } from '../types/index';

export const useSectionManagement = (config: SiteConfig, onConfigChange: (config: SiteConfig) => void) => {
  
  const addSection = useCallback((pageId: string, type: SectionType) => {
    let content: any = {};

    if (type === 'hero') {
      content = { title: 'Titre', subtitle: 'Sous-titre', bgImage: null };
    } else if (type === 'text') {
      content = { text: 'Nouveau texte' };
    } else if (type === 'image') {
      content = { src: null };
    } else if (type === 'products') {
      content = { products: [] };
    } else if (type === 'form') {
      content = {
        emailLabel: 'Email',
        messageLabel: 'Message',
        buttonText: 'Envoyer',
      };
    }

    const newSection: SectionConfig = {
      id: `sec-${Date.now()}`,
      type,
      content,
    };

    const updatedConfig = {
      ...config,
      pages: config.pages.map(p => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          sections: [...p.sections, newSection],
        };
      }),
    };

    onConfigChange(updatedConfig);
  }, [config, onConfigChange]);

  const removeSection = useCallback((pageId: string, sectionId: string) => {
    const updatedConfig = {
      ...config,
      pages: config.pages.map(p => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          sections: p.sections.filter(s => s.id !== sectionId),
        };
      }),
    };

    onConfigChange(updatedConfig);
  }, [config, onConfigChange]);

  const updateSectionContent = useCallback(
    (pageId: string, sectionId: string, newContent: any) => {
      const updatedConfig = {
        ...config,
        pages: config.pages.map(p => {
          if (p.id !== pageId) return p;
          return {
            ...p,
            sections: p.sections.map(s =>
              s.id === sectionId
                ? { ...s, content: { ...s.content, ...newContent } }
                : s
            ),
          };
        }),
      };

      onConfigChange(updatedConfig);
    },
    [config, onConfigChange]
  );

  return {
    addSection,
    removeSection,
    updateSectionContent,
  };
};