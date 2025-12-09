import { WeatherData } from '../types';

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current_weather: 'true',
      hourly: 'precipitation_probability,relative_humidity_2m',
      daily: 'sunset',
      timezone: 'auto', // Important for correct sunset time
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    // Parse Current Weather
    const current = data.current_weather;
    
    // Parse Hourly Data to get current humidity and rain chance
    // We need to find the index in the hourly arrays that matches the current time
    const currentIsoTime = current.time; // Open-Meteo returns ISO time for current weather
    const hourlyTimes = data.hourly.time as string[];
    
    // Find the closest hour index. The API usually aligns them, but let's be safe.
    // The current_weather.time is usually one of the hourly points.
    let hourIndex = hourlyTimes.indexOf(currentIsoTime);
    
    // Fallback if exact match not found (take the first one or calculate based on hour)
    if (hourIndex === -1) {
       const now = new Date();
       const currentHourStr = now.toISOString().slice(0, 13); // Match YYYY-MM-DDTHH
       hourIndex = hourlyTimes.findIndex(t => t.startsWith(currentHourStr));
    }
    
    if (hourIndex === -1) hourIndex = 0; // Absolute fallback

    const humidity = data.hourly.relative_humidity_2m[hourIndex];
    const rainChance = data.hourly.precipitation_probability[hourIndex];

    // Parse Sunset
    // Daily data is an array. We usually want today's sunset.
    // Assuming the first element (index 0) is today because we didn't ask for past days.
    const sunsetIso = data.daily.sunset[0];
    const sunsetDate = new Date(sunsetIso);
    const sunset = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return {
      temperature: current.temperature,
      windSpeed: current.windspeed,
      weatherCode: current.weathercode,
      humidity: humidity || 0,
      rainChance: rainChance || 0,
      sunset: sunset,
    };

  } catch (error) {
    console.error("Weather Fetch Error:", error);
    throw error;
  }
};
