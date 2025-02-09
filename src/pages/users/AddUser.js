import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  Select,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { register, resetCreateState } from "../../store/user/userSlice";
import { listDepartments } from "../../store/management/departmentSlice";
import Message from "../../components/Message";

const roles = [
  "Doctor",
  "Dentist",
  "Nurse",
  "Receptionist",
  "Cashier",
  "Lab Technician",
  "Radiology Staff",
  "Pharmacist",
  "Admin",
];

const AddUser = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successCreate } = useSelector(
    (state) => state.getUsers
  );

  // Accessing department list from the Redux store
  const { departments } = useSelector((state) => state.getDepartments); // Assuming departments are in the departmentSlice

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    qualification: "",
    date_of_birth: null,
    department: "",
    role: "",
    gender: "",
    is_staff: false,
    is_active: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      setTimeout(() => {
        dispatch(resetCreateState())
          .then(() => {
            setSnackbarMessage("User Added successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
          })
          .catch(() => {
            setSnackbarMessage("Failed to add user. Please try again.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          });
        navigate("/users");
      }, 2000);
    }
  }, [dispatch, successCreate, navigate]);

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // List required fields
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "password",
      "qualification",
      "department",
      "role",
    ];

    // Check if any required field is empty
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formattedData = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? dayjs(formData.date_of_birth).format("YYYY-MM-DD")
        : null,
    };

    dispatch(register(formattedData));
  };

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Home
        </Link>
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          Users
        </Link>
        <Typography color="textPrimary">Add User</Typography>
      </Breadcrumbs>

      <Card sx={{ padding: 3, maxWidth: 800, margin: "auto", marginTop: 4 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Add User
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Personal Information */}

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="first_name">First Name</InputLabel>
                  <OutlinedInput
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    label="First Name"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="middle_name">Middle Name</InputLabel>
                  <OutlinedInput
                    id="middle_name"
                    name="middle_name"
                    type="text"
                    value={formData.middle_name}
                    onChange={(e) =>
                      setFormData({ ...formData, middle_name: e.target.value })
                    }
                    label="Middle Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="last_name">Last Name</InputLabel>
                  <OutlinedInput
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    label="Last Name"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="phone">Phone</InputLabel>
                  <OutlinedInput
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    label="Phone"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={24} md={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    label="Email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="passwordConfirm"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="qualification">Qualification</InputLabel>
                  <OutlinedInput
                    id="qualification"
                    type="qualification"
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    label="Qualification"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="department">Department</InputLabel>
                  <Select
                    id="department"
                    name="department" // Ensure name is specified
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    {departments.map((department) => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Role Selection */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role.toLowerCase()}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    required
                  >
                    <MenuItem key="male" value="male">
                      Male
                    </MenuItem>
                    <MenuItem key="female" value="female">
                      Female
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Date Fields */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={formData.date_of_birth}
                      onChange={(date) =>
                        handleDateChange(date, "date_of_birth")
                      }
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              {/* Status */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_staff}
                      onChange={handleCheckboxChange}
                      name="is_staff"
                    />
                  }
                  label="Staff Member"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_active}
                      onChange={handleCheckboxChange}
                      name="is_active"
                    />
                  }
                  label="Active User"
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
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {loading ? "Adding user ......" : "Add User"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
        {error && <Message severity="error">{error}</Message>}
      </Card>
    </div>
  );
};

export default AddUser;
