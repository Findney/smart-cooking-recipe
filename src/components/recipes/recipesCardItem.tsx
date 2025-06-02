import React from "react";

interface CardItemProps {
  imageUrl: string;
  title: string;
  cookingTime: string;
}

const RecipesCardItem: React.FC<CardItemProps> = ({ imageUrl, title, cookingTime }) => {
  return (
    <div
      data-show-description="true"
      className="min-w-60 p-4 bg-background rounded-lg outline outline-1 outline-offset-[-1px] outline-border inline-flex flex-col justify-start items-start gap-4"
    >
      <img className="self-stretch h-60 object-cover" src={imageUrl} alt={title} />
      <div className="w-52 flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-start">
          <div className="flex-1 text-foreground text-base font-normal leading-snug">{title}</div>
        </div>
        <div className="inline-flex justify-start items-start">
          <div className="text-foreground text-base font-semibold leading-snug">{cookingTime}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipesCardItem;
