import React from "react";
import { useSelector } from "react-redux";
import AdminMovementDetails from "./AdminMovementDetails";
import CashierMovementDetails from "./CashierMovementDetails";
import Loader from "../../../components/Loader";

const BaseMovement = () => {
  const { userInfo } = useSelector((state) => state.getUsers);

  if (!userInfo) return <Loader />;

  return userInfo.user.role === "cashier" ? (
    <CashierMovementDetails />
  ) : (
    <AdminMovementDetails />
  );
};

export default BaseMovement;
