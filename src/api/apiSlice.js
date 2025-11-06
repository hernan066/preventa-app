import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../redux/authSlice";

const API = import.meta.env.REACT_APP_API_URL || "http://localhost:3040/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authDelivery.token;

    if (token) {
      headers.set("x-token", token);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // ✅ Manejar ambos posibles campos (status u originalStatus)
  const status = result?.error?.status || result?.error?.originalStatus;
  console.log("RTK Query result:", result);

  if (status === 403) {
    console.warn("Access token expired → trying refresh...");

    // Intentar refresh
    const refreshResult = await baseQuery(
      "/auth/deliveryApp/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = api.getState().authDelivery.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // Reintentar la petición original
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn("Refresh failed → logging out");
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
