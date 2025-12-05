// src/hooks/useCMS.ts
import { useState, useCallback } from 'react';
import { SiteConfig } from '../types/index';
import { cmsAPI } from '../services/cmsAPI';

interface UseCMSReturn {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
  updateConfig: (config: SiteConfig) => Promise<void>;
  publishSite: () => Promise<{ url: string; files: object }>;
  exportSite: () => Promise<void>;
  loadConfig: () => Promise<void>;
}

// Configuration mock initiale (avec données de démonstration)
const defaultConfig: SiteConfig = {
  siteName: 'Mon Site Web',
  tagline: 'Créez votre site facilement',
  logo: '🚀',
  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    fontFamily: 'Inter',
  },
  pages: [
    {
      id: 'home',
      title: 'Accueil',
      slug: '/',
      sections: [
        {
          id: 'hero-1',
          type: 'hero',
          content: {
            title: 'Bienvenue sur votre site',
            subtitle: 'Personnalisez ce contenu selon vos besoins',
            ctaText: 'Commencer',
            ctaLink: '#',
            backgroundImage: '',
          },
        },
      ],
    },
  ],
  navigation: [
    { label: 'Accueil', url: '/', type: 'internal' },
  ],
  footer: {
    columns: [
      {
        title: 'À propos',
        links: [
          { label: 'Notre histoire', url: '/about' },
        ],
      },
    ],
    copyright: '© 2024 Mon Site Web. Tous droits réservés.',
    socialLinks: [],
  },
  crisisMode: {
    enabled: false,
    title: '',
    message: '',
  },
};
export const useCMS = (): UseCMSReturn => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger la config depuis l'API (optionnel, appelé manuellement si besoin)
  const loadConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cmsAPI.getConfig();
      setConfig(data);
    } catch (err) {
      console.warn('Impossible de charger la config, utilisation de la config par défaut');
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      // On garde la config par défaut en cas d'erreur
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour la config
  const updateConfig = useCallback(async (newConfig: SiteConfig) => {
    try {
      setLoading(true);
      setConfig(newConfig);
      await cmsAPI.updateConfig(newConfig);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de mise à jour');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Publier le site
  const publishSite = useCallback(async () => {
    try {
      setLoading(true);
      if (!config) throw new Error('Configuration non définie');
      const result = await cmsAPI.publish(config);
      setError(null);
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur de publication';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [config]);

  // Exporter le site
  const exportSite = useCallback(async () => {
    try {
      setLoading(true);
      await cmsAPI.export();
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erreur d\'export';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    config,
    loading,
    error,
    updateConfig,
    publishSite,
    exportSite,
    loadConfig,
  };
};