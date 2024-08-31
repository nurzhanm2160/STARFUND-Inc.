'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setTableData } from "@/lib/features/product/productSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { totalPages, currentPage } = useAppSelector(state => state.productReducer);

  const handlePageChange = (page: number) => {
    dispatch(setTableData({ currentPage: page }));
  };

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-4 py-2 mx-1 border rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;