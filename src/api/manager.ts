import axios from 'axios'
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const API_BASE_URL_SEARCH = 'https://api.spoonacular.com/recipes/complexSearch'
const API_BASE_URL_RECIPE_DETAILS = 'https://api.spoonacular.com/recipes/{id}/information'

function requireApiKey(): string {
  if (!API_KEY) {
    throw new Error('Chiave Spoonacular mancante: configura VITE_SPOONACULAR_API_KEY nel file .env.')
  }
  return API_KEY
}

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
  analyzedInstructions: { steps: Step[] }[]
  preparationMinutes: number
}

export type Step = {
  number: number
  step: string
}
// Funzione per cercare le ricette in base alla query di ricerca  
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const response = await axios.get<RecipeSearchResponse>(
    API_BASE_URL_SEARCH,
    { params: { apiKey: requireApiKey(), diet: 'vegetarian', query } },
  )

  return response.data.results.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    imageType: recipe.imageType,
  }));
}
// Funzione per ottenere i dettagli di una ricetta specifica
export async function getRecipeDetails(id: number): Promise<RecipeDetail> {
  const response = await axios.get<RecipeDetail>(
    API_BASE_URL_RECIPE_DETAILS.replace('{id}', id.toString()),
    { params: { apiKey: requireApiKey() } },
  );
  return response.data;
}