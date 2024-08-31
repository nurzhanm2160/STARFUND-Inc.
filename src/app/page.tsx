import axios from "axios";
import {IProduct} from "@/types/models/Product";
import ProductsList from "@/components/ProductsList";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import SortOptions from "@/components/SortOptions";
import CartHeader from "@/components/Cart";

export default async function Home() {
  const {data: products} = await axios.get<IProduct[]>("https://my-json-server.typicode.com/nurzhanm2160/db/products");

  return (
    <div className="container mx-auto py-8">
      <CartHeader />
      <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
      <SortOptions />
      <SearchBar />
      <ProductsList products={products} />
      <Pagination />
    </div>
  );
}
