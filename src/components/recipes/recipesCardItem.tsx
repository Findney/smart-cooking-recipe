import React from "react";
import Link from "next/link";

interface CardItemProps {
  id: number;
  imageUrl: string;
  title: string;
  cookingTime: string;
}

const RecipeCardItem: React.FC<CardItemProps> = ({ imageUrl, title, cookingTime, id }) => {
  return (
    <Link href={`/recipes/${id}`} className="w-60 min-w-60 no-underline">
      <div
        data-show-description="true"
        className="p-4 bg-background rounded-lg outline outline-1 outline-border inline-flex flex-col justify-start items-start gap-4 hover:shadow-md transition-shadow"
      >
        <img className="w-full h-60 object-cover" src={imageUrl} alt={title} />
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="text-foreground text-base font-normal leading-snug">
            {title}
          </div>
          <div className="text-foreground text-base font-semibold leading-snug">
            {cookingTime} minutes
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCardItem;
