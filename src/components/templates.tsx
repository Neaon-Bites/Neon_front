import React from 'react';
import { Layout, Zap, Download, Eye, Star } from 'lucide-react';
import { Page } from '../types';

interface TemplatesProps {
  onNavigate: (page: Page) => void;
}

const Templates: React.FC<TemplatesProps> = ({ onNavigate }) => {
  const templates = [
    {
      id: 1,
      name: "Dashboard StarConnect", 
      category: "Business",
      description: "Tableau de bord complet avec analytics et rapports pour votre projet.",
      price: "90 000 XAF", 
      popular: true,
      features: ["Analytics", "Dark Mode", "API Intégrée", "Support 24/7"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      id: 2,
      name: "Portfolio Créatif",
      category: "Créatif",
      description: "Portfolio élégant pour artistes et designers. Facile à personnaliser.",
      price: "53 000 XAF", 
      popular: false,
      features: ["Galerie", "Animations", "Responsive", "SEO Optimisé"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
      id: 3,
      name: "E-commerce Pro",
      category: "E-commerce",
      description: "Boutique en ligne complète avec paiement sécurisé Stripe/Paypal.",
      price: "120 000 XAF", 
      popular: true,
      features: ["Paiement", "Panier", "Admin Panel", "Analytics"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
    },
    {
      id: 4,
      name: "Application SaaS",
      category: "SAAS",
      description: "Structure d'application SAAS avec gestion d'abonnements et facturation.",
      price: "150 000 XAF", 
      popular: false,
      features: ["Multi-tenant", "Facturation", "API", "Dashboard"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    {
      id: 5,
      name: "Blog Minimaliste",
      category: "Blog",
      description: "Un blog moderne et rapide avec un puissant système de gestion de contenu.",
      price: "41 000 XAF", 
      popular: true,
      features: ["CMS", "Commentaires", "SEO", "Newsletter"],
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
    },
    {
      id: 6,
      name: "Landing Page Startup",
      category: "Marketing",
      description: "Page de vente axée sur la conversion pour lancer votre produit rapidement.",
      price: "59 000 XAF", 
      popular: false,
      features: ["A/B Testing", "Analytics", "Forms", "Integration"],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
  ];
  const categories = ['Tous', 'Business', 'Créatif', 'E-commerce', 'SAAS', 'Blog', 'Marketing'];
  
  return (
    <section id="templates" className="py-24 bg-gradient-to-b from-slate-50 to-white pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-full mb-6 shadow-xl">
            <Layout className="w-10 h-10" />
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Templates <span className="text-primary-600">Prêts à l'Emploi</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez nos templates professionnels conçus par des experts pour booster votre présence en ligne avec StarConnect.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${cat === 'Tous' 
                ? 'bg-primary-600 text-white hover:bg-primary-700' 
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-primary-50 hover:text-primary-600'}`
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille des templates */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col border border-slate-100"
            >

              {/* Image & Populaire Badge */}
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                 {template.popular && (
                    <span className="absolute top-3 right-3 flex items-center bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                        <Star className="w-3 h-3 mr-1 fill-white" /> Populaire
                    </span>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Contenu */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className='mb-4'>
                    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-semibold mb-3"> 
                      {template.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{template.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{template.description}</p>
                </div>
                

                {/* Features & Prix */}
                <div className="pt-4 border-t border-slate-100">
                   <div className="flex justify-between items-center mb-4">
                     <div className="text-xl font-extrabold text-slate-900">{template.price}</div>
                     <div className="flex items-center text-slate-500">
                        <Zap className="w-4 h-4 mr-1 text-primary-600" />
                        <span className="text-xs font-medium">{template.features.length} Fonctions</span>
                     </div>
                   </div>

                   {/* Boutons d'action */}
                   <div className="flex gap-3 mt-4">
                      <button className="flex-1 text-white bg-slate-900 py-3 rounded-xl font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-md text-sm">
                        <Eye className="w-4 h-4" />
                        Voir
                      </button>
                      <button 
                        onClick={() => onNavigate('signup')}
                        className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-md text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Obtenir 
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
            {/* Décoration d'arrière-plan */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Besoin d'une solution sur mesure ?</h3>
            <p className="text-lg md:text-xl mb-10 opacity-80 max-w-2xl mx-auto relative z-10">
              Notre équipe d'experts est là pour créer le site ou l'application web parfaitement adapté à vos ambitions.
            </p>
            <button 
                onClick={() => onNavigate('contact' as any)}
                className="bg-primary-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-600 transition shadow-lg hover:-translate-y-1 transform relative z-10"
            >
              Contactez notre équipe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Templates;