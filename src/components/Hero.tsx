import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative 
      min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden 
      /* MODIFIÉ: Nouveau dégradé sombre (Bleu/Ardoise profond) */
      bg-gradient-to-br from-slate-900 via-indigo-950 to-gray-900">
      
      {/* Abstract Shapes/Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Glows ajustés pour être subtils sur le fond sombre, utilisant l'accent primaire/cyan */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[100px] mix-blend-screen"></div> 
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Créez votre site. <br/>
              {/* Le texte accentué devient text-primary-300 pour rester visible */}
              <span className="text-primary-300">Contrôlez votre audience.</span> <br/>
              Grandissez.
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
              StarConnect permet aux créateurs, organisations et entreprises de construire des sites web puissants en quelques minutes. Sans code.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center 
                /* MODIFIÉ: Bouton Principal utilise la couleur primaire pour le contraste */
                bg-primary-600 text-white hover:bg-primary-700 text-lg px-8 py-4 rounded-full font-bold transition-all 
                shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                Créer un site
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button className="w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-white/30 hover:bg-white/10 text-white text-lg px-8 py-4 rounded-full font-semibold transition-all backdrop-blur-sm">
                Voir les templates
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 font-medium">
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5 text-green-400" /> Pas de carte requise</span>
                <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1.5 text-green-400" /> 14 jours gratuits</span>
            </div>
          </div>

          {/* Visual Content (Mockup) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
             <div className="relative animate-float">
                {/* Main Dashboard UI Mockup */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 overflow-hidden transform lg:rotate-y-12 lg:rotate-x-6 perspective-1000">
                    <img 
                        src="https://picsum.photos/seed/dashboard_ui/800/600" 
                        alt="StarConnect Dashboard Interface" 
                        className="rounded-xl w-full h-auto shadow-inner"
                    />
                </div>
                {/* Widgets conservés mais attention à la lisibilité sur un fond d'écran sombre si le mockup n'est pas clair */}
                {/* ... (Widgets non modifiés pour conserver leur logique actuelle) ... */}
             </div>
          </div>

        </div>
      </div>
      
      {/* Curve at bottom */}
      <div className="absolute bottom-0 left-0 w-full translate-y-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 68.3C96 76.7 192 93.3 288 95C384 96.7 480 83.3 576 68.3C672 53.3 768 36.7 864 36.7C960 36.7 1056 53.3 1152 65C1248 76.7 1344 83.3 1392 86.7L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;