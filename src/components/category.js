import * as React from "react";

const Category = ({ categories }) => {
  const selectedCategory = "ALL";
  return (
    <ul className="category-wrapper">
      <CategoryItem selectedCategory={selectedCategory} category="ALL" />

      {categories.map((category, idx) => (
        <CategoryItem
          key={idx}
          selectedCategory={selectedCategory}
          category={category}
        />
      ))}
    </ul>
  );
};

const CategoryItem = ({ selectedCategory, category }) => {
  return (
    <div
      className={
        selectedCategory === category
          ? "category-item selected"
          : "category-item non-selected"
      }
    >
      <li>{category}</li>
    </div>
  );
};

export default Category;
