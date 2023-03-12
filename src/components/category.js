import * as React from "react";

const Category = ({ categories, selectedCategory, handleChangeCategory }) => {
  return (
    <ul className="category-wrapper">
      <CategoryItem
        selectedCategory={selectedCategory}
        category="ALL"
        onClick={() => handleChangeCategory("ALL")}
      />

      {categories.map((category, idx) => (
        <CategoryItem
          key={idx}
          selectedCategory={selectedCategory}
          category={category}
          onClick={() => handleChangeCategory(category)}
        />
      ))}
    </ul>
  );
};

const CategoryItem = ({ selectedCategory, category, onClick }) => {
  return (
    <div
      className={
        selectedCategory === category
          ? "category-item selected"
          : "category-item non-selected"
      }
      onClick={onClick}
    >
      <li>{category}</li>
    </div>
  );
};

export default Category;
