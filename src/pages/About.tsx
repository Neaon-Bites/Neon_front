import React from 'react';
import { Users, Target, Globe, Award, Zap, Code, Layout, TrendingUp } from 'lucide-react'; // Icônes mises à jour
import { Page } from '../types'; // Assurez-vous d'importer Page si nécessaire

// Remarque : Nous allons ajuster les icônes pour qu'elles correspondent à un service Web/SaaS

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            À Propos de <span className="text-primary-600">StarConnect</span> {/* NOM MIS À JOUR */}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Nous donnons aux créateurs et aux entreprises les outils pour construire, contrôler et développer leur présence numérique.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            // Icônes et labels mis à jour pour un service Web
            { icon: Users, value: "50K+", label: "Créateurs actifs" },
            { icon: Layout, value: "150+", label: "Templates uniques" },
            { icon: Globe, value: "1M+", label: "Sites hébergés" },
            { icon: TrendingUp, value: "+45%", label: "Croissance moyenne" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"> {/* Ajout d'une bordure */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Histoire & Mission */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Notre Histoire</h3>
            <p className="text-slate-600 mb-4">
              Fondée en 2020 par une équipe d'experts en UX et développement, StarConnect est née d'un constat : 
              les outils de création web étaient soit trop complexes, soit trop limités.
            </p>
            <p className="text-slate-600">
              Notre objectif est simple : offrir une plateforme sans code, puissante et intuitive, permettant à quiconque de lancer un site web professionnel et évolutif en quelques minutes.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Notre Mission</h3>
            <p className="text-slate-600 mb-4">
              Démocratiser la création de sites web en fournissant des outils de qualité professionnelle, garantissant la liberté de design et la propriété des données pour chaque utilisateur.
            </p>
            <ul className="space-y-3">
              {[
                <span className='font-semibold'>Design sans compromis</span>, 
                <span className='font-semibold'>Performance ultime</span>, 
                <span className='font-semibold'>Propriété de l'audience</span>, 
                <span className='font-semibold'>Évolutivité constante</span>
              ].map((item, idx) => (
                <li key={idx} className="flex items-center text-slate-600">
                  <Zap className="w-5 h-5 text-primary-600 mr-3" /> {/* Icône plus moderne */}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Équipe */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Rencontrez notre Équipe</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Morgan", role: "CEO & Fondateur", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
              { name: "Sarah Chen", role: "Directrice Technique", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786" },
              { name: "Marcus Lee", role: "Design Principal", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
              { name: "Priya Patel", role: "Chef de Produit", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f" },
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden 
                   border-4 border-white shadow-xl transition-all group-hover:shadow-2xl group-hover:scale-[1.05]"> {/* Effet au survol */}
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" // Effet monochrome
                  />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                <p className="text-primary-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;