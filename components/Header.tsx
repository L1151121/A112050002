import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 flex justify-center items-center z-10 relative">
      <h1 className="text-3xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
        WEATHER
      </h1>
    </header>
  );
};
