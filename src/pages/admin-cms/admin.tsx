import React, { useState, useEffect } from 'react';
import {
  Star, DollarSign, Users, Smile, Search, Bell, User, BarChart, PieChart,
  ListChecks, Plus, Trash2, TrendingUp, TrendingDown,
  Activity, Zap, LayoutDashboard, Settings
} from 'lucide-react';
import { Page } from '../../types';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

// --- CONFIGURATION DE BASE ET DONNÉES SIMULÉES ---

// Définition des types TypeScript
type Stat = {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
};

type ActivityLog = {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  status: 'Succès' | 'Alerte' | 'Nouveau';
};

type QuickAction = {
  icon: React.ElementType;
  label: string;
  color: string; // Tailwind class like 'bg-green-500'
  description: string;
};

// Données simulées
const statData: Stat[] = [
  { icon: Star, title: 'Stars Actives', value: '4,521', trend: '+12.5%', trendType: 'positive' },
  { icon: DollarSign, title: 'Revenus Annuels', value: '1.2M €', trend: '+4.8%', trendType: 'positive' },
  { icon: Users, title: 'Utilisateurs Clients', value: '12,987', trend: '-1.1%', trendType: 'negative' },
  { icon: Smile, title: 'Satisfaction Moyenne', value: '4.7/5', trend: 'Stable', trendType: 'neutral' },
];

const activityData: ActivityLog[] = [
  { id: 1, action: 'Nouveau compte Star : Léa Dupont', user: 'Admin 001', timestamp: 'Il y a 5 min', status: 'Nouveau' },
  { id: 2, action: 'Mise à jour du contrat #923', user: 'Auto-système', timestamp: 'Il y a 30 min', status: 'Succès' },
  { id: 3, action: 'Tentative de connexion échouée', user: 'Utilisateur X', timestamp: 'Il y a 1h', status: 'Alerte' },
  { id: 4, action: 'Suppression du compte : Marc Smith', user: 'Admin 005', timestamp: 'Il y a 2h', status: 'Succès' },
  { id: 5, action: 'Nouvelle fonctionnalité déployée (v2.1)', user: 'DevOps', timestamp: 'Il y a 1 jour', status: 'Succès' },
];

const quickActions: QuickAction[] = [
  { icon: Plus, label: 'Ajouter une Star', color: 'bg-green-500', description: 'Créer un nouveau profil influenceur.' },
  { icon: ListChecks, label: 'Gérer les Contrats', color: 'bg-yellow-500', description: 'Vérifier et valider les accords.' },
  { icon: Settings, label: 'Paramètres Plateforme', color: 'bg-blue-500', description: 'Accéder aux configurations globales.' },
  { icon: Trash2, label: 'Purger les Logs', color: 'bg-red-500', description: 'Archiver les anciennes données système.' },
];

// --- COMPOSANTS RÉUTILISABLES ---

/**
 * Composant de carte de statistiques avec le style visuel spécifié.
 * @param stat Les données de la carte.
 */
const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const { icon: Icon, title, value, trend, trendType } = stat;

  const trendClasses =
    trendType === 'positive'
      ? 'text-green-600 bg-green-50'
      : trendType === 'negative'
      ? 'text-red-600 bg-red-50'
      : 'text-slate-500 bg-slate-50';

  return (
    <div
      className="group relative bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm
                 hover:shadow-xl hover:shadow-primary-600/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden
                 focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2"
    >
      {/* Accent visuel en coin */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

      <div className="relative z-10">
        {/* Icône stylisée */}
        <div
          className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm
                     text-primary-600 flex items-center justify-center mb-4 md:mb-6
                     group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300"
        >
          <Icon size={24} className="group-hover:rotate-12 transition-transform" />
        </div>

        <p className="text-sm font-semibold text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{value}</h3>

        {/* Badge de tendance */}
        <div className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${trendClasses}`}>
          {trendType === 'positive' && <TrendingUp size={14} className="mr-1" />}
          {trendType === 'negative' && <TrendingDown size={14} className="mr-1" />}
          {trend}
        </div>
      </div>
    </div>
  );
};

/**
 * Composant pour les boutons d'actions rapides.
 * @param action Les données de l'action.
 */
const QuickActionButton: React.FC<{ action: QuickAction }> = ({ action }) => {
  const { icon: Icon, label, color, description } = action;

  return (
    <button
      className="group flex flex-col md:flex-row items-start md:items-center justify-between
                 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm w-full text-left
                 hover:shadow-lg hover:border-primary-600 transition-all duration-300
                 focus:outline-none focus:ring-4 focus:ring-primary-600/30"
    >
      <div className="flex items-center">
        <div
          className={`p-3 rounded-xl text-white ${color} shadow-lg shadow-black/10 mr-4
                      group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">{label}</h4>
          <p className="text-sm text-slate-500 mt-1 hidden sm:block">{description}</p>
        </div>
      </div>
      <span className="text-primary-600 font-semibold text-sm mt-3 md:mt-0 md:ml-4 flex-shrink-0">
        Exécuter &rarr;
      </span>
    </button>
  );
};

// --- STRUCTURE DU DASHBOARD ---

/**
 * Section 1 - En-tête du Dashboard
 */
