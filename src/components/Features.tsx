import React from 'react';
import { FEATURES, STATS } from '../Constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
                <span className="text-primary-600 font-bold tracking-wider uppercase text-sm bg-primary-50 px-3 py-1 rounded-full">Pourquoi nous choisir ?</span>
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                    Des templates prêts à l'emploi pour <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">chaque vision</span>
                </h2>
            </div>
            <a href="#" className="hidden md:flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors">
                Voir toutes les fonctionnalités
                <span className="ml-2 text-xl">→</span>
            </a>
        </div>

        {/* Feature Cards Grid (styled like templates in mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.id} 
                className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                
                <div className="relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Icon size={26} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                    {feature.description}
                    </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section Integrated */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-md text-center lg:text-left">
                    <h3 className="text-2xl font-bold mb-4">L'impact de NovaWeb en chiffres</h3>
                    <p className="text-slate-400">
                        Nous sommes fiers d'accompagner la croissance de milliers d'entreprises à travers le monde.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto">
                    {STATS.map((stat) => (
                        <div key={stat.id} className="text-center lg:text-left">
                            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                                {stat.value}<span className="text-primary-400 text-2xl">{stat.suffix}</span>
                            </div>
                            <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Features;