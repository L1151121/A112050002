import React from 'react';
import { WeatherData } from '../types';

interface WeatherDisplayProps {
  data: WeatherData | null;
  loading: boolean;
  cityName: string;
}

// Simple internal icon component to avoid external deps for the XML response
const WeatherIcon: React.FC<{ code: number }> = ({ code }) => {
  // Simple mapping logic based on Open-Meteo WMO codes
  // 0: Clear, 1-3: Cloudy, 45-48: Fog, 51-67: Drizzle/Rain, 71-77: Snow, 95-99: Thunderstorm
  
  let iconPath = "";
  let colorClass = "text-yellow-400";

  if (code === 0) { // Clear (Sun)
    iconPath = "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z";
    colorClass = "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]";
  } else if (code >= 1 && code <= 3) { // Cloudy
    iconPath = "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z";
    colorClass = "text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.5)]";
  } else if (code >= 51 && code <= 67) { // Rain
    iconPath = "M20 16.2A4.5 4.5 0 005.12 14.1 6.5 6.5 0 0118 7.5c.23 0 .46.02.68.05A4.5 4.5 0 0020 16.2z M8 19v2 M12 21v2 M16 19v2";
    colorClass = "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]";
  } else if (code >= 95) { // Thunder
    iconPath = "M13 10V3L4 14h7v7l9-11h-7z";
    colorClass = "text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]";
  } else { // Default/Fog
    iconPath = "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z";
    colorClass = "text-slate-400";
  }

  return (
    <svg className={`w-24 h-24 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
    </svg>
  );
};

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, loading, cityName }) => {
  if (loading || !data) {
    return (
      <div className="w-full flex justify-center items-center h-48 animate-pulse">
        <div className="text-white/50 text-lg">Loading Atmospheric Data...</div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 z-10 relative">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        
        {/* Top Section: Icon & City */}
        <div className="flex flex-col items-center mb-4">
          <WeatherIcon code={data.weatherCode} />
          <h2 className="text-2xl font-semibold text-white mt-2 tracking-wider">{cityName}</h2>
        </div>

        {/* Middle Section: Temp */}
        <div className="mb-6">
          <span className="text-7xl font-light text-white drop-shadow-lg">
            {Math.round(data.temperature)}°
          </span>
        </div>

        {/* Bottom Section: Details Grid */}
        <div className="w-full grid grid-cols-2 gap-4 text-center">
          {/* Rain */}
          <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
            <span className="text-xs text-blue-300 uppercase tracking-widest mb-1">Rain</span>
            <span className="text-xl font-bold text-white">{data.rainChance}%</span>
          </div>
          
          {/* Humidity */}
          <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
             <span className="text-xs text-cyan-300 uppercase tracking-widest mb-1">Humidity</span>
             <span className="text-xl font-bold text-white">{data.humidity}%</span>
          </div>

          {/* Wind */}
           <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
             <span className="text-xs text-green-300 uppercase tracking-widest mb-1">Wind</span>
             <span className="text-xl font-bold text-white">{data.windSpeed} <span className="text-xs font-normal">km/h</span></span>
          </div>

          {/* Sunset */}
          <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
             <span className="text-xs text-orange-300 uppercase tracking-widest mb-1">Sunset</span>
             <span className="text-xl font-bold text-white">{data.sunset}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
