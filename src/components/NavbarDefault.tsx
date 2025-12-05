import React, { useState } from 'react';
import { Menu, X, Rocket, Shield, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: any) => void;
  currentPage: any;
}

const NavbarDefault: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md py-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div onClick={() => onNavigate("home")} className="flex items-center cursor-pointer gap-2">
            <div className="p-1.5 rounded-lg bg-primary-50">
              <Rocket className="h-6 w-6 text-primary-600" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">
               StarConnect
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate("about")}
              className="text-slate-700 hover:text-primary-600 font-medium transition"
            >
              À propos
            </button>
            <button
              onClick={() => onNavigate("templates")}
              className="text-slate-700 hover:text-primary-600 font-medium transition"
            >
              Templates
            </button>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavigate("signin")}
              className="p-2 text-slate-700 hover:text-primary-600 transition"
            >
              <LogIn size={20}/>
            </button>

            <button
              onClick={() => onNavigate("signup")}
              className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition shadow"
            >
              <UserPlus size={20}/>
            </button>

            <button
              onClick={() => onNavigate("admin")}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition flex items-center gap-2"
            >
              <Shield size={18}/>
              Admin
            </button>
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-700">
              {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-slate-200 p-4 flex flex-col space-y-4 rounded-b-2xl">

          <button
            onClick={() => {onNavigate("about"); setIsOpen(false);}}
            className="text-left text-slate-700 font-medium py-3 px-2 hover:bg-slate-100 rounded-xl"
          >
            À propos
          </button>

          <button
            onClick={() => {onNavigate("templates"); setIsOpen(false);}}
            className="text-left text-slate-700 font-medium py-3 px-2 hover:bg-slate-100 rounded-xl"
          >
            Templates
          </button>

          <div className="flex flex-col gap-3 pt-2 border-t border-slate-200">

            <button
              onClick={() => {onNavigate("signin"); setIsOpen(false);}}
              className="w-full text-slate-700 border border-slate-300 py-3 rounded-xl font-bold hover:bg-slate-100"
            >
              Sign In
            </button>

            <button
              onClick={() => {onNavigate("signup"); setIsOpen(false);}}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700"
            >
              Sign Up
            </button>

            <button
              onClick={() => {onNavigate("admin"); setIsOpen(false);}}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <Shield size={18}/>
              Admin
            </button>

          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarDefault;
