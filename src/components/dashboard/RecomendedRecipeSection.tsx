"use client";

import React from "react";
import CategorySection from "@/components/recipes/RecipesSection";

interface Recipe {
    id: number;
    title: string;
    imageUrl: string;
    cookingTime: string;
}

interface Props {
    recipes: Recipe[];
}

export default function RecommendedRecipeSection({ recipes }: Props) {
    return (
        <section>
            {recipes.length > 0 ? (
                <CategorySection categoryName="Recommended Recipe" items={recipes} />
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-gray-600 text-center">
                    <p>No recommended recipes available at the moment.</p>
                </div>
            )}
        </section>
    );
}
