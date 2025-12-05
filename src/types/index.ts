export type Page = 'home' | 'signin' | 'signup' | 'cms' | 'admin' | 'dashboard';

export type PageType = 'home' | 'about' | 'contact' | 'custom' | 'crisis';
export type SectionType = 'hero' | 'text' | 'image' | 'products' | 'form';

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string | null;
}

export interface SectionConfig {
  id: string;
  type: SectionType;
  content: any;
}

export interface PageConfig {
  id: string;
  name: string;
  type: PageType;
  sections: SectionConfig[];
  isHidden?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: Array<{
    label: string;
    url: string;
  }>;
}

export interface Footer {
  columns: FooterColumn[];
  copyright: string;
  socialLinks: SocialLink[];
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export interface SiteConfig {
  siteName: string;
  tagline?: string;
  logo: string | null;
  theme: Theme;
  pages: PageConfig[];
  navigation: NavigationItem[];
  footer: Footer;
  crisisMode?: {
    enabled: boolean;
    title: string;
    message: string;
  };
}