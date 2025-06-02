"use client";

import React, { useEffect, useState } from "react";
import CategorySection from "@/components/recipes/RecipesSection";
import { fetchExpiringInventory } from "@/lib/fetchInventory";
import ExpiringIngredientsSection from "@/components/dashboard/IngredientsExpiringSoon";

const recommendedRecipes = [
    {
        id: 1,
        title: "Nasi Goreng Spesial",
        imageUrl: "/images/bot.png",
        cookingTime: "30",
    },
];

export default function DashboardPage() {
    const [expiringIngredients, setExpiringIngredients] = useState<any[]>([]);

    useEffect(() => {
        fetchExpiringInventory()
            .then(data => {
                const today = new Date();
                const enriched = data
                    .map(item => {
                        const expDate = new Date(item.expiration_date);
                        const diffTime = expDate.getTime() - today.getTime();
                        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return {
                            id: item.inventory_id,
                            name: item.ingredients.name,
                            daysLeft,
                        };
                    })
                    .sort((a, b) => a.daysLeft - b.daysLeft);
                setExpiringIngredients(enriched);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <section>
                {recommendedRecipes.length > 0 ? (
                    <CategorySection categoryName="Recommended Recipe" items={recommendedRecipes} />
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-gray-600 text-center">
                        <p>No recommended recipes available at the moment.</p>
                    </div>
                )}
            </section>

            <ExpiringIngredientsSection />
            {/* <section>
                <h2 className="text-[20px] font-bold text-gray-800 mb-4">
                    Ingredients Expiring Soon (Next 7 Days)
                </h2>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                    {expiringIngredients.length > 0 ? (
                        <ul className="space-y-3">
                            {expiringIngredients.map(ingredient => (
                                <li
                                    key={ingredient.id}
                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-yellow-100 transition-colors duration-200"
                                >
                                    <span className="text-gray-700">{ingredient.name}</span>
                                    <span
                                        className={`text-sm font-medium px-2 py-1 rounded-full ${ingredient.daysLeft <= 3
                                            ? "bg-red-200 text-red-800"
                                            : ingredient.daysLeft <= 5
                                                ? "bg-yellow-200 text-yellow-800"
                                                : "bg-green-200 text-green-800"
                                            }`}
                                    >
                                        {ingredient.daysLeft} days left
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-center">
                            No ingredients are expiring in the next 7 days. Great job!
                        </p>
                    )}
                </div>
            </section> */}
        </div>
    );
}
