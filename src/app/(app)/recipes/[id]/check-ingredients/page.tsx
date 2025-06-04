'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase'; // Sesuaikan dengan tipe kamu
import { ArrowLeftIcon, CheckCircleIcon, PlayIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

type Ingredient = {
  id: string;
  name: string;
  quantity: string;
  notes?: string;
};

type Recipe = {
  id: string;
  title: string;
  ingredients: Ingredient[];
};

export default function CheckIngredientsPage() {
  const supabase = createClientComponentClient<Database>();
  const params = useParams<{ id: string }>();
  const recipeId = params.id;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchRecipeWithIngredients = async () => {
      setLoading(true);

      const { data: recipeData, error: recipeError } = await supabase
        .from('recipes')
        .select('recipe_id, title')
        .eq('recipe_id', recipeId)
        .single();

      if (recipeError || !recipeData) {
        console.error('Failed to fetch recipe:', recipeError);
        setLoading(false);
        return;
      }

      const { data: ingredientsData, error: ingredientsError } = await supabase
        .from('recipe_ingredients')
        .select(`
          id,
          quantity,
          ingredient_id,
          ingredients (
            name
          )
        `)
        .eq('recipe_id', recipeId);

      if (ingredientsError) {
        console.error('Failed to fetch recipe ingredients:', ingredientsError);
        setLoading(false);
        return;
      }

      const ingredients: Ingredient[] = (ingredientsData || []).map((ri) => ({
        id: ri.id.toString(),
        name: ri.ingredients?.name ?? 'Unknown',
        quantity: `${ri.quantity ?? '-'} ${''}`, // Satuan bisa disertakan jika perlu
      }));

      setRecipe({
        id: recipeData.recipe_id.toString(),
        title: recipeData.title,
        ingredients,
      });

      const initialChecks: Record<string, boolean> = {};
      ingredients.forEach(ing => {
        initialChecks[ing.id] = false;
      });
      setCheckedIngredients(initialChecks);

      setLoading(false);
    };

    fetchRecipeWithIngredients();
  }, [recipeId]);

  const handleCheckboxChange = (ingredientId: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
  };

  const allIngredientsChecked = recipe?.ingredients?.every(ing => checkedIngredients[ing.id]);

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="container mx-auto p-8 text-center">Recipe not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link href={`/recipes/${recipe.id}`} className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-150 group">
          <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-150" />
          Back to Recipe Details
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Checklist Ingredients for:</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{recipe.title}</h1>
          </div>
          {allIngredientsChecked && (
            <div className="mt-3 sm:mt-0 flex items-center text-green-600 bg-green-100 px-3 py-2 rounded-md">
              <CheckCircleIcon className="w-6 h-6 mr-2" />
              <span className="font-semibold">All ingredients ready!</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-6">
          Use this list to ensure all ingredients you need are ready before cooking.
        </p>

        {recipe.ingredients.length > 0 ? (
          <ul className="space-y-3">
            {recipe.ingredients.map(ingredient => (
              <li
                key={ingredient.id}
                className={`p-4 border rounded-lg flex items-start space-x-3 transition-all duration-200
                  ${checkedIngredients[ingredient.id] ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
              >
                <input
                  type="checkbox"
                  id={`ingredient-${ingredient.id}`}
                  checked={checkedIngredients[ingredient.id]}
                  onChange={() => handleCheckboxChange(ingredient.id)}
                  className="mt-1 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor={`ingredient-${ingredient.id}`} className="flex-grow cursor-pointer">
                  <span className={`block font-medium ${checkedIngredients[ingredient.id] ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                    {ingredient.quantity} {ingredient.name}
                  </span>
                  {ingredient.notes && (
                    <span className={`block text-sm ${checkedIngredients[ingredient.id] ? 'text-green-600 line-through' : 'text-gray-500'}`}>
                      ({ingredient.notes})
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No ingredients list for this recipe.</p>
          </div>
        )}

        {recipe.ingredients.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => {
                const allChecked = recipe.ingredients.every(ing => checkedIngredients[ing.id]);
                const newChecks: Record<string, boolean> = {};
                recipe.ingredients.forEach(ing => {
                  newChecks[ing.id] = !allChecked;
                });
                setCheckedIngredients(newChecks);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {allIngredientsChecked ? 'Uncheck All' : 'Check All'}
            </button>
            <Link
              href={`/recipes/${recipe.id}/start-cooking`}
              className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white inline-flex items-center justify-center
                ${allIngredientsChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
              aria-disabled={!allIngredientsChecked}
              onClick={(e) => {
                if (!allIngredientsChecked) e.preventDefault();
              }}
            >
              <PlayIcon className="w-5 h-5 mr-2 -ml-1" />
              Ready to Cook!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
