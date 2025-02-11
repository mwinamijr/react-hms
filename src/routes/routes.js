import { createHashRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layout/MainLayout";
import MinimalLayout from "../layout/MinimalLayout";
import AuthLogin from "../pages/authentcation/Login";
import Dashboard from "../pages/Dashboard";
import AddPatients from "../pages/patients/AddPatients";
import Merge from "../pages/patients/Merge";
import Movement from "../pages/patients/Movement";
import Patients from "../pages/patients/Patients";
import UploadPatients from "../pages/patients/UploadPatients";
import PatientDetails from "../pages/patients/PatientDetails";
import PatientUpdate from "../pages/patients/PatientUpdate";
import VisitList from "../pages/patients/visit/VisitList";
import VisitDetails from "../pages/patients/visit/VisitDetails";
import VisitUpdate from "../pages/patients/visit/VisitUpdate";
import AddVisit from "../pages/patients/visit/AddVisit";
import DepartmentList from "../pages/management/department/DepartmentList";
import DepartmentDetails from "../pages/management/department/DepartmentDetails";
import DepartmentUpdate from "../pages/management/department/UpdateDepartment";
import AddDepartment from "../pages/management/department/AddDepartment";
import UploadDepartment from "../pages/management/department/UploadDepartment";
import UserList from "../pages/users/UserList";
import UserDetails from "../pages/users/UserDetails";
import AddUser from "../pages/users/AddUser";
import UserUpdate from "../pages/users/UserUpdate";
import UploadUser from "../pages/users/UploadUser";

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
        { path: ":id", element: <PatientDetails /> },
        { path: ":id/edit", element: <PatientUpdate /> },
        { path: "add", element: <AddPatients /> },
        { path: "upload", element: <UploadPatients /> },
        { path: "merge", element: <Merge /> },
        { path: "movement", element: <Movement /> },
        { path: "visits", element: <VisitList /> },
        { path: "visits/:id", element: <VisitDetails /> },
        { path: "visits/:id/edit", element: <VisitUpdate /> },
        { path: "visits/add", element: <AddVisit /> },
      ],
    },
    {
      path: "management/departments",
      children: [
        { path: "", element: <DepartmentList /> },
        { path: ":id", element: <DepartmentDetails /> },
        { path: ":id/edit", element: <DepartmentUpdate /> },
        { path: "add", element: <AddDepartment /> },
        { path: "upload", element: <UploadDepartment /> },
      ],
    },
    {
      path: "users",
      children: [
        { path: "", element: <UserList /> },
        { path: ":id", element: <UserDetails /> },
        { path: ":id/edit", element: <UserUpdate /> },
        { path: "add", element: <AddUser /> },
        { path: "upload", element: <UploadUser /> },
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
