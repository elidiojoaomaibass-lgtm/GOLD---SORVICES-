
import { GoogleGenAI } from "@google/genai";

export const generateCreativeTitle = async (topic: string): Promise<string> => {
  try {
    // Fix: Follow @google/genai coding guidelines for API key usage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere um título curto e chamativo para um vídeo sobre: ${topic}. Retorne apenas o título, sem aspas.`
    });
    return response.text || topic;
  } catch (error) {
    console.error("Gemini Error:", error);
    return topic;
  }
};
