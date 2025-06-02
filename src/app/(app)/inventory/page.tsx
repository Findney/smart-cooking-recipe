import React from "react";
import Calendar from "@/components/ingredients/Calendar";
import IngredientSection from "@/components/ingredients/IngredientsSection";
import CategorySection from "@/components/recipes/RecipesSection";

const InventoryPage = async () => {
  // mock or fetched data example
  const ingredients = [
    { id: 1, name: "Onion", stock: 3, unit: "pcs", imageUrl: "https://placehold.co/56x56" },
    { id: 2, name: "Garlic", stock: 5, unit: "cloves", imageUrl: "https://placehold.co/56x56" },
    { id: 3, name: "Tomato", stock: 2, unit: "pcs", imageUrl: "https://placehold.co/56x56" },
  ];

  const recommended = [
    { id: 15, title: 'Chicken Soto', cooking_time: 75, imageUrl: 'https://cdn0-production-images-kly.akamaized.net/...', cookingTime: '75 min' },
    { id: 16, title: 'Fried Rice', cooking_time: 30, imageUrl: 'https://placehold.co/60x60', cookingTime: '30 min' },
  ];

  return (
    <div className="p-4 space-y-8">
      <div className="text-xl font-bold">Welcome back, here's your inventory info:</div>
      <Calendar />
      <div>
        <div className="text-lg font-semibold">Ingredients expiring soon</div>
        <IngredientSection ingredients={ingredients} />
      </div>
      <div>
        <div className="text-lg font-semibold">Recommended Recipes</div>
        <CategorySection categoryName="Suggested" items={recommended} />
      </div>
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-green-500 text-white text-2xl shadow">+</button>
    </div>
  );
};

export default InventoryPage;
