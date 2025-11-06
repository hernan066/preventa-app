import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    all: [],
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.all = action.payload;
    },
  },
});

export const { getAllProducts } = productsSlice.actions;
export default productsSlice.reducer;
