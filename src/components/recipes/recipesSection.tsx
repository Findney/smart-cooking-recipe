import React from "react";
import CardItem from "./recipesCardItem";

interface Item {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
}

interface RecipesSectionProps {
  categoryName: string;
  items: Item[];
}

const RecipesSection: React.FC<RecipesSectionProps> = ({ categoryName, items }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">{categoryName}</h2>
      <div className="flex gap-4 overflow-x-auto">
        {items.map((item) => (
          <CardItem
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipesSection;
