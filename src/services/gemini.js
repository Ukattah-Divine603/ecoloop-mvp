import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzeWasteImage(base64Image, mimeType) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Analyze this waste image.

Return ONLY valid JSON.

{
  "material": "",
  "recyclable": "",
  "category": "",
  "decomposition": "",
  "points": 0
}

Rules:
- recyclable must be Yes, No, or Organic
- category must be one of:
  Plastic Waste
  Organic Waste
  Paper Waste
  Metal Waste
  Glass Waste
  Electronic Waste
  General Waste
- points must be between 1 and 5
- no markdown
- no explanation
- return valid JSON only
`,
            },
            {
              inlineData: {
                mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
