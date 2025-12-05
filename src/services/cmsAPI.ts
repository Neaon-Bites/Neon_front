import axios, { AxiosInstance } from 'axios';
import { SiteConfig } from '../types/index';

const API_BASE_URL = 'http://localhost:8000';

class CmsAPIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api/cms`,
      headers: {
        'Content-Type': 'application/json',
      },
      // 🔥 IMPORTANT: Désactiver withCredentials en développement
      withCredentials: false,
    });

    // Interceptor pour les erreurs
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          window.location.href = '/signin';
        }
        throw error;
      }
    );
  }

  async getConfig(): Promise<SiteConfig> {
    try {
      const response = await this.client.get('/site-config/');
      return response.data.config;
    } catch (error) {
      console.error('Erreur getConfig:', error);
      throw new Error('Impossible de charger la configuration du site');
    }
  }

  async updateConfig(config: SiteConfig): Promise<void> {
    try {
      await this.client.post('/site-config/', { config });
    } catch (error) {
      console.error('Erreur updateConfig:', error);
      throw new Error('Impossible de mettre à jour la configuration');
    }
  }

  async publish(config: SiteConfig): Promise<{ url: string; files: object; published_at: string }> {
    try {
      await this.updateConfig(config);
      const response = await this.client.post('/publish/');
      return response.data;
    } catch (error) {
      console.error('Erreur publish:', error);
      throw new Error('Impossible de publier le site');
    }
  }

  async export(): Promise<void> {
    try {
      const response = await this.client.get('/export/', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'site.zip');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur export:', error);
      throw new Error('Impossible d\'exporter le site');
    }
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await this.client.post('/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.url;
    } catch (error) {
      console.error('Erreur uploadImage:', error);
      throw new Error('Impossible d\'uploader l\'image');
    }
  }
}

export const cmsAPI = new CmsAPIService();