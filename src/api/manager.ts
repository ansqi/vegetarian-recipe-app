import axios from 'axios'
const API_KEY = 'XXXXXXXX'; // Sostituisci con la tua chiave API Spoonacular
const API_BASE_URL_SEARCH = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`; // Usiamo i posts come esempio per le ricette
const API_BASE_URL_RECIPE_DETAILS = `https://api.spoonacular.com/recipes/{id}/information?apiKey=${API_KEY}`; // Endpoint per i dettagli della ricetta
export type Recipe = {
  id: number
  title: string
  image: string
  imageType: string
}
//l'oggetto che mappa la risposta dell'api, in questo caso la risposta è un array di oggetti
type RecipeSearchResponse = {
  results: Recipe[];
};
export type RecipeDetail = {
  id: number
  title: string
  image: string
  readyInMinutes: number
  instructions: string
  preparationMinutes: number
}
// Funzione per cercare le ricette in base alla query di ricerca  
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await axios.get<RecipeSearchResponse>(
    API_BASE_URL_SEARCH,
    { params: { diet: 'vegetarian', query } },
  )

  return response.data.results.map((recipe: any) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    imageType: recipe.imageType,
  }));
}
// Funzione per ottenere i dettagli di una ricetta specifica
export async function getRecipeDetails(id: number): Promise<RecipeDetail> {
  const response = await axios.get<RecipeDetail>(
    API_BASE_URL_RECIPE_DETAILS.replace('{id}', id.toString())
  );
  return response.data;
}