import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { patientDetails } from "../../store/patient/patientSlice";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { Email, Phone, Home, Person } from "@mui/icons-material";

const PatientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, patient } = useSelector((state) => state.getPatients);

  useEffect(() => {
    dispatch(patientDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Home
        </Link>
        <Link
          to="/management/patients"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Patients
        </Link>
        <Typography color="primary" fontWeight={600}>
          Patient Details
        </Typography>
      </Breadcrumbs>

      <Card elevation={3} sx={{ p: 2 }}>
        <div style={{ marginBottom: "16px" }}>
          <Typography align="center" variant="h4" gutterBottom>
            Update Patient Details
          </Typography>
        </div>
        <CardContent>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message severity="error">{error}</Message>
          ) : patient ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} textAlign="center">
                <Avatar sx={{ width: 120, height: 120, margin: "auto" }}>
                  <Person fontSize="large" />
                </Avatar>
                <Typography variant="h5" fontWeight={600} sx={{ mt: 2 }}>
                  {patient.first_name} {patient.middle_name} {patient.last_name}
                </Typography>
                <Chip
                  label={patient.is_active ? "Active" : "Inactive"}
                  color={patient.is_active ? "success" : "error"}
                  sx={{ mt: 1, fontSize: 14 }}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Basic Information
                  </Typography>
                  <Typography>ID: {patient.patient_number}</Typography>
                  <Typography>Gender: {patient.gender || "N/A"}</Typography>
                  <Typography>DOB: {patient.date_of_birth}</Typography>
                  <Typography>
                    Marital Status: {patient.marital_status}
                  </Typography>
                  <Typography>
                    Occupation: {patient.occupation || "N/A"}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography>
                    <Email /> {patient.email}
                  </Typography>
                  <Typography>
                    <Phone /> {patient.phone}
                  </Typography>
                  <Typography>
                    <Home /> {patient.address}
                  </Typography>
                </Paper>

                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Next of Kin
                  </Typography>
                  <Typography>Name: {patient.kin_name || "N/A"}</Typography>
                  <Typography>
                    Relation: {patient.kin_relation || "N/A"}
                  </Typography>
                  <Typography>Phone: {patient.kin_phone || "N/A"}</Typography>
                </Paper>

                <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Insurance & Payment
                  </Typography>
                  <Typography>
                    Payment Method: {patient.payment_method}
                  </Typography>
                  {patient.payment_method === "insurance" && (
                    <>
                      <Typography>
                        Provider: {patient.insurance_provider}
                      </Typography>
                      <Typography>
                        Policy #: {patient.insurance_policy_number}
                      </Typography>
                    </>
                  )}
                </Paper>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/patients/${id}/edit`}
                      color="primary"
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/patients/${id}/print`}
                    >
                      Print Profile
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Message severity="error">No patient found</Message>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;
