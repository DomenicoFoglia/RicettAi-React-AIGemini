import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import IngredientList from "./IngredientsList";
import DomeRecipe from "./DomeRecipe";
import { getRecipeFromGemini } from "../ai";

function Main() {
    const [ingredients, setIngredient] = useState([]);
    const [recipeShown, setRecipeShown] = useState(false);
    const [recipeAi, setRecipeAi] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const recipeSection = useRef(null);

    function addIngredient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient").trim();
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredient(prev => [...prev, newIngredient]);
        }
        event.target.reset();
    }

    function removeIngredient(ingredientToRemove) {
        setIngredient(prev => prev.filter(i => i !== ingredientToRemove));
    }

    async function handleShowRecipe() {
        if (ingredients.length === 0) return;

        setLoading(true);
        setError(null);
        setRecipeShown(true);

        try {
            const result = await getRecipeFromGemini(ingredients);
            console.log("Ricetta ricevuta:", result);
            setRecipeAi(result);
        } catch (err) {
            setError("Errore nel recupero della ricetta");
        } finally {
            setLoading(false);
        }
    }

    async function toggleAndGenerateRecipe() {
        await handleShowRecipe();
    }

    function showIngredients() {
        return ingredients.length > 0 && (
            <IngredientList
                ingredients={ingredients}
                toggleAndGenerateRecipe={toggleAndGenerateRecipe}
                removeIngredient={removeIngredient}
                ref={recipeSection}
            />
        );
    }

    useEffect(function() {
        if(recipeSection.current !== null){
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipeAi])

    return (
        <main className="container py-5" style={{ maxWidth: "700px" }}>
            <div className="text-center mb-4">
                <p className="fs-5 fw-semibold text-secondary">
                    Aggiungi <span className="text-primary">ALMENO 4 ingredienti</span>
                </p>
            </div>

            <form
                onSubmit={addIngredient}
                className="d-flex justify-content-center gap-3 mb-4"
                id="ingredient-form"
            >
                <input
                    type="text"
                    className="form-control shadow-sm rounded-pill"
                    placeholder="es. farina"
                    aria-label="Add ingredient"
                    name="ingredient"
                    style={{ maxWidth: "350px" }}
                />
                <button
                    className="btn btn-primary rounded-pill px-4"
                    type="submit"
                >
                    Aggiungi
                </button>
            </form>

            {showIngredients()}

            {recipeShown && !loading && (
                <div className="card mt-4 shadow-sm p-3">
                    <DomeRecipe recipeText={recipeAi} />
                </div>
            )}

            {loading && (
                <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border text-primary" role="status" aria-label="Caricamento in corso">
                        <span className="visually-hidden">Caricamento in corso...</span>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-center text-danger mt-4 fw-semibold">
                    {error}
                </p>
            )}
        </main>
    );
}

export default Main;