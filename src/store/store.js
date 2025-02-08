import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./slices/customizationSlice"; // New slice-based reducer
import userReaducer from "./user/userSlice";
import patientReducer from "./patient/patientSlice";

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    getUsers: userReaducer,
    getPatients: patientReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
