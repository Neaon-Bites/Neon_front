import React from 'react';
import { ArrowRight, Lock, User, Mail, CheckCircle } from 'lucide-react';
import { Page } from '../types';

interface SignUpProps {
  onNavigate: (page: Page) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
            Commencez gratuitement
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Rejoignez plus de 50k+ créateurs aujourd'hui.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-100 relative overflow-hidden">
           {/* Decoration */}
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl opacity-60"></div>

          <form className="space-y-5 relative z-10" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
            
            {/* Username (Django Field) */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Nom d'utilisateur <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                  placeholder="votre_pseudo"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Sera utilisé pour l'URL de votre profil.</p>
            </div>

            {/* Email (Django Field) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email professionnel <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                  placeholder="vous@entreprise.com"
                />
              </div>
            </div>

            {/* Password (Django Field) */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password_hash" 
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
                  placeholder="8+ caractères"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
                <div className="flex items-center h-5">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                    required
                />
                </div>
                <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-slate-700">
                    J'accepte les <a href="#" className="text-primary-600 hover:text-primary-500">Conditions</a> et la <a href="#" className="text-primary-600 hover:text-primary-500">Politique de confidentialité</a>
                </label>
                </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-500/30 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:-translate-y-0.5"
              >
                Créer mon compte
              </button>
            </div>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-slate-100">
             <div className="space-y-3">
                <div className="flex items-center text-xs text-slate-500">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Pas de carte de crédit requise
                </div>
                <div className="flex items-center text-xs text-slate-500">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Essai gratuit de 14 jours
                </div>
             </div>
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
                Déjà un compte ? {' '}
                <button onClick={() => onNavigate('signin')} className="font-bold text-primary-600 hover:text-primary-500">
                Se connecter
                </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;