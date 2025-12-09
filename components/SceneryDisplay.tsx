import React from 'react';
import { City } from '../types';

interface SceneryDisplayProps {
  city: City;
}

export const SceneryDisplay: React.FC<SceneryDisplayProps> = ({ city }) => {
  // Using picsum.photos with seed based on city name to maintain consistency per city, 
  // but getting a random nature/city look.
  // Note: We use the city name as seed.
  const imageUrl = `https://picsum.photos/seed/${city.name}weather/800/1000`;

  return (
    <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90 z-10 pointer-events-none" />
      
      {/* The Image */}
      <img 
        src={imageUrl} 
        alt={`${city.name} scenery`} 
        className="w-full h-full object-cover opacity-60 transition-opacity duration-1000 ease-in-out"
      />
      
      {/* Decorative gradient glowing orb effects behind content */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse z-0"></div>
    </div>
  );
};
