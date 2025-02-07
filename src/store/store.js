import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./slices/customizationSlice"; // New slice-based reducer
import patientsReducer from "./patient/patientSlice";

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    getPatients: patientsReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
