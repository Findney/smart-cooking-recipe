import React from "react";
import CategorySection from "@/components/recipes/recipesSection";

// TODO: connect to supabase
const categories = [
  {
    categoryName: "Fruits",
    items: [
      { id: 1, imageUrl: "https://placehold.co/208x247", title: "Apple", price: "$2" },
      { id: 2, imageUrl: "https://placehold.co/208x247", title: "Banana", price: "$1" },
    ],
  },
  {
    categoryName: "Vegetables",
    items: [
      { id: 3, imageUrl: "https://placehold.co/208x247", title: "Carrot", price: "$1.5" },
      { id: 4, imageUrl: "https://placehold.co/208x247", title: "Broccoli", price: "$2.5" },
    ],
  },
  {
    categoryName: "Snacks",
    items: [
      { id: 5, imageUrl: "https://placehold.co/208x247", title: "Chips", price: "$3" },
      { id: 6, imageUrl: "https://placehold.co/208x247", title: "Cookies", price: "$4" },
    ],
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
