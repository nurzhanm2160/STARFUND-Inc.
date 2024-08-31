import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from "@/types/models/Product";

interface CartProduct extends IProduct {
  quantity: number;
}

interface CartState {
  products: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const existingProduct = state.products.find(p => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      state.totalPrice += product.price;
      state.totalQuantity += 1;
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.products.find(p => p.id === productId);

      if (existingProduct) {
        state.totalPrice -= existingProduct.price * existingProduct.quantity;
        state.totalQuantity -= existingProduct.quantity;
        state.products = state.products.filter(p => p.id !== productId);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;