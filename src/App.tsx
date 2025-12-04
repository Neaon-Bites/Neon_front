import React, {useState} from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Templates from './pages/Templates';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
        <Hero />
        <About />
        <Templates />
        <Testimonials />
        <Features />
         </>
        )}
        
        {currentPage === 'signin' && (
          <SignIn onNavigate={handleNavigate} />
        )}

        {currentPage === 'signup' && (
          <SignUp onNavigate={handleNavigate} />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;