import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApi } from "../api/apiAuth";
import userReducer from "./userSlice";
import mapReducer from "./mapSlice";
import locationReducer from "./locationSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    authDelivery: authReducer,
     user: userReducer,
     location: locationReducer,
   [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});