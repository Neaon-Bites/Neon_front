import React from 'react';
import { Rocket, Twitter, Github, Linkedin, Instagram } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div 
              className="flex items-center mb-6 cursor-pointer"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="bg-primary-600 p-1.5 rounded-lg mr-2">
                 <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">NovaWeb</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              La plateforme de référence pour créer des expériences web inoubliables.
            </p>
            <div className="flex space-x-4">
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Twitter size={18} /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Github size={18} /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Produit</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 transition-colors">Templates</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 transition-colors">Fonctionnalités</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 transition-colors">Tarifs</button></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Entreprise</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 transition-colors">À propos</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 transition-colors">Carrières</button></li>
              <li><button onClick={() => onNavigate('home')} className="hover:text-primary-600 transition-colors">Blog</button></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Status</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} NovaWeb Inc. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;