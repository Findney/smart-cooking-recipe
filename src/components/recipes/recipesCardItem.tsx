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
        className="p-4 ring-gray-200 bg-background rounded-lg outline outline-1 outline-border inline-flex flex-col justify-start items-start gap-4 shadow-lg hover:shadow-2xl transition-shadow"
      >
        <img className="w-full h-60 object-cover" src={imageUrl} alt={title} />
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <div className="text-lg font-semibold text-gray-800">
            {title}
          </div>
          <div className="text-green-600 font-bold text-base">
            {cookingTime} minutes
          </div>
        </div>

        {/* <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-green-600 font-bold text-base">{price}</p> */}
      </div>
    </Link>
  );
};

export default RecipeCardItem;
