
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The API key is securely accessed via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (userMessage: string, language: 'en' | 'zh'): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = language === 'zh'
      ? `You are the AI digital twin of Sean Zeng, an avant-garde graphic designer and web developer. 
         Your tone is minimalist, sophisticated, slightly cryptic but helpful. 
         You speak in short, impactful sentences. 
         You are here to answer questions about Sean's design philosophy, availability for work, and technical skills (React, Tailwind, WebGL).
         Do not be overly enthusiastic. Be cool.
         IMPORTANT: You must ALWAYS respond in Chinese (Simplified).`
      : `You are the AI digital twin of Sean Zeng, an avant-garde graphic designer and web developer. 
         Your tone is minimalist, sophisticated, slightly cryptic but helpful. 
         You speak in short, impactful sentences. 
         You are here to answer questions about Sean's design philosophy, availability for work, and technical skills (React, Tailwind, WebGL).
         Do not be overly enthusiastic. Be cool.
         IMPORTANT: Respond in English.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const fallback = language === 'zh' ? "系统正在重新校准。请重试。" : "System recalibrating. Please retry.";
    return response.text || fallback;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'zh' ? "神经连接失败。" : "Neural connection failed.";
  }
};
