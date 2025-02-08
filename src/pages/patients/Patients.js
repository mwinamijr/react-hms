import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumbs,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  PersonAdd,
  CloudUpload,
  PersonOff,
} from "@mui/icons-material";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listPatients, deletePatient } from "../../store/patient/patientSlice";

const PatientList = () => {
  const dispatch = useDispatch();

  const { loading, error, patients } = useSelector(
    (state) => state.getPatients
  );

  useEffect(() => {
    dispatch(listPatients());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePatient(id));
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Home
        </Link>
        <Typography color="textPrimary">Patients</Typography>
      </Breadcrumbs>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Patients
      </Typography>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          component={Link}
          to="/management/patients/add"
        >
          Add Patient
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
          component={Link}
          to="/management/patients/upload"
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

      {/* Error Message */}
      {error && <Message severity="error">{error}</Message>}

      {/* Loading Indicator */}
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{`${patient.first_name} ${patient.last_name}`}</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{patient.department?.name || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/management/patients/${patient.id}`}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/management/patients/${patient.id}/edit`}
                        color="success"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(patient.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <PersonOff sx={{ fontSize: 50, color: "gray" }} />
                    <Typography variant="body1" color="textSecondary">
                      No patients found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PatientList;
