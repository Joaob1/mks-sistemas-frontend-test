import { createSlice } from '@reduxjs/toolkit';
const initialState: {view: boolean} = {view: false}
export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        show: (state) => {
            state.view = true;
        },
        hide: (state) => {
            state.view = false;
        }
    }
});

export const {show, hide} = sidebarSlice.actions;

export default sidebarSlice.reducer;