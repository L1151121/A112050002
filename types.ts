export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  rainChance: number;
  sunset: string; // Format: HH:MM
  weatherCode: number;
}

export interface SuggestionState {
  isLoading: boolean;
  text: string | null;
  error: string | null;
}
