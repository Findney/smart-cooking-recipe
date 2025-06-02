"use client";

import React from "react";

interface Ingredient {
    id: number;
    name: string;
    daysLeft: number;
}

interface Props {
    ingredients: Ingredient[];
}

export default function ExpiringIngredientsSection({ ingredients }: Props) {
    return (
        <section>
            <h2 className="text-[20px] font-bold text-gray-800 mb-4">
                Ingredients Expiring Soon (Next 7 Days)
            </h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                {ingredients.length > 0 ? (
                    <ul className="space-y-3">
                        {ingredients.map(ingredient => (
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
        </section>
    );
}
