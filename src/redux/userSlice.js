import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "orders",
  initialState: {
    deliveryTruck: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.deliveryTruck = action.payload;
      localStorage.setItem("deliveryData", JSON.stringify(action.payload));
    },
    getUser: (state) => {
      const user = localStorage.getItem("deliveryData");
      if (user) {
        state.deliveryTruck = JSON.parse(user);
      }
    },
    clearUser: (state) => {
      state.deliveryTruck = null;
      localStorage.removeItem("deliveryData");
    },
  },
});

export const { setUser, getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
