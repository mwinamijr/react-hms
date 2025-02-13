import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./slices/customizationSlice"; // New slice-based reducer
import userReaducer from "./user/userSlice";
import patientReducer from "./patient/patientSlice";
import visitReducer from "./patient/visitSlice";
import departmentReducer from "./management/departmentSlice";
import insuranceCompanyReducer from "./management/insuranceCompanySlice";
import insuredPatientReducer from "./management/insuredPatientSlice";
import hospitaItemReducer from "./management/hospitalItemSlice";
import itemTypeReducer from "./management/itemTypeSlice";

const store = configureStore({
  reducer: {
    customization: customizationReducer,
    getUsers: userReaducer,
    getPatients: patientReducer,
    getVisits: visitReducer,
    getDepartments: departmentReducer,
    getInsuranceCompanies: insuranceCompanyReducer,
    getInsuredPatients: insuredPatientReducer,
    getHospitalItems: hospitaItemReducer,
    getItemTypes: itemTypeReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
