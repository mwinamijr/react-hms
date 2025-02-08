import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  createPatient,
  resetCreateState,
} from "../../store/patient/patientSlice";
import Message from "../../components/Message";

const AddPatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successCreate } = useSelector(
    (state) => state.getPatients
  );

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      navigate("/management/patients");
    }
  }, [dispatch, successCreate, navigate]);

  const [formData, setFormData] = React.useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: null,
    email: "",
    phone: "",
    address: "",
    occupation: "",
    kin_name: "",
    kin_relation: "",
    kin_phone: "",
    national_id: "",
    marital_status: "single",
    priority: false,
    payment_method: "cash",
    insurance_provider: "",
    insurance_policy_number: "",
    is_active: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date_of_birth: dayjs(formData.date_of_birth).format("YYYY-MM-DD"),
    };
    dispatch(createPatient(formattedData));
  };

  return (
    <Card sx={{ padding: 3, maxWidth: 800, margin: "auto", marginTop: 4 }}>
      <Link to="/management/patients" style={{ textDecoration: "none" }}>
        <Button variant="outlined" sx={{ marginBottom: 2 }}>
          Go Back
        </Button>
      </Link>
      <CardContent>
        {/* Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Add Patient
        </Typography>
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
              {/* Personal Info */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middle_name"
                  value={formData.middle_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={formData.date_of_birth}
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {/* Additional Info */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </Grid>
              {/* Next of Kin */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Next of Kin Name"
                  name="kin_name"
                  value={formData.kin_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Next of Kin Relation"
                  name="kin_relation"
                  value={formData.kin_relation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Next of Kin Phone"
                  name="kin_phone"
                  value={formData.kin_phone}
                  onChange={handleChange}
                />
              </Grid>
              {/* Other Details */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="National ID"
                  name="national_id"
                  value={formData.national_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.priority}
                      onChange={handleCheckboxChange}
                      name="priority"
                    />
                  }
                  label="Priority Patient"
                />
              </Grid>
              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : null
                  }
                >
                  {loading ? "Adding patient ..." : "Add Patient"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddPatient;
