import { Zap, ShieldCheck, BarChart3, Globe, Layers, Users } from 'lucide-react';
import { Feature, NavItem, Stat, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'À propos', href: '#about' },
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Témoignages', href: '#testimonials' },
];

export const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Vitesse Éclair',
    description: 'Nos serveurs optimisés garantissent un temps de chargement inférieur à 100ms pour vos utilisateurs.',
    icon: Zap,
  },
  {
    id: 2,
    title: 'Sécurité Maximale',
    description: 'Protection DDoS intégrée et certificats SSL automatiques pour garder vos données en sécurité.',
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: 'Analytique Intelligente',
    description: 'Tableaux de bord détaillés pour comprendre votre audience et améliorer votre conversion.',
    icon: BarChart3,
  },
  {
    id: 4,
    title: 'Déploiement Global',
    description: 'Déployez votre site sur plus de 35 zones de disponibilité à travers le monde en un clic.',
    icon: Globe,
  },
  {
    id: 5,
    title: 'Design Modulaire',
    description: 'Utilisez nos blocs pré-conçus ou créez les vôtres pour une flexibilité totale.',
    icon: Layers,
  },
  {
    id: 6,
    title: 'Collaboration en Direct',
    description: 'Invitez votre équipe et travaillez simultanément sur le même projet sans conflit.',
    icon: Users,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'CEO',
    company: 'TechStart',
    comment: "NovaWeb a transformé notre présence en ligne. La facilité d'utilisation est déconcertante, et le résultat est tout simplement professionnel. Je recommande vivement !",
    image: 'https://picsum.photos/seed/sophie/150/150',
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Freelance Designer',
    company: 'Studio Art',
    comment: "En tant que designer, je suis très exigeant sur le pixel-perfect. Cet outil me permet de garder le contrôle total tout en gagnant un temps précieux sur le développement.",
    image: 'https://picsum.photos/seed/thomas/150/150',
  },
  {
    id: 3,
    name: 'Amine El Idrissi',
    role: 'CTO',
    company: 'DataFlow',
    comment: "La gestion des performances et l'hébergement cloud sont top-notch. Nous n'avons jamais eu de temps d'arrêt depuis notre migration il y a 6 mois.",
    image: 'https://picsum.photos/seed/amine/150/150',
  },
  {
    id: 4,
    name: 'Julie Renault',
    role: 'Marketing Manager',
    company: 'GreenLife',
    comment: "Le tableau de bord analytique nous aide à prendre de meilleures décisions chaque jour. C'est bien plus qu'un simple créateur de site.",
    image: 'https://picsum.photos/seed/julie/150/150',
  },
];

export const STATS: Stat[] = [
  { id: 1, label: 'Utilisateurs Actifs', value: '50', suffix: 'k+' },
  { id: 2, label: 'Sites Créés', value: '120', suffix: 'k+' },
  { id: 3, label: 'Pays Couverts', value: '35', suffix: '' },
  { id: 4, label: 'Temps de Uptime', value: '99.99', suffix: '%' },
];