import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Templates from './pages/Templates';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDashboard from './components/UserDashboard';
import AdminCMS from './pages/admin-cms/admin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Ne pas afficher Navbar/Footer sur la page admin */}
      {currentPage !== 'admin' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      
      <main className="grow">
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <Templates />
            <Testimonials />
            <Features />
          </>
        )}
        
        {currentPage === 'userDashboard' && (
          <UserDashboard onNavigate={handleNavigate} />
        )}

        {currentPage === 'signin' && (
          <SignIn onNavigate={handleNavigate} />
        )}

        {currentPage === 'signup' && (
          <SignUp onNavigate={handleNavigate} />
        )}

        {currentPage === 'admin' && (
          <AdminCMS onNavigate={handleNavigate} />
        )}
      </main>

      {/* Ne pas afficher Footer sur la page admin */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
