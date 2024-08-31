import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "@/types/models/Product";

interface IProductState {
  products: IProduct[];
  filteredProducts: IProduct[];
  tableData: IProduct[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

type SetTableDataPayloadType = {
  currentPage: number;
};

type SortProductsPayloadType = {
  sortBy: 'price' | 'rating';
  order: 'asc' | 'desc';
};

const initialState: IProductState = {
  products: [],
  filteredProducts: [],
  tableData: [],
  currentPage: 0,
  totalPages: 0,
  searchQuery: ''
};

const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.totalPages = Math.ceil(action.payload.length / 10);
      state.currentPage = 1;
      state.tableData = state.filteredProducts.slice(0, 10);
    },
    setTableData(state, action: PayloadAction<SetTableDataPayloadType>) {
      state.currentPage = action.payload.currentPage;
      const start = (state.currentPage - 1) * 10;
      const end = state.currentPage * 10;
      state.tableData = state.filteredProducts.slice(start, end);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      state.totalPages = Math.ceil(state.filteredProducts.length / 10);
      state.currentPage = 1;
      state.tableData = state.filteredProducts.slice(0, 10);
    },
    sortProducts(state, action: PayloadAction<SortProductsPayloadType>) {
      const { sortBy, order } = action.payload;

      state.filteredProducts = state.filteredProducts.sort((a, b) => {
        if (sortBy === 'price') {
          return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'rating') {
          return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
      });

      state.tableData = state.filteredProducts.slice(0, 10);
    },
  },
});

export const { setProducts, setTableData, setSearchQuery, sortProducts } = productSlice.actions;
export default productSlice.reducer;