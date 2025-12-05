import React, { useState } from 'react';

// 🔵 Navbars
import NavbarHome from './components/NavbarHome';
import NavbarDefault from './components/NavbarDefault';

// Pages et composants
import Hero from './components/Hero';
import About from './pages/About';
import Templates from './pages/Templates';
import Testimonials from './components/Testimonials';
import Template from './components/templates'
import Features from './components/Features';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import AdminCMS from './pages/admin-cms/admin';

import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* === NAVIGATION === */}
      {currentPage !== 'admin' && (
        currentPage === 'home' ? (
          <NavbarHome onNavigate={handleNavigate} currentPage={currentPage} />
        ) : (
          <NavbarDefault onNavigate={handleNavigate} currentPage={currentPage} />
        )
      )}

      {/* === CONTENU === */}
      <main className="grow">

        {currentPage === 'home' && (
          <>
            <Hero />
            <About />
            <Templates />
            <Testimonials />
            <Features />
          </>
        )}

        {currentPage === 'dashboard' && (
          <UserDashboard onNavigate={handleNavigate} />
        )}

        {currentPage === 'signin' && (
          <SignIn onNavigate={handleNavigate} />
        )}

        {currentPage === 'signup' && (
          <SignUp onNavigate={handleNavigate} />
        )}

        {currentPage === 'templates' && (
          <Template onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin' && (
          <AdminCMS onNavigate={handleNavigate} />
        )}

      </main>

      {/* === FOOTER === */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}

    </div>
  );
};

export default App;

