import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./features/finance/paymentSlice";
import insuranceReducer from "./features/finance/insuranceSlice";

export const store = configureStore({
  reducer: {
    payment: paymentReducer,
    insurance: insuranceReducer,
  },
});
