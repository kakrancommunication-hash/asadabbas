
import { GoogleGenAI, Type } from "@google/genai";
import { Mission } from "./types";

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMission = async (reputation: number): Promise<Mission> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a GTA Los Angeles style mission for a player in "Los Gemini" with reputation ${reputation}. 
    Make it feel like a crime thriller. Use LA slang.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          objective: { type: Type.STRING },
          reward: { type: Type.NUMBER },
          difficulty: { 
            type: Type.STRING,
            enum: ['Easy', 'Medium', 'Hard', 'Extreme']
          },
          giver: { type: Type.STRING }
        },
        required: ["title", "description", "objective", "reward", "difficulty", "giver"]
      },
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  const text = response.text || '{}';
  return JSON.parse(text) as Mission;
};

export const generateRadioBroadcast = async (wantedLevel: number, missionTitle: string | null): Promise<string> => {
  const ai = getAiClient();
  const context = wantedLevel > 0 
    ? `The city is in chaos. Police are chasing a suspect (Wanted Level ${wantedLevel}).`
    : missionTitle 
      ? `A major event is happening: ${missionTitle}.`
      : `Just a typical sunny day in Los Gemini.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are a radio host in Los Gemini (a version of Los Angeles). 
    Context: ${context}. 
    Give a short, punchy, satirical 2-sentence news update.`,
    config: {
      temperature: 1.0,
      systemInstruction: "Be edgy, satirical, and very LA."
    }
  });

  return response.text || "Coming to you live from Los Gemini...";
};

export const getNPCDialogue = async (npcType: string, playerAction: string): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Character Type: ${npcType}. Player just: ${playerAction}. Give a 1-sentence reaction.`,
    config: {
      temperature: 0.9
    }
  });
  return (response.text || '').trim();
};
