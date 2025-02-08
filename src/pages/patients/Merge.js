import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Box,
} from "@mui/material";
import { listPatients } from "../../store/patient/patientSlice"; // Assuming this is the correct path
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const MergePatients = () => {
  const dispatch = useDispatch();

  const { patients, loading, error } = useSelector(
    (state) => state.getPatients
  );

  const [patient1, setPatient1] = useState("");
  const [patient2, setPatient2] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(listPatients()); // Fetch patients when the page is loaded
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patient1 || !patient2) {
      setMessage("Please select both patients to merge.");
    } else if (patient1 === patient2) {
      setMessage("You cannot merge the same patient.");
    } else {
      setMessage("Merging functionality will be handled later by the backend.");
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Merge Patients
      </Typography>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="patient1-label">Select Patient 1</InputLabel>
          <Select
            labelId="patient1-label"
            value={patient1}
            onChange={(e) => setPatient1(e.target.value)}
            label="Select Patient 1"
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {`${patient.first_name} ${patient.last_name}`}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose the first patient to merge</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="patient2-label">Select Patient 2</InputLabel>
          <Select
            labelId="patient2-label"
            value={patient2}
            onChange={(e) => setPatient2(e.target.value)}
            label="Select Patient 2"
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {`${patient.first_name} ${patient.last_name}`}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose the second patient to merge</FormHelperText>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Merge Patients
        </Button>
      </Box>

      {/* Message */}
      {message && (
        <Message severity="error" align="center" sx={{ marginTop: 2 }}>
          {message}
        </Message>
      )}

      {/* Loading and Error Messages */}
      {loading && <Loader />}
      {error && (
        <Message severity="error" align="center">
          {error}
        </Message>
      )}
    </div>
  );
};

export default MergePatients;
