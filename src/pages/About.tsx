import React from 'react';
import { Users, Target, Globe, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            À Propos de <span className="text-primary-600">NeonWorks</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Nous révolutionnons l'industrie avec des solutions néon innovantes depuis 2020.
            Notre mission est de rendre la technologie accessible à tous.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Users, value: "50K+", label: "Clients satisfaits" },
            { icon: Target, value: "150+", label: "Projets livrés" },
            { icon: Globe, value: "30+", label: "Pays desservis" },
            { icon: Award, value: "15+", label: "Prix d'excellence" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
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
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Notre Histoire</h3>
            <p className="text-slate-600 mb-4">
              Fondée en 2020 par une équipe de passionnés, NeonWorks est née d'une vision simple : 
              démocratiser la technologie néon pour les entreprises de toutes tailles.
            </p>
            <p className="text-slate-600">
              Depuis nos débuts modestes, nous avons grandi pour devenir un leader du secteur, 
              reconnu pour notre innovation et notre qualité exceptionnelle.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Notre Mission</h3>
            <p className="text-slate-600 mb-4">
              Fournir des solutions néon innovantes, durables et accessibles qui transforment 
              la façon dont les entreprises interagissent avec leurs clients.
            </p>
            <ul className="space-y-3">
              {['Innovation continue', 'Qualité premium', 'Support 24/7', 'Développement durable'].map((item, idx) => (
                <li key={idx} className="flex items-center text-slate-600">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Équipe */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Notre Équipe</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Morgan", role: "CEO & Fondateur", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
              { name: "Sarah Chen", role: "Directrice Technique", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786" },
              { name: "Marcus Lee", role: "Design Principal", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
              { name: "Priya Patel", role: "Chef de Projet", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f" },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
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
