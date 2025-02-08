import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  patientDetails,
  updatePatient,
} from "../../store/patient/patientSlice";
import {
  Breadcrumbs,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const PatientUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, patient } = useSelector((state) => state.getPatients);

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    kin_name: "",
    kin_relation: "",
    kin_phone: "",
    marital_status: "single",
    payment_method: "cash",
    insurance_provider: "",
    insurance_policy_number: "",
  });

  useEffect(() => {
    dispatch(patientDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (patient) {
      setFormData({ ...patient });
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePatient({ id, formData }));
    navigate(`/patients/${id}`);
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
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
          Patient Update
        </Typography>
      </Breadcrumbs>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <div style={{ marginBottom: "16px" }}>
            <Typography align="center" variant="h4" gutterBottom>
              Update Patient Details
            </Typography>{" "}
          </div>

          {loading && <Loader />}
          {error && <Message severity="error">{error}</Message>}

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "16px",
              marginTop: "16px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Middle Name"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Marital Status"
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Next of Kin Name"
                    name="kin_name"
                    value={formData.kin_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Next of Kin Relation"
                    name="kin_relation"
                    value={formData.kin_relation}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Next of Kin Phone"
                    name="kin_phone"
                    value={formData.kin_phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Payment Method"
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="insurance">Insurance</MenuItem>
                  </TextField>
                </Grid>
                {formData.payment_method === "insurance" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Insurance Provider"
                        name="insurance_provider"
                        value={formData.insurance_provider}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Policy Number"
                        name="insurance_policy_number"
                        value={formData.insurance_policy_number}
                        onChange={handleChange}
                      />
                    </Grid>
                  </>
                )}
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Update Patient
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    </>
  );
};

export default PatientUpdate;
