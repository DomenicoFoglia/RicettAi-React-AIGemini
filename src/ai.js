export async function getRecipeFromGemini(ingredientsArr) {
    try {
        const response = await fetch("/.netlify/functions/getRecipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);

        const data = await response.json();
        return data.recipe;

    } catch (err) {
        console.error("Errore:", err);
        throw new Error("Errore nel recupero della ricetta: " + err.message);
    }
}