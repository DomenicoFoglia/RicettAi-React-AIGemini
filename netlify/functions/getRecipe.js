import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
    You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Please respond in Italian.`;

export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { ingredients } = JSON.parse(event.body);

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: `Ho questi ingredienti: ${ingredients.join(", ")}. Potresti suggerirmi una ricetta che posso preparare?`,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.7,
                maxOutputTokens: 1024,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ recipe: response.text }),
        };
    } catch (err) {
        console.error("Errore:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Errore nel recupero della ricetta" }),
        };
    }
}