import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    pending: [],
    delivered: [],
    refused: [],

  },
  reducers: {
    
    getOrders:(state, action) => {
      state.allOrders = action.payload;
    },
    getPending:(state, action) => {
      state.pending = action.payload;
    },
    getDelivered:(state, action) => {
      state.delivered = action.payload;
    },
    getRefused:(state, action) => {
      state.refused = action.payload;
    },
    updateOrder:(state, action) => {
      state.refused = action.payload;
    },
    
  },
});

export const {getOrders, getPending, getDelivered, getRefused} = orderSlice.actions;
export default orderSlice.reducer;