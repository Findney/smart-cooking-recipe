import React from "react";

interface CardItemProps {
  imageUrl: string;
  title: string;
  price: string;
}

const RecipesCardItem: React.FC<CardItemProps> = ({ imageUrl, title, price }) => {
  return (
    <div
      className="min-w-60 max-w-xs bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ring-1 ring-gray-200"
    >
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-green-600 font-bold text-base">{price}</p>
      </div>
    </div>
  );
};


export default RecipesCardItem;
