// Mobile App Gemini Service — Server-Side Proxy
// All Gemini calls go through our secure server API (no client-side API key needed)

import { AssignmentParams, ChatMode } from "../mobile-types";

export const generateChatResponse = async (
  message: string,
  history: { role: 'user' | 'model'; text: string; image?: string }[] = [],
  image?: string,
  mode: ChatMode = 'standard',
  location?: { latitude: number; longitude: number },
  userPrefs?: { name: string; persona: string; language: string; tone: string }
) => {
  try {
    const response = await fetch('/api/mobile/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ message, history, image, mode, location, userPrefs }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ text: 'Server error' }));
      throw new Error(err.text || 'Chat request failed');
    }

    return await response.json();
  } catch (error) {
    console.error("Chat Service Error:", error);
    throw error;
  }
};

export const editImage = async (imageBase64: string, prompt: string): Promise<string> => {
  // Image editing via server proxy
  try {
    const response = await fetch('/api/mobile/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        message: prompt,
        image: imageBase64,
        mode: 'standard',
      }),
    });

    if (!response.ok) throw new Error("Image edit failed");
    const result = await response.json();
    return result.text || "Image editing complete.";
  } catch (error) {
    throw error;
  }
};

export const generateAssignment = async (params: AssignmentParams): Promise<string> => {
  try {
    const response = await fetch('/api/mobile/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    });

    if (!response.ok) throw new Error("Assignment generation failed");
    const result = await response.json();
    return result.text || "Error generating content.";
  } catch (error) {
    throw error;
  }
};
