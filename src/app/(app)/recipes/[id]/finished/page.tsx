'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  SparklesIcon,
  ClockIcon,
  ScaleIcon,
  HomeIcon,
  ChartBarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function CookingFinishedPage() {
  const supabase = createClientComponentClient();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipeAndLog = useCallback(async () => {
    if (!id || Array.isArray(id)) return;

    try {
      setLoading(true);

      // 1. Ambil data resep
      const { data: recipeData, error: recipeError, status: recipeStatus } = await supabase
        .from('recipes')
        .select('title, image_url, cooking_time, protein, fat, carbs, calory')
        .eq('recipe_id', id)
        .single();

      if (recipeError && recipeStatus !== 406) {
        throw recipeError;
      }
      if (!recipeData) {
        setRecipe(null);
        return;
      }
      setRecipe(recipeData);

      // 2. Ambil sesi user
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }

      const user = sessionData?.session?.user;
      if (!user?.id) {
        console.warn('User tidak ditemukan dalam session');
        return;
      }
      const user_id = user.id;

      // 3. Tambahkan ke meal_log
      const { error: mealLogError } = await supabase.from('meal_log').insert([
        {
          recipe_id: id,
          cooked_at: new Date().toISOString().split('T')[0],
          timestamp: new Date().toISOString(),
        },
      ]);
      if (mealLogError) {
        console.error('Failed to insert meal_log:', mealLogError);
      }

      // 4. Ambil bahan resep
      const { data: ingredientsUsed, error: ingError, status: ingStatus } = await supabase
        .from('recipe_ingredients')
        .select('ingredient_id, quantity')
        .eq('recipe_id', id);

      if (ingError && ingStatus !== 406) {
        throw ingError;
      }
      if (!ingredientsUsed || ingredientsUsed.length === 0) {
        console.warn('No recipe ingredients found');
        return;
      }

      // 5. Kurangi stok bahan di inventory
      for (const item of ingredientsUsed) {
        const { data: inventoryItem, error: invError } = await supabase
          .from('inventory')
          .select('inventory_id, quantity')
          .eq('user_id', user_id)
          .eq('ingredient_id', item.ingredient_id)
          .maybeSingle();

        if (invError) {
          console.error('Failed to read inventory:', invError);
          continue;
        }
        if (!inventoryItem) {
          console.warn('Ingredient not found in inventory:', item.ingredient_id);
          continue;
        }

        const oldQty = inventoryItem.quantity || 0;
        const usedQty = item.quantity || 0;
        const newQty = Math.max(oldQty - usedQty, 0);

        const { error: updateError } = await supabase
          .from('inventory')
          .update({ quantity: newQty })
          .eq('inventory_id', inventoryItem.inventory_id);

        if (updateError) {
          console.error('Failed to update inventory:', updateError);
        }
      }
    } catch (error) {
      console.error('Error in fetchRecipeAndLog:', error);
    } finally {
      setLoading(false);
    }
  }, [id, supabase]);

  useEffect(() => {
    fetchRecipeAndLog();
  }, [fetchRecipeAndLog]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recipe not found.</h2>
        <Link href="/recipes" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Back to Recipe List
        </Link>
      </div>
    );
  }

  const totalCookTime = recipe.cooking_time || 0;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-10 text-center max-w-lg w-full transform transition-all hover:scale-105 duration-300">
        <SparklesIcon className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">Congratulations!</h1>
        <p className="text-lg text-gray-600 mb-6">
          You have successfully cooked <strong className="text-green-700">{recipe.title}</strong>!
        </p>
        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-8 shadow-md">
          <img
            src={recipe.image_url || '/images/placeholder-nasgor.jpg'}
            alt={`Gambar ${recipe.title}`}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
          <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
            <ClockIcon className="w-10 h-10 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cooking Time</p>
              <p className="text-xl font-bold text-green-700">{totalCookTime} minutes</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
            <ScaleIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Estimated Calories</p>
              <p className="text-xl font-bold text-blue-700">{recipe.calory} kcal</p>
            </div>
          </div>
        </div>

        <div className="mb-10 text-left bg-gray-50 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-gray-700 mb-2 text-center sm:text-left">Other Nutrition Details:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-600">
            <p><span className="font-medium">Carbs:</span> {recipe.carbs}g</p>
            <p><span className="font-medium">Protein:</span> {recipe.protein}g</p>
            <p><span className="font-medium">Fat:</span> {recipe.fat}g</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href={`/recipes/${id}`} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Cook This Recipe Again
          </Link>
          <Link href="/recipes" className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
            <HomeIcon className="w-5 h-5 mr-2" />
            See Other Recipes
          </Link>
          <Link href="/nutrition-tracker" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Track Daily Nutrition
          </Link>
        </div>
      </div>
    </div>
  );
}
