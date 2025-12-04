import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { NAV_ITEMS } from '../Constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Text color logic: White when at top (on blue hero), Dark when scrolled (on white bg)
  const textColorClass = scrolled ? 'text-slate-600 hover:text-primary-600' : 'text-white/90 hover:text-white';
  const logoColorClass = scrolled ? 'text-primary-600' : 'text-white';
  const buttonSignInClass = scrolled ? 'text-slate-600 hover:text-primary-600' : 'text-white hover:text-white/80';
  const buttonSignUpClass = scrolled 
    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/30' 
    : 'bg-white text-primary-600 hover:bg-white/90 shadow-black/10';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer gap-2">
            <div className={`p-1.5 rounded-lg ${scrolled ? 'bg-primary-50' : 'bg-white/10 backdrop-blur-sm'}`}>
                <Rocket className={`h-6 w-6 ${logoColorClass}`} />
            </div>
            <span className={`font-bold text-2xl tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>NovaWeb</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className={`font-medium transition-colors ${textColorClass}`}>À propos</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`font-medium transition-colors ${buttonSignInClass}`}>
              Sign In
            </button>
            <button className={`${buttonSignUpClass} px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5`}>
              Sign Up
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5 duration-200 rounded-b-2xl">
          <a
            href="#about"
            className="text-slate-600 hover:text-primary-600 font-medium py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            À propos
          </a>
          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            <button className="w-full text-slate-600 border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
              Sign In
            </button>
            <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold shadow-md hover:bg-primary-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;