import React, { useState, useEffect, useCallback } from 'react';
import { CITIES } from './constants';
import { City, WeatherData } from './types';
import { fetchWeatherData } from './services/weatherService';
import { generateOutfitSuggestion } from './services/geminiService';
import { Header } from './components/Header';
import { CitySelector } from './components/CitySelector';
import { WeatherDisplay } from './components/WeatherDisplay';
import { SceneryDisplay } from './components/SceneryDisplay';
import { SuggestionPanel } from './components/SuggestionPanel';

const App: React.FC = () => {
  // State
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Default to first city (Taipei)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);
  
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState<boolean>(false);

  // Fetch Weather Logic
  const loadWeather = useCallback(async () => {
    setLoadingWeather(true);
    setSuggestion(null); // Clear previous suggestion when city changes
    try {
      const data = await fetchWeatherData(selectedCity.latitude, selectedCity.longitude);
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to load weather", error);
      // In a real app, set an error state here for UI feedback
    } finally {
      setLoadingWeather(false);
    }
  }, [selectedCity]);

  // Initial load & when city changes
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Handle Get Suggestion
  const handleGetSuggestion = async () => {
    if (!weatherData) return;
    
    setLoadingSuggestion(true);
    try {
      const text = await generateOutfitSuggestion(selectedCity, weatherData);
      setSuggestion(text);
    } catch (error) {
      console.error("Failed to get suggestion", error);
    } finally {
      setLoadingSuggestion(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center bg-slate-900">
      
      {/* Background Scenery (Full Screen Absolute) */}
      <SceneryDisplay city={selectedCity} />

      {/* Main Content Container */}
      {/* Using max-w-md to simulate a mobile app view on desktop, but full width on mobile */}
      <div className="relative w-full max-w-md h-full flex flex-col justify-between overflow-y-auto z-10 no-scrollbar">
        
        {/* Top Section */}
        <div className="flex flex-col w-full pt-4">
          <Header />
          <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />
          <WeatherDisplay 
            data={weatherData} 
            loading={loadingWeather} 
            cityName={selectedCity.name} 
          />
        </div>

        {/* Bottom Section */}
        <div className="w-full">
          <SuggestionPanel 
            onGetSuggestion={handleGetSuggestion} 
            isLoading={loadingSuggestion} 
            suggestion={suggestion} 
          />
        </div>

      </div>
    </div>
  );
};

export default App;
