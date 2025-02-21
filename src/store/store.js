import { configureStore } from "@reduxjs/toolkit";
import userReaducer from "./user/userSlice";
import patientReducer from "./patient/patientSlice";
import visitReducer from "./patient/visitSlice";
import departmentReducer from "./management/departmentSlice";
import insuranceCompanyReducer from "./management/insuranceCompanySlice";
import insuredPatientReducer from "./management/insuredPatientSlice";
import hospitaItemReducer from "./management/hospitalItemSlice";
import itemTypeReducer from "./management/itemTypeSlice";
import paymentReducer from "./finance/paymentSlice";
import invoiceReducer from "./finance/invoiceSlice";
import visitCommentReducer from "./management/visitCommentSlice";

const store = configureStore({
  reducer: {
    getUsers: userReaducer,
    getPatients: patientReducer,
    getVisits: visitReducer,
    getDepartments: departmentReducer,
    getInsuranceCompanies: insuranceCompanyReducer,
    getInsuredPatients: insuredPatientReducer,
    getHospitalItems: hospitaItemReducer,
    getItemTypes: itemTypeReducer,
    getPayments: paymentReducer,
    getInvoices: invoiceReducer,
    getVisitComments: visitCommentReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
