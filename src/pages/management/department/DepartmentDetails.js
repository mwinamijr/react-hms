import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { departmentDetails } from "../../../store/management/departmentSlice";
import {
  Breadcrumbs,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Paper,
} from "@mui/material";

const DepartmentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, department } = useSelector(
    (state) => state.getDepartments
  );

  useEffect(() => {
    dispatch(departmentDetails(id));
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
          to="/management/departments"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Departments
        </Link>
        <Typography color="primary" fontWeight={600}>
          Department Details
        </Typography>
      </Breadcrumbs>

      <Card elevation={3} sx={{ p: 2 }}>
        <div style={{ marginBottom: "16px" }}>
          <Typography align="center" variant="h4" gutterBottom>
            Update Department Details
          </Typography>
        </div>
        <CardContent>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message severity="error">{error}</Message>
          ) : department ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Department Information
                  </Typography>
                  <Typography>Nme: {department.name}</Typography>
                  <Typography>
                    Short Name: {department.short_name || "N/A"}
                  </Typography>
                  <Typography>Description: {department.description}</Typography>
                </Paper>

                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/management/departments/${id}/edit`}
                      color="primary"
                    >
                      Edit Department
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Message severity="error">No department found</Message>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentDetails;
