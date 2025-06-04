"use client";

import React, { useEffect, useState } from "react";
import AddIngredientPopup from "@/components/inventory/AddIngredients";
import IngredientSection from "@/components/inventory/IngredientsSection";
import CalendarSection from "@/components/inventory/Calendar";
import RecipeSection from "@/components/recipes/RecipesSection";
import { fetchRecommendedRecipesByIngredients } from "@/lib/fetchRecomendedRecipe";
import { fetchExpiringInventory } from "@/lib/fetchInventory";

export default function InventoryPage() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const rawExpiring = await fetchExpiringInventory();
                const today = new Date();

                const enriched = rawExpiring.map(item => {
                    const expDate = new Date(item.expiration_date);
                    const diffTime = expDate.getTime() - today.getTime();
                    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    return {
                        ...item,
                        daysLeft,
                        ingredient_id: item.ingredients.ingredient_id,
                    };
                }).sort((a, b) => a.daysLeft - b.daysLeft);

                setIngredients(enriched);

                const ingredientIds = enriched.map(i => i.ingredient_id);
                if (ingredientIds.length === 0) {
                    setRecommendedRecipes([]);
                    return;
                }

                const recipes = await fetchRecommendedRecipesByIngredients(ingredientIds);
                setRecommendedRecipes(recipes);
            } catch (error) {
                console.error(error);
                setIngredients([]);
                setRecommendedRecipes([]);
            }
        })();
    }, [refreshKey]);

    return (
        <div className="relative p-6">
            <CalendarSection />

            <h1 className="text-2xl font-bold text-black mb-4">Inventory</h1>
            <IngredientSection key={refreshKey} ingredients={ingredients} />

            <h2 className="text-xl font-semibold mt-8 mb-4">Recommended Recipes</h2>
            <RecipeSection categoryName="Recommended" items={recommendedRecipes} />

            <button
                className="fixed bottom-6 right-6 px-5 py-3 rounded-full shadow-md"
                onClick={() => setPopupOpen(true)}
            >
                +
            </button>

            <AddIngredientPopup
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                onSave={() => setRefreshKey(prev => prev + 1)}
            />
        </div>
    );
}
