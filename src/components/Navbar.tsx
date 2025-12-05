import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Rocket, Shield, LogIn, UserPlus } from 'lucide-react'; // Ajout des icônes d'action
// import { NAV_ITEMS } from '../Constants'; 
// import { Page } from '../types';

interface NavbarProps {
  onNavigate: (page: any) => void;
  currentPage: any;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => { 
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
    const baseLinkClass = "font-medium transition-all relative group hover:opacity-80 hover:scale-[1.02]"; 

    // MODIFICATION 1: Les liens de navigation de bureau changent de couleur (Blanc -> Noir/Gris)
    const linkColorClass = isScrolled ? 'text-slate-900' : 'text-white/90'; 
      
    // Style du soulignement animé (underline animation)
    const underlineAnimationClass = `
      after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 
      ${isScrolled ? 'after:bg-primary-600' : 'after:bg-white'} 
      group-hover:after:w-full after:transition-all after:duration-300
    `;
    
    return {
      // Les boutons et icônes d'action conservent leur couleur dynamique
      textColor: isScrolled
        ? 'text-slate-600 hover:text-primary-600'
        : 'text-white/90 hover:text-white',
      
      // Classe combinée pour les liens de navigation de bureau (Dynamique + animation)
      navLinkClass: `${baseLinkClass} ${linkColorClass} ${underlineAnimationClass}`,

      // MODIFICATION 2: Logo Icon: Primaire défilé, Blanc non défilé (plus simple)
      logoIconColor: isScrolled
        ? 'text-primary-600'
        : 'text-white',
      
      // MODIFICATION 3: Logo Texte: Noir défilé, Blanc non défilé
      logoTextColor: isScrolled
        ? 'text-slate-900'
        : 'text-white', 

      // Bouton Sign Up texte/fond (conservé pour le mobile)
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
        // e.preventDefault(); 
        onNavigate(page);
        setIsOpen(false);
      }}
      className={classes.navLinkClass}
    >
      {label}
    </a>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4 border-b border-slate-100' // Fond blanc opaque (visible sur tout)
          : 'bg-transparent py-6' // Fond transparent au top du Hero sombre
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* ==== LOGO : StarConnect ==== */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer gap-2"
          >
            <div
              // MODIFICATION 4: Style du fond du logo ajusté
              className={`p-1.5 rounded-lg transition-colors ${
                scrolled ? 'bg-primary-50' : 'bg-white/10 backdrop-blur-sm'
              }`}
            >
              <Rocket className={`h-6 w-6 ${classes.logoIconColor}`} />
            </div>

            <span
              className={`font-bold text-2xl tracking-tight ${classes.logoTextColor}`}
            >
              StarConnect 
            </span>
          </div>

          {/* ==== DESKTOP MENU (LIENS DYNAMIQUES) ==== */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink page="about" label="À propos" href="#about" />
            <NavLink page="templates" label="Templates" href="#templates" /> 
          </div>

          {/* ==== ACTION BUTTONS (Icônes) ==== */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Sign In (Icône) */}
            <button
              onClick={() => onNavigate('signin')}
              className={`p-2 rounded-full transition-colors ${classes.textColor} ${scrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`} 
              aria-label="Se connecter"
            >
              <LogIn size={20} />
            </button>
          
            {/* Sign Up (Icône) - Reste le bouton CTA principal */}
            <button
              onClick={() => onNavigate('signup')}
              className={`p-2 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/30'
                  : 'bg-white text-primary-600 hover:bg-white/90 shadow-black/10'
              }`}
              aria-label="S'inscrire"
            >
              <UserPlus size={20} />
            </button>

            {/* Admin Portal (Texte + Icône) */}
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
                scrolled ? 'text-slate-600' : 'text-white' // Couleur dynamique pour le bouton menu
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ==== MOBILE MENU (COULEURS MOBILES MISES À JOUR) ==== */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200 rounded-b-2xl">

          {/* Lien Mobile: À propos */}
          <button
             onClick={() => {
                onNavigate('about');
                setIsOpen(false);
              }}
            className="w-full text-left text-slate-900 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            À propos
          </button>
          
          {/* NOUVEAU LIEN MOBILE: Templates */}
          <button
             onClick={() => {
                onNavigate('templates');
                setIsOpen(false);
              }}
            className="w-full text-left text-slate-900 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Templates
          </button>

          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            
            {/* Sign In */}
            <button
              onClick={() => { onNavigate('signin'); setIsOpen(false); }}
              className="w-full text-slate-600 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              Sign In
            </button>

            {/* Sign Up */}
            <button
              onClick={() => { onNavigate('signup'); setIsOpen(false); }}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-primary-700 transition-colors"
            >
              Sign Up
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => { onNavigate('admin'); setIsOpen(false); }}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Shield size={18} />
              Portail Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;