import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `
    You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page. Please respond in Italian.`;

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function getRecipeFromGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: `Ho questi ingredienti: ${ingredientsString}. Potresti suggerirmi una ricetta che posso preparare?`,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.7,
                maxOutputTokens: 1024,
            },
        });

        return response.text;

    } catch (err) {
        console.error("Errore nell'API Gemini:", err);

        if (err.message.includes('401') || err.message.includes('API_KEY_INVALID')) {
            throw new Error("Token non valido");
        } else if (err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED')) {
            throw new Error("Troppe richieste. Riprova tra qualche minuto");
        } else if (err.message.includes('503') || err.message.includes('UNAVAILABLE')) {
            throw new Error("Modello non disponibile. Riprova più tardi");
        } else {
            throw new Error("Errore nel recupero della ricetta: " + err.message);
        }
    }
}