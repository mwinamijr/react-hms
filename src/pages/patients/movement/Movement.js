import React from "react";
import { useSelector } from "react-redux";
import AdminPatientMovement from "./AdminPatientMovement";
import CashierPatientMovement from "./CashierPatientMovement";

const BaseMovement = () => {
  const { userInfo } = useSelector((state) => state.getUsers);

  if (!userInfo) return <p>Loading...</p>;

  return userInfo.user.role === "cashierr" ? (
    <CashierPatientMovement />
  ) : (
    <AdminPatientMovement />
  );
};

export default BaseMovement;
