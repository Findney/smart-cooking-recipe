"use client";

import React, { useEffect, useState } from "react";
import CategorySection from "@/components/recipes/recipesSection";
import { fetchRecipesByCategory } from "@/lib/fetchRecipes";

const RecipesDisplay = () => {
  const [groupedItems, setGroupedItems] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetchRecipesByCategory().then(setGroupedItems).catch(console.error);
  }, []);

  return (
    <div className="space-y-12">
      {Object.entries(groupedItems).map(([category, items]) => (
        <CategorySection key={category} categoryName={category} items={items} />
      ))}
    </div>
  );
};

export default RecipesDisplay;
