import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  departmentDetails,
  updateDepartment,
} from "../../../store/management/departmentSlice";
import {
  Breadcrumbs,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

const DepartmentUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, department } = useSelector(
    (state) => state.getDepartments
  );

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(departmentDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (department) {
      setFormData({ ...department });
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDepartment({ id, formData }));
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate(`/management/departments/${id}`);
    }, 2000); // Show success message for 2 seconds before navigating
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
          to="/management/departments"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Departments
        </Link>
        <Typography color="primary" fontWeight={600}>
          Department Update
        </Typography>
      </Breadcrumbs>

      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography align="center" variant="h4" gutterBottom>
            Update Department Details
          </Typography>

          {loading && <Loader />}
          {error && <Message severity="error">{error}</Message>}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Short Name"
                  name="short_name"
                  value={formData.short_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Update Department
            </Button>
          </form>
        </Paper>
      </Container>

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
          Department updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DepartmentUpdate;
