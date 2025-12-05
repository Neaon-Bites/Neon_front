// src/components/Navbar.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, Shield, LogIn, UserPlus } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getClassNames = (isScrolled: boolean) => {
    const baseLinkClass = 'font-medium transition-all relative group hover:opacity-80 hover:scale-[1.02]';
    const linkColorClass = isScrolled ? 'text-slate-900' : 'text-white/90';

    const underlineAnimationClass = `
      after:content-[''] after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 
      ${isScrolled ? 'after:bg-blue-600' : 'after:bg-white'} 
      group-hover:after:w-full after:transition-all after:duration-300
    `;

    return {
      textColor: isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/90 hover:text-white',
      navLinkClass: `${baseLinkClass} ${linkColorClass} ${underlineAnimationClass}`,
      logoIconColor: isScrolled ? 'text-blue-600' : 'text-white',
      logoTextColor: isScrolled ? 'text-slate-900' : 'text-white',
      buttonSignUp: isScrolled
        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
        : 'bg-white text-blue-600 hover:bg-white/90 shadow-black/10',
      adminButton: isScrolled
        ? 'bg-slate-900 text-white hover:bg-slate-800'
        : 'bg-white/10 border border-white/40 text-white hover:bg-blue-600',
    };
  };

  const classes = useMemo(() => getClassNames(scrolled), [scrolled]);

  // ✅ CORRECTION: Utiliser useNavigate pour la navigation
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const NavLink = ({ page, label, href = '#' }: { page: Page; label: string; href?: string }) => (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4 border-b border-slate-100'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div onClick={() => handleNavigate('/')} className="flex items-center cursor-pointer gap-2">
            <div
              className={`p-1.5 rounded-lg transition-colors ${
                scrolled ? 'bg-blue-50' : 'bg-white/10 backdrop-blur-sm'
              }`}
            >
              <Rocket className={`h-6 w-6 ${classes.logoIconColor}`} />
            </div>
            <span className={`font-bold text-2xl tracking-tight ${classes.logoTextColor}`}>
              StarConnect
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink page="home" label="À propos" href="#about" />
            <NavLink page="home" label="Templates" href="#templates" />
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sign In */}
            <button
              onClick={() => handleNavigate('/signin')}
              className={`p-2 rounded-full transition-colors ${classes.textColor} ${
                scrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'
              }`}
              aria-label="Se connecter"
            >
              <LogIn size={20} />
            </button>

            {/* Sign Up */}
            <button
              onClick={() => handleNavigate('/signup')}
              className={`p-2 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'
                  : 'bg-white text-blue-600 hover:bg-white/90 shadow-black/10'
              }`}
              aria-label="S'inscrire"
            >
              <UserPlus size={20} />
            </button>

            {/* CMS Dashboard Button */}
            <button
              onClick={() => handleNavigate('/cms')}
              className={`${classes.adminButton} px-6 py-2.5 rounded-full font-bold transition-all shadow hover:-translate-y-0.5`}
            >
              Créer un site
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => handleNavigate('/admin')}
              className={`${classes.adminButton} px-6 py-2.5 rounded-full font-bold transition-all shadow hover:-translate-y-0.5 flex items-center gap-2`}
            >
              <Shield size={18} />
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${scrolled ? 'text-slate-600' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200 rounded-b-2xl">
          <button
            onClick={() => {
              onNavigate('home');
              setIsOpen(false);
            }}
            className="w-full text-left text-slate-900 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            À propos
          </button>

          <button
            onClick={() => {
              onNavigate('home');
              setIsOpen(false);
            }}
            className="w-full text-left text-slate-900 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Templates
          </button>

          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            {/* Sign In */}
            <button
              onClick={() => handleNavigate('/signin')}
              className="w-full text-slate-600 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              Sign In
            </button>

            {/* Sign Up */}
            <button
              onClick={() => handleNavigate('/signup')}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>

            {/* CMS Dashboard */}
            <button
              onClick={() => handleNavigate('/cms')}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors"
            >
              Créer un site
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => handleNavigate('/admin')}
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