import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../Constants';

const Testimonials: React.FC = () => {
  // Use a carousel logic that shows multiple items on larger screens if possible, 
  // but for simplicity and to match the "carousel" request, we'll slide one by one 
  // or show a active card.
  
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Rejoignez des milliers de créateurs qui utilisent NovaWeb pour propulser leur activité.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
            {/* Cards Display */}
            <div className="overflow-hidden px-4 py-8">
                <div 
                    className="flex transition-transform duration-500 ease-in-out" 
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {TESTIMONIALS.map((t) => (
                        <div key={t.id} className="w-full flex-shrink-0 px-4">
                             <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-6 md:gap-8 mx-auto max-w-2xl hover:shadow-2xl transition-shadow">
                                <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="w-24 h-24 rounded-full object-cover border-4 border-primary-50 shadow-sm"
                                />
                                <div className="text-center md:text-left flex-1">
                                    <div className="flex justify-center md:justify-start mb-3 text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                    </div>
                                    <p className="text-lg text-slate-700 italic mb-4 leading-relaxed">"{t.comment}"</p>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">{t.name}</h4>
                                        <p className="text-sm text-primary-600 font-semibold">{t.role} @ {t.company}</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <button 
                onClick={prevSlide}
                className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-12 bg-white text-slate-600 p-3 rounded-full shadow-lg border border-slate-100 hover:text-primary-600 hover:scale-110 transition-all z-10 hidden md:block"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-12 bg-white text-slate-600 p-3 rounded-full shadow-lg border border-slate-100 hover:text-primary-600 hover:scale-110 transition-all z-10 hidden md:block"
            >
                <ChevronRight size={24} />
            </button>
            
            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
                {TESTIMONIALS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`transition-all duration-300 rounded-full h-2 ${index === activeIndex ? 'w-8 bg-primary-600' : 'w-2 bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;