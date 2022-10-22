import sidebarSlice from '../features/sidebarSlice';
import productsSlice from '../features/productsSlice';
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../features/cartSlice';

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        sidebar: sidebarSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;