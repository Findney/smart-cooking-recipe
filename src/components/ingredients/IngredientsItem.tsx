import React from "react";

interface IngredientItemProps {
  imageUrl: string;
  name: string;
  stock: number;
  unit: string;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ imageUrl, name, stock, unit }) => {
  return (
    <div className="w-80 h-20 min-h-20 bg-surface inline-flex flex-col justify-start items-center">
      <div className="self-stretch px-4 py-2 inline-flex justify-start items-start gap-4">
        <div className="h-16 inline-flex flex-col justify-start items-start overflow-hidden">
          <div className="inline-flex justify-start items-start gap-2.5">
            <img className="w-14 h-14" src={imageUrl} alt={name} />
          </div>
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start overflow-hidden">
          <div className="text-on-surface text-base font-normal leading-normal tracking-wide">{name}</div>
          <div className="text-on-surface-variant text-sm font-normal leading-tight tracking-tight">{stock} {unit}</div>
        </div>
      </div>
    </div>
  );
};

export default IngredientItem;
