import React from "react";
import CategorySection from "@/components/recipes/recipesSection";

const generateItems = (count: number, prefix: string, startId: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    imageUrl: "https://placehold.co/208x247",
    title: `${prefix} Item ${i + 1}`,
    price: `$${(i + 1) * 1.5}`,
  }));

const categories = [
  {
    categoryName: "Category 1",
    items: generateItems(20, "Cat1", 1),
  },
  {
    categoryName: "Category 2",
    items: generateItems(5, "Cat2", 101),
  },
  {
    categoryName: "Category 3",
    items: generateItems(10, "Cat3", 201),
  },
];

const CategoryListPage = () => {
  return (
    <div className="p-6 space-y-8">
      {categories.map((category) => (
        <CategorySection
          key={category.categoryName}
          categoryName={category.categoryName}
          items={category.items}
        />
      ))}
    </div>
  );
};

export default CategoryListPage;
