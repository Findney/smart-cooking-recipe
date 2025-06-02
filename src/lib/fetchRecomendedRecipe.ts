import { supabase } from "./supabaseClient";

interface ExpiringIngredient {
  id: number;
  name: string;
  ingredient_id: number;
  daysLeft: number;
}

interface RecommendedRecipe {
  id: number;
  title: string;
  imageUrl: string | null;
  cookingTime: string;
  matchCount: number;
}

export async function fetchExpiringIngredientsWithDaysLeft() : Promise<ExpiringIngredient[]> {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const nextWeekStr = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const { data, error } = await supabase
    .from("inventory")
    .select(`
      inventory_id,
      expiration_date,
      ingredients (
        ingredient_id,
        name
      )
    `)
    .gte("expiration_date", todayStr)
    .lte("expiration_date", nextWeekStr);

  if (error) throw error;
  if (!data) return [];

  return data.map(item => {
    const expDate = new Date(item.expiration_date);
    const diffTime = expDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      id: item.inventory_id,
      name: item.ingredients.name,
      ingredient_id: item.ingredients.ingredient_id,
      daysLeft,
    };
  }).sort((a, b) => a.daysLeft - b.daysLeft);
}

export async function fetchRecommendedRecipesByIngredients(
  ingredientIds: number[]
): Promise<RecommendedRecipe[]> {
  if (ingredientIds.length === 0) return [];

  // Fetch recipe-ingredient links for the given ingredient IDs
  const { data: recipeLinks, error: linkError } = await supabase
    .from("recipe_ingredients")
    .select("recipe_id, ingredient_id")
    .in("ingredient_id", ingredientIds);

  if (linkError || !recipeLinks) throw linkError || new Error("No recipe links found");

  // Count unique ingredient matches per recipe
  const recipeIngredientMap: Record<number, Set<number>> = {};
  recipeLinks.forEach(link => {
    if (!recipeIngredientMap[link.recipe_id]) {
      recipeIngredientMap[link.recipe_id] = new Set();
    }
    recipeIngredientMap[link.recipe_id].add(link.ingredient_id);
  });

  const recipeIds = Object.keys(recipeIngredientMap).map(id => Number(id));

  if (recipeIds.length === 0) return [];

  // Fetch recipe details
  const { data: recipes, error: recipeError } = await supabase
    .from("recipes")
    .select("recipe_id, title, image_url, cooking_time")
    .in("recipe_id", recipeIds);

  if (recipeError || !recipes) throw recipeError || new Error("No recipes found");

  return recipes
    .map(recipe => ({
      id: recipe.recipe_id,
      title: recipe.title,
      imageUrl: recipe.image_url,
      cookingTime: recipe.cooking_time?.toString() ?? "N/A",
      matchCount: recipeIngredientMap[recipe.recipe_id]?.size || 0,
    }))
    .sort((a, b) => b.matchCount - a.matchCount);
}
