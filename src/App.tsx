import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Templates from './pages/Templates';
import Testimonials from './components/Testimonials';
import Features from './components/Features';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow">
        <Hero />
        <About />
        <Templates />
        <Testimonials />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default App;