import { supabase } from './supabaseClient';

export async function fetchTodayNutritionSummary() {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('meal_log')
    .select(`
      log_id,
      cooked_at,
      recipe_id,
      recipes (
        recipe_id,
        title,
        protein,
        fat,
        carbs,
        calory,
        image_url
      )
    `)
    .eq('cooked_at', today);

  if (error || !data) return null;

  const meals = data.map((log) => {
    const recipe = log.recipes;
    return {
      id: `meal-${log.log_id}`,
      recipeId: `${recipe.recipe_id}`,
      name: recipe.title,
      time: getMealTimeLabel(log.cooked_at),
      calories: recipe.calory ?? 0,
      macros: {
        carbs: recipe.carbs ?? 0,
        protein: recipe.protein ?? 0,
        fat: recipe.fat ?? 0,
      },
      imageUrl: recipe.image_url ?? '/images/default-placeholder.jpg',
    };
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

function getMealTimeLabel(cookedAt: string | null): string {
  return 'Makan Tidak Diketahui';
}
