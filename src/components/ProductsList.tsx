'use client'

import Image from "next/image";
import img from "../../public/image.webp";
import {IProduct} from "@/types/models/Product";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setProducts} from "@/lib/features/product/productSlice";
import {addProduct} from "@/lib/features/cart/cartSlice";

interface IProps {
  products: IProduct[]
}

export const ProductsList:FC<IProps> = ({products}) => {
  const dispatch = useAppDispatch()
  const { tableData} = useAppSelector(state => state.productReducer)

  useEffect(() => {
    dispatch(setProducts(products))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const handleAddToCart = (product: IProduct) => {
    dispatch(addProduct(product));
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tableData.map(product => (
        <div key={product.id} className="border p-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover w-full h-40"
          />
          <h2 className="text-lg font-bold mt-4 dark:text-white">{product.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
          <p className="text-lg font-semibold mt-4 dark:text-white">${product.price.toFixed(2)}</p>
          <p className="text-yellow-500 mt-2">Rating: {product.rating} ★</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;