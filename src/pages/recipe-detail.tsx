import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { type RecipeDetail as RecipeDetailData } from "../api/manager";
import { getRecipeDetails } from "../api/manager";
export const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchDetails = async () => {
      const recipeId = Number(id);

      if (!id || !Number.isInteger(recipeId) || recipeId <= 0) {
        setError("ID ricetta non valido.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const details = await getRecipeDetails(recipeId);
        if (active) setRecipe(details);
      } catch (err) {
        console.error("Errore durante il recupero dei dettagli:", err);
        if (active) setError("Impossibile caricare i dettagli della ricetta.");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchDetails();

    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return null;

  return (
    <main className="recipe-detail">
      <div className="page-title">
        <h1>{recipe.title}</h1>
      </div>
      <div className="recipe-detail-layout">
        <img className="recipe-detail-image" src={recipe.image} alt={recipe.title} />
        <ul className="recipe-detail-info">
          <li><b>Tempo di preparazione:</b> {recipe.readyInMinutes} minuti</li>
          {recipe.analyzedInstructions[0].steps.map((item) => (
            <li key={item.number}> {item.step}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

