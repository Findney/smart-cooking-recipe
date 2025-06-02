"use client";

import React, { useRef, useState, useEffect } from "react";
import CardItem from "./recipesCardItem";

interface Item {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
}

interface CategorySectionProps {
  categoryName: string;
  items: Item[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ categoryName, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      setShowArrows(el.scrollWidth > el.clientWidth);
      const card = el.querySelector("div > div");
      if (card) setCardWidth(card.clientWidth + 16);
    }
  }, [items]);

  const visibleCount = () => {
    if (!scrollRef.current || cardWidth === 0) return 1;
    return Math.floor(scrollRef.current.clientWidth / cardWidth);
  };

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -cardWidth * visibleCount(), behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: cardWidth * visibleCount(), behavior: "smooth" });
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-[20px] font-bold text-black mb-4">{categoryName}</h2>

      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {items.map((item) => (
            <CardItem
              key={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>

        {showArrows && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-background shadow rounded-full p-2 hidden group-hover:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   className="text-black">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-background shadow rounded-full p-2 hidden group-hover:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                   className="text-black">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
