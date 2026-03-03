import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateSafariItinerary(destination: string, duration: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a detailed safari itinerary for ${duration} in ${destination}. 
    Return the response in JSON format with the following structure:
    {
      "tripName": "string",
      "days": [
        { "day": number, "activity": "string", "location": "string", "highlights": ["string"] }
      ],
      "packingList": ["string"]
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripName: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                activity: { type: Type.STRING },
                location: { type: Type.STRING },
                highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          packingList: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
