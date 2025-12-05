import { LucideIcon } from 'lucide-react';

export type Page = 'home' | 'signin' | 'signup' | 'dashboard'|'admin'|'userDashboard';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  comment: string;
  image: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Stat {
  id: number;
  label: string;
  value: string;
  suffix?: string;
}

export interface NavItem {
  label: string;
  href: string;
}