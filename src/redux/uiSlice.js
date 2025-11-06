import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    hambugerMenu: false,
    cartMenu: false,
    loginModal: false,
    menu: 'main'
  },
  reducers: {
    openHambugerMenu: (state) => {
      state.hambugerMenu = true;
    },
    closeHambugerMenu: (state) => {
      state.hambugerMenu = false;
    },
    openCartMenu: (state) => {
      state.cartMenu = true;
    },
    closeCartMenu: (state) => {
      state.cartMenu = false;
    },
    openLoginModal: (state) => {
      state.loginModal = true;
    },
    closeLoginModal: (state) => {
      state.loginModal = false;
    },
    setMenu: (state, actions) => {
      state.menu = actions.payload;
    },
  },
});

export const {
  openHambugerMenu,
  closeHambugerMenu,
  openCartMenu,
  closeCartMenu,
  openLoginModal,
  closeLoginModal,
  setMenu
} = uiSlice.actions;
export default uiSlice.reducer;
