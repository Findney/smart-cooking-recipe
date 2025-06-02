import { supabase } from './supabaseClient';

interface Recipe {
  recipe_id: string;
  title: string;
  category?: string;
  protein?: number;
  fat?: number;
  carbs?: number;
  calory?: number;
  image_url?: string;
}

interface MealLog {
  log_id: number;
  cooked_at: string;
  recipe_id: string;
  recipes: Recipe | null;
}

interface Meal {
  id: string;
  recipeId: string;
  name: string;
  category: string;
  calories: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  imageUrl: string;
}

interface NutritionSummary {
  date: string;
  totalCalories: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
  meals: Meal[];
}

export async function fetchTodayNutritionSummary(): Promise<NutritionSummary | null> {
  const today = new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD local time

  const { data, error } = await supabase
    .from('meal_log')
    .select(`
      log_id,
      cooked_at,
      recipe_id,
      recipes:recipe_id (
        recipe_id,
        title,
        category,
        protein,
        fat,
        carbs,
        calory,
        image_url
      )
    `)
    .eq('cooked_at', today);

  if (error || !data) return null;

  const meals: Meal[] = data.flatMap((log) => {
    const recipes = log.recipes;
    if (!recipes || (Array.isArray(recipes) && recipes.length === 0)) throw new Error(`Invalid recipe data for log ${log.log_id}`);

    // If recipes is an array, map each; if it's a single object, wrap in array
    const recipesArray = Array.isArray(recipes) ? recipes : [recipes];

    return recipesArray.map((recipe) => ({
      id: `meal-${log.log_id}`,
      recipeId: recipe.recipe_id,
      name: recipe.title,
      category: recipe.category ?? "N/A",
      calories: recipe.calory ?? 0,
      macros: {
        carbs: recipe.carbs ?? 0,
        protein: recipe.protein ?? 0,
        fat: recipe.fat ?? 0,
      },
      imageUrl: recipe.image_url ?? '/images/default-placeholder.jpg',
    }));
  });

  const totals = meals.reduce(
    (acc, meal) => {
      acc.totalCalories += meal.calories;
      acc.macros.carbs += meal.macros.carbs;
      acc.macros.protein += meal.macros.protein;
      acc.macros.fat += meal.macros.fat;
      return acc;
    },
    {
      totalCalories: 0,
      macros: { carbs: 0, protein: 0, fat: 0 },
    }
  );

  return {
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    totalCalories: totals.totalCalories,
    macros: totals.macros,
    meals,
  };
}
