 import { createSlice } from "@reduxjs/toolkit";

// 🧠 Recupera los datos guardados al iniciar la app
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const superUser = localStorage.getItem("superUser")
  ? JSON.parse(localStorage.getItem("superUser"))
  : null;

const version = localStorage.getItem("version")
  ? JSON.parse(localStorage.getItem("version"))
  : null;

const superUserData = localStorage.getItem("superUserData")
  ? JSON.parse(localStorage.getItem("superUserData"))
  : null;

const authSlice = createSlice({
  name: "authDelivery",
  initialState: {
    user,
    token,
    superUser,
    version,
    superUserData,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { id, accessToken, superUser, version, superUserData } =
        action.payload;

      state.user = id;
      state.token = accessToken;
      state.superUser = superUser;
      state.version = version;
      state.superUserData = superUserData;

      // 💾 Guarda en localStorage
      localStorage.setItem("user", JSON.stringify(id));
      localStorage.setItem("token", JSON.stringify(accessToken));
      localStorage.setItem("superUser", JSON.stringify(superUser));
      localStorage.setItem("version", JSON.stringify(version));
      localStorage.setItem("superUserData", JSON.stringify(superUserData));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.superUser = null;
      state.version = null;
      state.superUserData = null;

      // 🧹 Limpia el localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("superUser");
      localStorage.removeItem("version");
      localStorage.removeItem("superUserData");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.authDelivery.user;
export const selectCurrentToken = (state) => state.authDelivery.token;

