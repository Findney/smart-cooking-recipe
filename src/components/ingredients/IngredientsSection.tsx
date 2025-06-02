import React from "react";
import IngredientItem from "./IngredientsItem";

interface Ingredient {
  id: number;
  imageUrl: string;
  name: string;
  stock: number;
  unit: string;
}

interface Props {
  ingredients: Ingredient[];
}

const IngredientSection: React.FC<Props> = ({ ingredients }) => {
  if (!ingredients || ingredients.length === 0) {
    return <div className="text-center text-gray-500">No expiring ingredients</div>;
  }

  const firstTwo = ingredients.slice(0, 2);
  const rest = ingredients.slice(2);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {firstTwo.map((item) => (
          <IngredientItem key={item.id} {...item} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-4">
            {rest.map((item) => (
              <IngredientItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSection;
