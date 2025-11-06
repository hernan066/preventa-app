// src/redux/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
    error: null,
  },
  reducers: {
    setPosition: (state, action) => {
      const { latitude, longitude, accuracy, timestamp } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
      state.accuracy = accuracy;
      state.timestamp = timestamp;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosition, setError } = locationSlice.actions;
export default locationSlice.reducer;
