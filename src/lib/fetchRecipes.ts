import { supabase } from "@/lib/supabaseClient";

export async function fetchRecipesByCategory() {
  const { data, error } = await supabase
    .from("recipes")
    .select("recipe_id, title, cooking_time, image_url, category")
    .order("category", { ascending: true });

  if (error) throw error;

  const grouped = data.reduce((acc: Record<string, any[]>, recipe) => {
    const category = recipe.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push({
      id: recipe.recipe_id,
      imageUrl: recipe.image_url,
      title: recipe.title,
      CookingTime: `${recipe.cooking_time}`,
    });
    return acc;
  }, {});

  return grouped;
}