const DashboardHeader: React.FC = () => (
  <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
    <div className="mb-4 lg:mb-0">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 inline-block">
        <span
          className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-600"
          aria-label="Dashboard Admin"
        >
          Dashboard Admin
        </span>
      </h1>
      <span className="ml-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 border border-primary-200 shadow-sm">
        Administrateur
      </span>
    </div>

    <div className="flex items-center space-x-4 w-full lg:w-auto">
      {/* Barre de recherche */}
      <div className="relative flex-grow lg:flex-grow-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="search"
          placeholder="Rechercher une star, un contrat..."
          className="w-full lg:w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-900
                     focus:border-primary-600 focus:ring-1 focus:ring-primary-600 transition duration-150 shadow-sm"
        />
      </div>

      {/* Notifications */}
      <button
        className="p-2 rounded-full bg-white text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition duration-150
                   relative focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
        aria-label="Notifications"
      >
        <Bell size={24} />
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
      </button>

      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm
                   cursor-pointer shadow-md hover:ring-2 hover:ring-primary-600 hover:ring-offset-2 transition duration-150"
      >
        <User size={20} />
      </div>
    </div>
  </header>
);

/**
 * Section 3 - Tableau des dernières activités
 */
const LastActivities: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-slate-900 flex items-center">
        <Activity size={24} className="mr-2 text-primary-600" />
        Dernières Activités
      </h2>
      <a href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors">
        Voir tout &rarr;
      </a>
    </div>
    <div className="space-y-2">
      {activityData.map((activity) => {
        let statusClasses = '';
        if (activity.status === 'Succès') {
          statusClasses = 'bg-green-50 text-green-700 border-green-200';
        } else if (activity.status === 'Alerte') {
          statusClasses = 'bg-red-50 text-red-700 border-red-200';
        } else {
          statusClasses = 'bg-primary-50 text-primary-600 border-primary-200';
        }

        return (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 rounded-xl transition-all duration-200
                       hover:bg-primary-50 hover:shadow-md border border-white hover:border-slate-100 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center min-w-0">
              <span className="text-sm font-medium text-slate-900 truncate flex-grow mr-4">
                {activity.action}
              </span>
              <span className="text-xs text-slate-400 mt-1 md:mt-0 flex-shrink-0">
                {activity.timestamp}
              </span>
            </div>
            <span className="hidden sm:inline-block ml-4 px-3 py-1 text-xs font-semibold rounded-full border flex-shrink-0 min-w-[70px] text-center">
              <span className={statusClasses}>{activity.status}</span>
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/**
 * Composant de placeholder pour les graphiques.
 * @param title Le titre du graphique.
 * @param Icon L'icône représentative.
 */
const ChartPlaceholder: React.FC<{ title: string; Icon: React.ElementType }> = ({ title, Icon }) => (
  <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
      <Icon size={24} className="mr-2 text-primary-600" />
      {title}
    </h2>
    <div className="h-48 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
      <p className="text-slate-500 text-center leading-relaxed">
        [Placeholder graphique] Données non chargées<br />
        (Nécessite une librairie externe comme Recharts)
      </p>
    </div>
  </div>
);

/**
 * Section 6 - Éléments spéciaux / Statistiques globales (fond sombre)
 */
const GlobalStats: React.FC = () => (
  <div className="relative bg-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
    {/* Cercles floutés en arrière-plan */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="w-64 h-64 bg-primary-600 opacity-20 rounded-full blur-3xl absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-80 h-80 bg-indigo-600 opacity-10 rounded-full blur-3xl absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>
    </div>

    <div className="relative z-10 text-white">
      <div className="flex items-center mb-6">
        <Zap size={30} className="text-primary-400 mr-3" />
        <h2 className="text-2xl md:text-3xl font-extrabold">
          Synthèse Globale de la Plateforme
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { label: 'Taux de commission', value: '15%', detail: 'Optimisé' },
          { label: 'Volume de transactions', value: '500k', detail: 'Ce mois-ci' },
          { label: 'Stars en attente', value: '25', detail: 'À valider' },
          { label: 'Moy. de réponse Star', value: '1.2h', detail: 'Très rapide' },
        ].map((item, index) => (
          <div key={index} className="bg-slate-800/70 p-5 rounded-xl border border-slate-700 shadow-lg transition-all duration-300 hover:bg-slate-700/80">
            <p className="text-slate-400 text-sm mb-1">{item.label}</p>
            <p className="text-3xl font-bold text-white">{item.value}</p>
            <p className="text-primary-300 text-sm mt-2">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Composant principal de l'application Dashboard.
 */
const AdminCMS: React.FC<DashboardProps> = () => {
  // Configuration pour le font "Inter" via Tailwind
  // Le chargement du font est implicite dans cet environnement
  useEffect(() => {
    document.body.classList.add('font-sans', 'antialiased');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: En-tête */}
        <DashboardHeader />

        {/* Section 6: Statistiques globales (Section sombre) */}
        <div className="mb-10">
          <GlobalStats />
        </div>

        {/* Section 2: Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statData.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Colonne principale (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 3: Tableau des dernières activités */}
            <LastActivities />

            {/* Section 4: Graphiques de performance (Placeholders) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartPlaceholder title="Évolution des Inscriptions" Icon={BarChart} />
              <ChartPlaceholder title="Répartition par Catégorie" Icon={PieChart} />
            </div>
          </div>

          {/* Colonne latérale (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Section 5: Actions rapides */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <LayoutDashboard size={24} className="mr-2 text-primary-600" />
                Actions Rapides
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <QuickActionButton key={index} action={action} />
                ))}
              </div>
            </div>

            {/* Carte d'information secondaire avec accent visuel */}
            <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm overflow-hidden">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-50/50 rounded-tr-[100px] -ml-10 -mb-10 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">Support et Documentation</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                        Accédez aux guides d'utilisation et contactez l'équipe de support technique pour toute assistance urgente.
                    </p>
                    <button className="mt-4 text-primary-600 font-semibold text-sm hover:text-primary-800 transition-colors">
                        Ouvrir le Centre d'Aide &rarr;
                    </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
