"use client";

import React, { useEffect, useState } from "react";
import AddIngredientPopup from "@/components/inventory/AddIngredients";
import IngredientSection from "@/components/inventory/IngredientsSection";
import CalendarSection from "@/components/inventory/Calendar";
import RecipeSection from "@/components/recipes/RecipesSection";
import { fetchExpiringInventory } from "@/lib/fetchInventory";

export default function InventoryPage() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [ingredients, setIngredients] = useState<any[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const recommended = [
        {
            id: 15,
            title: "Chicken Soto",
            cookingTime: "75",
            imageUrl: "https://cdn0-production-images-kly.akamaized.net/...",
        },
        {
            id: 16,
            title: "Fried Rice",
            cookingTime: "30",
            imageUrl: "https://placehold.co/60x60",
        },
    ];

    useEffect(() => {
        fetchExpiringInventory()
            .then(setIngredients)
            .catch(console.error);
    }, [refreshKey]);

    return (
        <div className="relative p-6">
            <CalendarSection />

            <h1 className="text-2xl font-bold mb-4">Inventory</h1>
            <IngredientSection key={refreshKey} ingredients={ingredients} />

            <h2 className="text-xl font-semibold mt-8 mb-4">Recommended Recipes</h2>
            <RecipeSection categoryName="Recomended" items={recommended} />

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
