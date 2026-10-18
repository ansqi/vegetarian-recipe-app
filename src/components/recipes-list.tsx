import { useState, useEffect } from "react";
import { type Recipe, searchRecipes } from "../api/manager";
import { Link } from "react-router-dom";

type RecipeListProps = {
  searchQuery: string;
};

export function RecipesList({ searchQuery }: RecipeListProps) {
  // Stato per conservare la lista delle ricette
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // Stato per indicare se è in corso un caricamento
  const [isLoading, setIsLoading] = useState(false);
  // Stato per gestire eventuali errori
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    // Non eseguiamo la ricerca se la query è vuota
    if (!searchQuery) {
      setRecipes([]); // Pulisci le ricette se la query è vuota
      setError(null);
      setIsLoading(false);
      return () => {
        active = false;
      };
    }

    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Effettua la richiesta GET con Axios
        const response = await searchRecipes(searchQuery);

        if (active) setRecipes(response);
      } catch (err) {
        if (active) {
          console.error("Errore durante il recupero delle ricette:", err);
          setError("Impossibile caricare le ricette. Riprova più tardi.");
          setRecipes([]); // Pulisci le ricette in caso di errore
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    fetchRecipes(); // Chiama la funzione di fetching

    return () => {
      active = false;
    };
  }, [searchQuery]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Risultati per: "{searchQuery}"</h2>
      <table
        className="recipes-table"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr className="recipes-table-header">
            <th>
              ID
            </th>
            <th>
              Titolo Ricetta
            </th>
            <th>
              Immagine
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="recipes-table-message recipes-table-loading">
                Caricamento...
              </td>
            </tr>
          ) : recipes.length === 0 && searchQuery ? (
            <tr>
              <td colSpan={3} className="recipes-table-message">
                Nessuna ricetta trovata per "{searchQuery}".
              </td>
            </tr>
          ) : recipes.length === 0 && !searchQuery ? (
            // Stato iniziale: nessuna ricerca ancora effettuata
            <tr>
              <td colSpan={3} className="recipes-table-message">
                Inserisci una parola chiave per iniziare la ricerca.
              </td>
            </tr>
          ) : (
            // Mappa e renderizza le ricette se sono disponibili
            recipes.map((recipe) => (
              <tr key={recipe.id} className="recipes-table-row">
                <td>
                  <Link to={`/recipes/${recipe.id}`}>{recipe.id}</Link>
                </td>
                <td>{recipe.title}</td>
                <td>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
