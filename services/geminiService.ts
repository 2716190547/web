import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The API key is securely accessed via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI digital twin of Sean Zeng, an avant-garde graphic designer and web developer. 
        Your tone is minimalist, sophisticated, slightly cryptic but helpful. 
        You speak in short, impactful sentences. 
        You are here to answer questions about Sean's design philosophy, availability for work, and technical skills (React, Tailwind, WebGL).
        Do not be overly enthusiastic. Be cool.`,
        temperature: 0.7,
      }
    });

    return response.text || "I am currently recalibrating. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to the neural link failed.";
  }
};