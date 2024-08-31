'use client';

import { useAppSelector } from "@/lib/hooks";

const CartHeader = () => {
  const { totalQuantity, totalPrice } = useAppSelector(state => state.cartReducer);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 dark:text-white shadow p-4 z-50 flex justify-between items-center">
      <div className="text-lg font-bold">My E-commerce</div>
      <div className="flex items-center">
        <span className="mr-4">Items: {totalQuantity}</span>
        <span>Total: ${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartHeader;