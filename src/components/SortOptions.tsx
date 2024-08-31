'use client';

import { useAppDispatch } from "@/lib/hooks";
import { sortProducts } from "@/lib/features/product/productSlice";
import React from "react";

const SortOptions = () => {
  const dispatch = useAppDispatch();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split('-');
    dispatch(sortProducts({ sortBy: sortBy as 'price' | 'rating', order: order as 'asc' | 'desc' }));
  };

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select
        id="sort"
        onChange={handleSortChange}
        className="border rounded px-2 py-1 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;