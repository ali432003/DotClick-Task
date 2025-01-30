import { configureStore } from '@reduxjs/toolkit';
import DarkModeSlice from './slices/DarkModeSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import cartCountSlice from './slices/cartCountSlice';

export const store = configureStore({
  reducer: {
    darkMode: DarkModeSlice,
    product: productSlice,
    user: userSlice,
    cartCount : cartCountSlice
  },
})