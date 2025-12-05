import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  MessageCircle, 
  ChevronLeft, 
  MoreHorizontal,
  TrendingUp,
  Calendar,
  User,
  CheckCircle,
  BarChart3,
  Eye,
  DollarSign,
  Shield
} from 'lucide-react';

// --- DONNÉES DE DÉMONSTRATION (MOCK DATA) ---

const MOCK_SUBSCRIBERS = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", status: "Premium", date: "2023-10-26", revenue: "$245" },
  { id: 2, name: "Marie Curie", email: "marie.curie@example.com", status: "Standard", date: "2023-10-25", revenue: "$99" },
  { id: 3, name: "Pierre Martin", email: "pierre.martin@example.com", status: "Standard", date: "2023-10-24", revenue: "$99" },
  { id: 4, name: "Sophie Lambert", email: "sophie.lambert@example.com", status: "Premium", date: "2023-10-23", revenue: "$245" },
  { id: 5, name: "Lucas Dubois", email: "lucas.dubois@example.com", status: "Standard", date: "2023-10-22", revenue: "$99" },
];

const MOCK_PUBLICATIONS = [
  { 
    id: 1, 
    title: "L'avenir du design UI/UX", 
    author: "Marie Curie", 
    role: "Éditrice de contenu",
    date: "15 Août 2023", 
    category: "Design", 
    likes: 1287, 
    commentsCount: 3,
    views: "12.5K",
    status: "Publié",
    content: "Dans un monde de plus en plus numérique, l'importance d'une expérience utilisateur (UX) et d'une interface utilisateur (UI) bien conçues ne peut être surestimée...",
    comments: [
      { id: 101, user: "Léa Martin", time: "il y a 2 heures", text: "Excellent article ! La partie sur l'accessibilité est particulièrement pertinente." },
      { id: 102, user: "Marc Dubois", time: "il y a 5 heures", text: "Merci pour ce résumé des tendances. Curieux de voir l'impact de l'IA." },
      { id: 103, user: "Chloé Petit", time: "il y a 1 jour", text: "Très instructif. J'aurais aimé un peu plus de détails sur le prototypage." }
    ]
  },
  { 
    id: 2, 
    title: "Comment optimiser le SEO en 2024", 
    author: "Alice Martin", 
    role: "SEO Specialist",
    date: "15/07/2024", 
    category: "Marketing", 
    likes: 1200, 
    commentsCount: 89,
    views: "15.2K",
    status: "Publié",
    content: "Le SEO change rapidement. Voici les piliers fondamentaux pour l'année à venir...",
    comments: []
  },
  { 
    id: 3, 
    title: "Introduction à l'intelligence artificielle", 
    author: "David Moreau", 
    role: "Tech Lead",
    date: "05/07/2024", 
    category: "Tech", 
    likes: 3100, 
    commentsCount: 230,
    views: "45.8K",
    status: "Publié",
    content: "L'IA n'est plus de la science-fiction. Elle est partout dans nos outils quotidiens...",
    comments: []
  },
];

// --- COMPOSANTS UI ---

