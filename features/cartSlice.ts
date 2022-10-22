import { createSlice } from '@reduxjs/toolkit';
import Product from '../schemas/Product';
const initialState: {
    countItems: number, 
    items: Product[], 
    totalItems: Product[],
    totalPrice: number
} = {countItems: 0, 
    items: [], 
    totalItems: [], 
    totalPrice: 0}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, {payload}) => {
            state.countItems = state.countItems + 1
            const productFind = state.items.find((item) => {
                return item.id === payload.id
            });
            
            state.totalItems = [...state.totalItems, payload];
            !productFind ? state.items = [...state.items, payload] : "";
        },
        removeProduct: (state, {payload}) => {
            state.countItems = state.countItems - 1
            const productFind = state.totalItems.findIndex((item) => {
                return item.id === payload.id
            });
            state.totalItems.splice(productFind, 1);
        },
        clearProduct: (state, {payload}) => {
            const localItems: Product[] = [...state.totalItems];
            const newItems: Product[] = [];
            localItems.forEach((item) => {
                item.id !== payload.id ? newItems.push(item) : state.countItems -= 1;
            })
            state.totalItems = newItems;
        },
        totalPrice: (state) => {
            let priceOfTotalItems: number = 0;
            state.totalItems.forEach((item) => {
                priceOfTotalItems += Number(item.price);
            })
            state.totalPrice = priceOfTotalItems;
        }
    }
});

export const {addProduct, removeProduct, clearProduct, totalPrice} = cartSlice.actions;

export default cartSlice.reducer;