import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  createDepartment,
  resetCreateState,
} from "../../../store/management/departmentSlice";
import Message from "../../../components/Message";

const AddDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successCreate } = useSelector(
    (state) => state.getDepartments
  );

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (successCreate) {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(resetCreateState());
        navigate("/management/departments");
      }, 2000); // Show message for 2 seconds before navigating
    }
  }, [dispatch, successCreate, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDepartment(formData));
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
        <Link
          to="/management/departments"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Departments
        </Link>
        <Typography color="textPrimary">Add Department</Typography>
      </Breadcrumbs>

      <Card sx={{ padding: 3, maxWidth: 800, margin: "auto", marginTop: 4 }}>
        <CardContent>
          {/* Title */}
          <Typography variant="h4" align="center" gutterBottom>
            Add Department
          </Typography>

          {error && <Message severity="error">{error}</Message>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Short Name"
                  name="short_name"
                  value={formData.short_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
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
                  {loading ? "Adding department ..." : "Add Department"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Department added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddDepartment;
