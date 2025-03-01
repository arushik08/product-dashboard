import { useEffect, useState } from "react";
import "../styles/filterBar.css";

type FilterBarProps = {
  onFilter: (category: string) => void;
  onSort: (order: string) => void;
};

const FilterBar = ({ onFilter, onSort }: FilterBarProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data])); 
  }, []);

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" onChange={(e) => onFilter(e.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by Price:</label>
        <select id="sort" onChange={(e) => onSort(e.target.value)}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
