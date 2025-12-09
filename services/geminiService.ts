import { GoogleGenAI } from "@google/genai";
import { WeatherData, City } from '../types';
import { MODEL_NAME } from '../constants';

export const generateOutfitSuggestion = async (city: City, weather: WeatherData): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure the environment.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a professional fashion stylist.
    The user is in ${city.name}.
    Current weather conditions:
    - Temperature: ${weather.temperature}°C
    - Weather Condition Code: ${weather.weatherCode}
    - Rain Probability: ${weather.rainChance}%
    - Humidity: ${weather.humidity}%
    - Wind Speed: ${weather.windSpeed} km/h
    
    Please provide a concise, stylish, and practical outfit suggestion for today. 
    Explain why based on the weather (e.g., "It's windy, so wear a windbreaker").
    Keep the tone modern, friendly, and helpful. 
    Limit the response to 2-3 sentences.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    return response.text || "Unable to generate a suggestion at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't reach the fashion AI right now. Please try again later.";
  }
};
