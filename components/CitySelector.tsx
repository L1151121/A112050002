import React from 'react';
import { City } from '../types';
import { CITIES } from '../constants';

interface CitySelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    const city = CITIES.find(c => c.name === cityName);
    if (city) {
      onCityChange(city);
    }
  };

  return (
    <div className="w-full px-6 mb-4 z-10 relative flex justify-center">
      <div className="relative w-full max-w-xs">
        <select
          value={selectedCity.name}
          onChange={handleChange}
          className="w-full appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-4 pr-8 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium tracking-wide"
        >
          {CITIES.map((city) => (
            <option key={city.name} value={city.name} className="bg-slate-800 text-white">
              {city.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/70">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