const Badge = ({ type }) => {
  const styles = type === 'Premium' 
    ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
    : "bg-blue-50 text-blue-700 border-blue-200";
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles}`}>
      {type}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = status === 'Publié' 
    ? "bg-emerald-100 text-emerald-700" 
    : "bg-amber-100 text-amber-700";
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

const Card = ({ title, value, change, subtitle, icon: Icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <div className="h-10 w-10 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
        <TrendingUp size={14} /> {change}
      </span>
      {subtitle && <span className="text-slate-400 ml-2">{subtitle}</span>}
    </div>
  </div>
);

// --- COMPOSANT PRINCIPAL ---

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPost, setSelectedPost] = useState(null);
  const [subscriberFilter, setSubscriberFilter] = useState('Tous');

  // Actions de navigation
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('publication_detail');
  };

  const handleCreateClick = () => {
    setCurrentView('create_publication');
  };

  // --- VUES DU DASHBOARD ---

  const renderDashboardHome = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Tableau de bord Admin</h1>
          <p className="text-slate-500">Gérez votre plateforme, vos abonnés et vos publications.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            <Calendar className="w-4 h-4 inline mr-2" />
            Aujourd'hui
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Total Abonnés" 
          value="1,234" 
          change="+5.2%" 
          subtitle="depuis le mois dernier"
          icon={Users}
        />
        <Card 
          title="Abonnés Premium" 
          value="150" 
          change="+2.1%" 
          subtitle="croissance stable"
          icon={Shield}
        />
        <Card 
          title="Total Publications" 
          value="56" 
          change="+10" 
          subtitle="ce mois"
          icon={FileText}
        />
        <Card 
          title="Revenus Totaux" 
          value="$12,456" 
          change="+15%" 
          subtitle="ce trimestre"
          icon={DollarSign}
        />
      </div>

      {/* Actions & Graph Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Évolution des Abonnements</h3>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-primary-600 hover:text-primary-700">Mensuel</button>
              <button className="text-sm text-slate-500 hover:text-slate-700">Annuel</button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-slate-50 to-primary-50/30 rounded-xl flex items-center justify-center border border-slate-200">
            {/* Graphique simulé */}
            <div className="w-full h-full p-4 flex items-end justify-between gap-2">
              {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75, 60, 95].map((h, i) => (
                <div 
                  key={i} 
                  className="w-full bg-gradient-to-t from-primary-500 to-primary-600 opacity-80 rounded-t-lg hover:opacity-100 transition-opacity" 
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <button 
                onClick={handleCreateClick}
                className="w-full bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
              >
                <Plus size={18} /> Créer une publication
              </button>
              <button 
                onClick={() => setCurrentView('subscribers')}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Users size={18} /> Voir tous les abonnés
              </button>
              <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <BarChart3 size={18} /> Générer un rapport
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Dernières Publications</h3>
            <div className="space-y-4">
              {MOCK_PUBLICATIONS.slice(0, 3).map(pub => (
                <div 
                  key={pub.id} 
                  className="cursor-pointer group p-3 hover:bg-slate-50 rounded-lg transition-colors"
                  onClick={() => handlePostClick(pub)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">{pub.title}</h4>
                    <span className="text-xs text-primary-500 font-medium whitespace-nowrap ml-2">Voir →</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <Eye className="w-3 h-3 mr-1" /> {pub.views} vues
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscribers = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Gestion des abonnés</h1>
          <p className="text-slate-500">Gérez les abonnés, leurs abonnements et autorisations.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow font-medium">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un abonné
        </button>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher par nom ou email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['Tous', 'Standard', 'Premium'].map(type => (
            <button 
              key={type}
              onClick={() => setSubscriberFilter(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                subscriberFilter === type 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Nom</th>
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Statut</th>
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenu</th>
                <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_SUBSCRIBERS.filter(s => subscriberFilter === 'Tous' || s.status === subscriberFilter).map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-slate-900">{sub.name}</td>
                  <td className="p-4 text-sm text-slate-600">{sub.email}</td>
                  <td className="p-4"><Badge type={sub.status} /></td>
                  <td className="p-4 text-sm text-slate-500">{sub.date}</td>
                  <td className="p-4 text-sm font-bold text-slate-900">{sub.revenue}</td>
                  <td className="p-4 text-right">
                    <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">Voir profil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
          <span>Affichage de 1 à 5 sur 150 résultats</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50">Précédent</button>
            <button className="px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPublications = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Gestion des publications</h1>
          <p className="text-slate-500">Créez, modifiez et gérez vos publications.</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Créer une publication
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher par titre..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500">
              <option>Catégorie: Toutes</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Tech</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500">
              <option>Date: Récents</option>
              <option>Anciens</option>
            </select>
          </div>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {MOCK_PUBLICATIONS.map((pub) => (
          <div 
            key={pub.id} 
            onClick={() => handlePostClick(pub)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium">{pub.category}</span>
                <span className="text-slate-400 text-xs">{pub.date}</span>
                <StatusBadge status={pub.status} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{pub.title}</h3>
              <p className="text-sm text-slate-500 mt-1">Par {pub.author} • {pub.role}</p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Heart size={16} className="text-red-500" />
                <span className="font-medium">{(pub.likes / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle size={16} className="text-primary-500" />
                <span className="font-medium">{pub.commentsCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} className="text-slate-500" />
                <span className="font-medium">{pub.views}</span>
              </div>
              <button className="text-primary-600 font-medium text-sm hover:underline">Détails →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPublicationDetails = () => {
    if (!selectedPost) return null;
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <button 
             onClick={() => setCurrentView('publications')}
             className="flex items-center text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft size={20} />
            <span className="ml-1 font-medium">Retour aux publications</span>
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Modifier</button>
            <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100">Supprimer</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedPost.title}</h1>
               <p className="text-slate-500 text-sm mb-6">Publié le {selectedPost.date}</p>
               
               {/* Image Placeholder */}
               <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-8 text-primary-800/40 text-4xl font-serif tracking-widest">
                  IMAGE
               </div>

               <div className="prose max-w-none text-slate-700 leading-relaxed">
                 <p>{selectedPost.content}</p>
                 <p className="mt-4">L'UX se concentre sur le parcours global de l'utilisateur, en s'assurant que le produit est logique. L'UI, quant à elle, concerne l'aspect visuel. Ensemble, ils créent une expérience.</p>
                 <p className="mt-4 font-semibold">Tendances actuelles :</p>
                 <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Minimalisme épuré</li>
                    <li>Micro-interactions</li>
                    <li>Mode sombre standardisé</li>
                 </ul>
               </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Commentaires ({selectedPost.commentsCount})</h3>
              <div className="space-y-6">
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                  selectedPost.comments.map(comment => (
                    <div key={comment.id} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500">
                         <User size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-slate-900">{comment.user}</h4>
                          <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">{comment.time}</p>
                        <p className="text-slate-700 text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 italic">Aucun commentaire pour le moment.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
             {/* Stats Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Statistiques</h3>
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl flex items-center gap-4">
                  <div className="bg-white p-3 rounded-full text-primary-600 shadow-sm">
                    <Heart size={24} />
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-slate-900">{selectedPost.likes}</span>
                    <span className="text-sm text-primary-600">Likes au total</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900">{selectedPost.commentsCount}</div>
                    <div className="text-xs text-slate-500">Commentaires</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="text-lg font-bold text-slate-900">{selectedPost.views}</div>
                    <div className="text-xs text-slate-500">Vues</div>
                  </div>
                </div>
             </div>

             {/* Author Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Auteur</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{selectedPost.author}</p>
                    <p className="text-sm text-slate-500">{selectedPost.role}</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCreatePublication = () => (
    <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
             onClick={() => setCurrentView('publications')}
             className="mr-4 text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold text-slate-900">Nouvelle Publication</h2>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la publication</label>
              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Ex: Les tendances UI 2024" />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none">
                  <option>Design</option>
                  <option>Tech</option>
                  <option>Lifestyle</option>
                </select>
               </div>
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date de publication</label>
                <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
               </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contenu</label>
              <textarea rows={10} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Écrivez votre article ici..."></textarea>
            </div>

            <div className="flex justify-end pt-4 gap-3">
              <button 
                onClick={() => setCurrentView('publications')}
                className="px-6 py-2.5 text-slate-700 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                   setCurrentView('publications');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all"
              >
                Publier l'article
              </button>
            </div>
        </div>
    </div>
  );

  // --- LAYOUT PRINCIPAL ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50/20 flex font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 left-0 top-0">
        <div className="p-6 h-16 flex items-center border-b border-slate-100">
          <div className="flex items-center gap-2 text-primary-600">
            <div className="bg-gradient-to-br from-primary-600 to-indigo-600 text-white p-2 rounded-lg">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-bold text-lg">AdminPanel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentView === 'dashboard' 
              ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600 border border-primary-200' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard size={20} /> Tableau de bord
          </button>
          
          <button 
            onClick={() => setCurrentView('subscribers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentView === 'subscribers' 
              ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600 border border-primary-200' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Users size={20} /> Abonnés
          </button>
          
          <button 
            onClick={() => setCurrentView('publications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              currentView.includes('publication') 
              ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-600 border border-primary-200' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FileText size={20} /> Publications
          </button>
        </nav>

        {/* LOGOUT BUTTON AT THE BOTTOM */}
        <div className="p-4 border-t border-slate-100 mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={20} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
            {/* SITE NAME */}
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Portail Administrateur</h1>
            
            {/* ADMIN INFO */}
            <div className="flex items-center gap-6">
                <button className="relative text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full border-2 border-white flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-900 leading-none">Admin User</p>
                        <p className="text-xs text-slate-500 mt-1">Super Administrateur</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-indigo-600 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-white font-bold">
                       A
                    </div>
                </div>
            </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 p-8">
           {currentView === 'dashboard' && renderDashboardHome()}
           {currentView === 'subscribers' && renderSubscribers()}
           {currentView === 'publications' && renderPublications()}
           {currentView === 'publication_detail' && renderPublicationDetails()}
           {currentView === 'create_publication' && renderCreatePublication()}
        </main>

      </div>
    </div>
  );
}
