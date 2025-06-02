"use client";

import React from "react";
import CategorySection from "@/components/recipes/RecipesSection"; // pastikan path-nya sesuai struktur project-mu

// Mock data untuk resep
const recommendedRecipes: any[] = [
  {
    id: 1,
    title: "Nasi Goreng Spesial",
    imageUrl: "/images/bot.png",
    cookingTime: "30",
  },
];

// Mock data untuk bahan yang akan kedaluwarsa
const expiringIngredients: any[] = [
  { id: "ing1", name: "Dada Ayam Fillet", daysLeft: 2 },
  { id: "ing2", name: "Sawi Hijau", daysLeft: 3 },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Bagian Recommended Recipe */}
      <section>
        {recommendedRecipes.length > 0 ? (
          <CategorySection categoryName="Recommended Recipe" items={recommendedRecipes} />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-gray-600 text-center">
            <p>No recommended recipes available at the moment.</p>
          </div>
        )}
      </section>

      {/* Bagian Ingredients Expiring Soon */}
      <section>
        <h2 className="text-[20px] font-bold text-gray-800 mb-4">
          Ingredients Expiring Soon (Next 7 Days)
        </h2>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          {expiringIngredients.length > 0 ? (
            <ul className="space-y-3">
              {expiringIngredients.map((ingredient) => (
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
    </div>
  );
}
