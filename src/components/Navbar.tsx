import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Rocket, Shield } from 'lucide-react';
// import { NAV_ITEMS } from '../Constants'; 
// import { Page } from '../types';

interface NavbarProps {
  onNavigate: (page: any) => void;
  currentPage: any;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => { // Note: currentPage is not used here but kept in props
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FONCTION DE LOGIQUE DE COULEUR SIMPLIFIÉE ---
  const getClassNames = (isScrolled: boolean) => {
    
    // Classes de base pour les liens de navigation (desktop)
    const baseLinkClass = "font-medium transition-colors relative group";

    // MODIFICATION 1: Les liens de navigation sont fixés à text-slate-900 (noir/gris foncé)
    // Le hover sera toujours visible via l'animation de soulignement.
    const linkColorClass = 'text-slate-900'; 
      
    // Style du soulignement animé (underline animation)
    // Le soulignement reste blanc sur fond transparent, et de couleur primaire sur fond blanc
    const underlineAnimationClass = `
      after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 
      ${isScrolled ? 'after:bg-primary-600' : 'after:bg-white'} 
      group-hover:after:w-full after:transition-all after:duration-300
    `;
    
    return {
      // Le style des boutons Sign In/Out reste dynamique pour la visibilité
      textColor: isScrolled
        ? 'text-slate-600 hover:text-primary-600'
        : 'text-white/90 hover:text-white',
      
      // NOUVEAU: Classe combinée pour les liens de navigation de bureau (Noir statique + animation)
      navLinkClass: `${baseLinkClass} ${linkColorClass} ${underlineAnimationClass}`,

      logoIconColor: isScrolled
        ? 'text-primary-600'
        : 'text-white',
      
      logoTextColor: isScrolled
        ? 'text-slate-900'
        : 'text-white',

      buttonSignUp: isScrolled
        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/30'
        : 'bg-white text-primary-600 hover:bg-white/90 shadow-black/10',

      adminButton: isScrolled
        ? 'bg-slate-900 text-white hover:bg-slate-800'
        : 'bg-white/10 border border-white/40 text-white hover:bg-primary-600',
    };
  };
  
  const classes = useMemo(() => getClassNames(scrolled), [scrolled]);
  // ---------------------------------------------------

  // Fonction utilitaire pour le lien de navigation
  const NavLink = ({ page, label, href = '#' }: { page: string, label: string, href?: string }) => (
    <a
      href={href}
      onClick={(e) => {
        // e.preventDefault(); // Décommentez ceci si vous ne voulez pas utiliser les ancres (#)
        onNavigate(page);
        setIsOpen(false);
      }}
      // Le composant est enveloppé d'un "group" et utilise les classes pour le soulignement animé
      className={classes.navLinkClass}
    >
      {label}
    </a>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4 border-b border-slate-100'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* ==== LOGO (Le texte du logo reste dynamique pour rester visible) ==== */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer gap-2"
          >
            <div
              className={`p-1.5 rounded-lg ${
                scrolled ? 'bg-primary-50' : 'bg-white/10 backdrop-blur-sm'
              }`}
            >
              <Rocket className={`h-6 w-6 ${classes.logoIconColor}`} />
            </div>

            <span
              className={`font-bold text-2xl tracking-tight ${classes.logoTextColor}`}
            >
              NovaWeb
            </span>
          </div>

          {/* ==== DESKTOP MENU (LIENS NOIRS STATIQUES) ==== */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink page="about" label="À propos" href="#about" />
            <NavLink page="templates" label="Templates" href="#templates" /> 
          </div>

          {/* ==== ACTION BUTTONS (Sign In/Up restent dynamiques) ==== */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Sign In */}
            <button
              onClick={() => onNavigate('signin')}
              // Note: Ce bouton utilise classes.textColor et reste dynamique
              className={`font-medium transition-colors ${classes.textColor}`} 
            >
              Sign In
            </button>
          
            {/* Sign Up */}
            <button
              onClick={() => onNavigate('signup')}
              className={`${classes.buttonSignUp} px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5`}
            >
              Sign Up
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => onNavigate('admin')}
              className={`${classes.adminButton} px-6 py-2.5 rounded-full font-bold transition-all shadow hover:-translate-y-0.5 flex items-center gap-2`}
            >
              <Shield size={18} />
              Portail Admin
            </button>

          </div>

          {/* ==== MOBILE BUTTON ==== */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${
                scrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ==== MOBILE MENU (La couleur des liens mobiles reste dynamique pour la lisibilité sur fond blanc) ==== */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200 rounded-b-2xl">

          {/* Lien Mobile: À propos */}
          <button
             onClick={() => {
                onNavigate('about');
                setIsOpen(false);
              }}
            className="w-full text-left text-slate-600 hover:text-primary-600 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            À propos
          </button>
          
          {/* NOUVEAU LIEN MOBILE: Templates */}
          <button
             onClick={() => {
                onNavigate('templates');
                setIsOpen(false);
              }}
            className="w-full text-left text-slate-600 hover:text-primary-600 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Templates
          </button>

          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            {/* ... boutons Sign In / Sign Up / Admin ... */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;