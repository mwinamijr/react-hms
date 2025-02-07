import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Add, CloudUpload, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, deletePatient } from "../redux/slices/patientsSlice";

const Patients = () => {
  const dispatch = useDispatch();
  const { patients, loading } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Patients List
      </Typography>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" startIcon={<Add />}>
          Add New Patient
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
        >
          Bulk Upload
        </Button>
      </div>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search Patients..."
        style={{ marginBottom: "20px" }}
      />

      {/* Patients Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Patient Number",
                "Name",
                "Phone",
                "DOB",
                "Reg Date",
                "Gender",
                "Insurance No.",
                "Status",
                "Action",
              ].map((header) => (
                <TableCell key={header} style={{ fontWeight: "bold" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.patientNumber}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.phoneNumber}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.registrationDate}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.insuranceNumber}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => dispatch(deletePatient(patient.id))}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Patients;
