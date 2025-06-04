import React from "react";
import IngredientItem from "./IngredientsItem";

interface Ingredient {
  inventory_id: number;
  quantity: number;
  expiration_date: string;
  ingredients: {
    ingredient_id: number;
    name: string;
    unit: string;
  };
}

interface Props {
  ingredients: Ingredient[];
}

const IngredientSection: React.FC<Props> = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return <div className="text-center">No expiring ingredients</div>;
  }

  // Transform ingredients into 2-row layout columns
  const columns: Ingredient[][] = [];
  for (let i = 0; i < ingredients.length; i += 2) {
    columns.push(ingredients.slice(i, i + 2));
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-6">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((item) => (
              <IngredientItem
                key={item.inventory_id}
                imageUrl="/images/cook.png"
                name={item.ingredients.name ?? "Unknown"}
                stock={item.quantity}
                unit={item.ingredients.unit ?? "pcs"}
              />
            ))}

          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSection;
