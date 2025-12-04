import React from 'react';
import { Layout, Palette, Zap, Download, Eye } from 'lucide-react';

const Templates: React.FC = () => {
  const templates = [
    {
      id: 1,
      name: "Dashboard Neon Pro",
      category: "Business",
      description: "Tableau de bord complet avec analytics et rapports",
      price: "$149",
      popular: true,
      features: ["Analytics", "Dark Mode", "API Intégrée", "Support 24/7"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      id: 2,
      name: "Portfolio Artistique",
      category: "Créatif",
      description: "Portfolio élégant pour artistes et designers",
      price: "$89",
      popular: false,
      features: ["Galerie", "Animations", "Responsive", "SEO Optimisé"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
      id: 3,
      name: "E-commerce Neon",
      category: "E-commerce",
      description: "Boutique en ligne avec paiement sécurisé",
      price: "$199",
      popular: true,
      features: ["Paiement", "Panier", "Admin Panel", "Analytics"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
    },
    {
      id: 4,
      name: "SAAS Modern",
      category: "SAAS",
      description: "Application SAAS avec abonnements",
      price: "$249",
      popular: false,
      features: ["Multi-tenant", "Facturation", "API", "Dashboard"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    {
      id: 5,
      name: "Blog Minimaliste",
      category: "Blog",
      description: "Blog moderne avec gestion de contenu",
      price: "$69",
      popular: true,
      features: ["CMS", "Commentaires", "SEO", "Newsletter"],
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
    },
    {
      id: 6,
      name: "Landing Page Startup",
      category: "Marketing",
      description: "Page de vente haute conversion",
      price: "$99",
      popular: false,
      features: ["A/B Testing", "Analytics", "Forms", "Integration"],
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
  ];

  return (
    <section id="templates" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-2xl mb-6">
            <Layout className="w-10 h-10" />
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Templates <span className="text-primary-600">Prêts à l'Emploi</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez nos templates professionnels conçus pour booster votre productivité. 
            Chaque template est entièrement personnalisable et responsive.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Tous', 'Business', 'Créatif', 'E-commerce', 'SAAS', 'Blog', 'Marketing'].map((cat) => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-full font-medium transition-all ${cat === 'Tous' ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
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
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Badge populaire */}
              {template.popular && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  POPULAIRE
                </div>
              )}

              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm mb-2">
                      {template.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{template.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">{template.price}</div>
                </div>

                <p className="text-slate-600 mb-4">{template.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex items-center text-slate-500 mb-2">
                    <Zap className="w-4 h-4 mr-2" />
                    <span className="text-sm">Fonctionnalités :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feat, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-700 rounded-full text-sm">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Prévisualiser
                  </button>
                  <button className="flex-1 border-2 border-primary-600 text-primary-600 py-3 rounded-lg font-medium hover:bg-primary-50 transition flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Besoin d'un template personnalisé ?</h3>
            <p className="text-xl mb-8 opacity-90">
              Notre équipe peut créer un template sur mesure pour vos besoins spécifiques.
            </p>
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition">
              Contactez notre équipe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Templates;
