import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Patients from "../pages/Patients";
import Medical from "../pages/Medical";
import Finance from "../pages/Finance";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="medical" element={<Medical />} />
          <Route path="finance" element={<Finance />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
