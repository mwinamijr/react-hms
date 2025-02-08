import { createHashRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layout/MainLayout";
import MinimalLayout from "../layout/MinimalLayout";
import AuthLogin from "../pages/authentcation/Login";
import Dashboard from "../pages/Dashboard";
import Finance from "../pages/Finance";
import Medical from "../pages/Medical";
import AddPatients from "../pages/patients/AddPatients";
import Merge from "../pages/patients/Merge";
import Movement from "../pages/patients/Movement";
import Patients from "../pages/patients/Patients";
import UploadPatients from "../pages/patients/UploadPatients";
import Visit from "../pages/patients/Visit";

// Main Routes
const MainRoutes = {
  path: "/",
  element: <ProtectedRoute element={<MainLayout />} />,
  children: [
    { path: "/", element: <Dashboard /> },
    {
      path: "dashboard",
      children: [{ path: "", element: <Dashboard /> }],
    },
    {
      path: "management/patients",
      children: [
        { path: "", element: <Patients /> },
        { path: "add", element: <AddPatients /> },
        { path: "upload", element: <UploadPatients /> },
        { path: "merge", element: <Merge /> },
        { path: "visit", element: <Visit /> },
        { path: "movement", element: <Movement /> },
      ],
    },
    {
      path: "users",
      children: [
        { path: "doctors", element: <Medical /> },
        { path: "nurses", element: <Finance /> },
        { path: "patients", element: <Patients /> },
      ],
    },
    {
      path: "utils",
      children: [{ path: "util-shadow", element: <Patients /> }],
    },
  ],
};

// Authentication Routes
const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [{ path: "login", element: <AuthLogin /> }],
};

// Combine Routes
const router = createHashRouter([MainRoutes, AuthenticationRoutes], {
  basename: "/",
});

export default router;
