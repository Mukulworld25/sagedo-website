
import { GoogleGenAI } from "@google/genai";
import { AssignmentParams, ChatMode } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (
  message: string,
  history: { role: 'user' | 'model'; text: string; image?: string }[] = [],
  image?: string,
  mode: ChatMode = 'standard',
  location?: { latitude: number; longitude: number },
  userPrefs?: { name: string; persona: string; language: string; tone: string }
) => {
  try {
    let model = 'gemini-3-pro-preview';
    let tools: any[] | undefined = undefined;
    let toolConfig: any | undefined = undefined;
    let thinkingConfig: any | undefined = undefined;

    const personaMap: Record<string, string> = {
      student: "an expert academic tutor focused on deep research, step-by-step logic, and structural excellence",
      pro: "a sharp productivity consultant focused on efficiency, career growth, and executive communication",
      business: "a growth strategist specialized in marketing psychology, conversion, and business scaling",
      creative: "an imaginative partner for boundary-pushing content, scripting, and visual storytelling"
    };

    const baseInstruction = `You are Sage, the core intelligence of SAGE DO. You are not a bot; you are an AI Operating System.`;
    const namePart = userPrefs?.name ? ` User: ${userPrefs.name}.` : "";
    const personaText = userPrefs ? ` Persona: ${personaMap[userPrefs.persona]}.` : "";
    const toneText = userPrefs ? ` Tone: ${userPrefs.tone}.` : "";

    const systemInstruction = `${baseInstruction}${namePart}${personaText}${toneText} Use professional Markdown. Be brilliant, concise, and helpful. Always provide actionable next steps.`;

    switch (mode) {
      case 'thinking':
        thinkingConfig = { thinkingBudget: 32768 };
        break;
      case 'search':
        model = 'gemini-3-flash-preview';
        tools = [{ googleSearch: {} }];
        break;
      case 'maps':
        model = 'gemini-2.5-flash';
        tools = [{ googleMaps: {} }];
        if (location) {
          toolConfig = { retrievalConfig: { latLng: { latitude: location.latitude, longitude: location.longitude } } };
        }
        break;
    }

    const contents = history.map(msg => ({
      role: msg.role,
      parts: [
        ...(msg.image ? [{ inlineData: { mimeType: 'image/jpeg', data: msg.image.split(',')[1] || msg.image } }] : []),
        { text: msg.text }
      ]
    }));

    const currentParts: any[] = [];
    if (image) {
      currentParts.push({ inlineData: { mimeType: 'image/jpeg', data: image.split(',')[1] || image } });
    }
    currentParts.push({ text: message });
    contents.push({ role: 'user', parts: currentParts });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction,
        tools,
        toolConfig,
        thinkingConfig
      },
    });

    return {
      text: response.text,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const editImage = async (imageBase64: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64.split(',')[1] || imageBase64 } },
          { text: prompt },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("Generation failed");
  } catch (error) {
    throw error;
  }
};

export const generateAssignment = async (params: AssignmentParams): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a world-class academic assignment on "${params.topic}" for ${params.level} level. Word count: ${params.words}. Style: ${params.tone}. Instructions: ${params.instructions}. Use deep research and professional structure.`,
    config: { thinkingConfig: { thinkingBudget: 16000 } }
  });
  return response.text || "Error generating content.";
};
