import React, { useState } from 'react';
import { ArrowRight, Lock, User, Mail, CheckCircle, Loader } from 'lucide-react';
import { Page } from '../types';

interface SignUpProps {
  onNavigate: (page: Page) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  // --- ÉTATS POUR LE FORMULAIRE ---
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- GESTION DES CHAMPS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SOUMISSION DU FORMULAIRE ---
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/influencers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          // Note : Ton modèle backend attend "password_hash"
          password: formData.password
        }),
      });

      if (response.ok) {
        // Succès ! On redirige vers le login
        alert("Compte créé avec succès ! Connectez-vous.");
        onNavigate('signin');
      } else {
        const data = await response.json();
        // Afficher l'erreur (ex: "Username already exists")
        setError(JSON.stringify(data));
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
        
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
            Commencez gratuitement
          </h2>
          <p className="mt-2 text-sm text-slate-600">Rejoignez StarConnect.</p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-100 relative overflow-hidden">
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl opacity-60"></div>

          <form className="space-y-5 relative z-10" onSubmit={handleSignUp}>
            
            {/* AFFICHER LES ERREURS */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">Nom d'utilisateur</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="votre_pseudo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="8+ caractères"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary-500/30 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all disabled:opacity-50"
            >
              {loading ? <Loader className="animate-spin h-5 w-5" /> : "Créer mon compte"}
            </button>
          </form>

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