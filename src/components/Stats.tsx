import React from 'react';
import { STATS } from '../Constants';

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {STATS.map((stat) => (
            <div key={stat.id} className="pt-8 lg:pt-0 px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 mb-2">
                {stat.value}
                <span className="text-3xl md:text-4xl ml-1 text-primary-300">{stat.suffix}</span>
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;