// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './pages/About';
import Templates from './pages/Templates';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// CMS
import { CmsContainer } from './components/CMS/CmsContainer';
import AdminCMS from './pages/admin-cms/admin';

// Types
import { Page } from './types';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: Page) => void;
}

// Main Layout avec Navbar et Footer
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar onNavigate={handleNavigate} currentPage="home" />
      <main className="grow">
        {children}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

// Admin Layout sans Navbar et Footer
const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const handleNavigate = (page: Page) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <MainLayout onNavigate={handleNavigate}>
              <Hero onNavigate={handleNavigate} />
              <About />
              <Templates />
              <Testimonials />
              <Features />
            </MainLayout>
          }
        />

        {/* Sign In */}
        <Route
          path="/signin"
          element={
            <MainLayout onNavigate={handleNavigate}>
              <SignIn onNavigate={handleNavigate} />
            </MainLayout>
          }
        />

        {/* Sign Up */}
        <Route
          path="/signup"
          element={
            <MainLayout onNavigate={handleNavigate}>
              <SignUp onNavigate={handleNavigate} />
            </MainLayout>
          }
        />

        {/* CMS Dashboard */}
        <Route
          path="/cms"
          element={
            <AdminLayout>
              <CmsContainer />
            </AdminLayout>
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminCMS onNavigate={handleNavigate} />
            </AdminLayout>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <MainLayout onNavigate={handleNavigate}>
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
                <p className="text-xl text-slate-600 mb-6">Page non trouvée</p>
                <a
                  href="/"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Retour à l'accueil
                </a>
              </div>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;