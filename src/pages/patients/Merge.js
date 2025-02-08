import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPatients } from "../../store/patient/patientSlice";

const Merge = () => {
  const dispatch = useDispatch();

  const { patients } = useSelector((state) => state.getPatients);
  console.log(patients);
  useEffect(() => {
    dispatch(listPatients);
  });
  return <div>Merge</div>;
};

export default Merge;
