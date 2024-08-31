'use client'

import { useAppDispatch } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/features/product/productSlice";
import { ChangeEvent } from "react";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products by title..."
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
};

export default SearchBar;