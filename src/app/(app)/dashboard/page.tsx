"use client";

import React, { useEffect, useState } from "react";
import { fetchExpiringIngredientsWithDaysLeft, fetchRecommendedRecipesByIngredients } from "@/lib/fetchRecomendedRecipe";
import ExpiringIngredientsSection from "@/components/dashboard/IngredientsExpiringSoon";
import RecommendedRecipeSection from "@/components/dashboard/RecomendedRecipeSection";

export default function DashboardPage() {
    const [expiringIngredients, setExpiringIngredients] = useState<any[]>([]);
    const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const ingredients = await fetchExpiringIngredientsWithDaysLeft();
                setExpiringIngredients(ingredients);

                const ingredientIds = ingredients.map(i => i.ingredient_id);
                if (ingredientIds.length === 0) {
                    setRecommendedRecipes([]);
                    return;
                }

                const recipes = await fetchRecommendedRecipesByIngredients(ingredientIds);
                setRecommendedRecipes(recipes);
            } catch (error) {
                console.error(error);
                setExpiringIngredients([]);
                setRecommendedRecipes([]);
            }
        })();
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <RecommendedRecipeSection recipes={recommendedRecipes} />
            <ExpiringIngredientsSection ingredients={expiringIngredients} />
        </div>
    );
}
