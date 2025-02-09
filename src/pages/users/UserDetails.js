import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { userDetails } from "../../store/user/userSlice";
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
  Divider,
} from "@mui/material";
import {
  Email,
  Phone,
  Home,
  Person,
  Work,
  CalendarToday,
} from "@mui/icons-material";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, user } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(userDetails(id));
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
        <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
          Users
        </Link>
        <Typography color="primary" fontWeight={600}>
          User Details
        </Typography>
      </Breadcrumbs>

      <Card elevation={3} sx={{ p: 2 }}>
        <Typography align="center" variant="h4" gutterBottom>
          User Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <CardContent>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message severity="error">{error}</Message>
          ) : user ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} textAlign="center">
                <Avatar sx={{ width: 120, height: 120, margin: "auto" }}>
                  <Person fontSize="large" />
                </Avatar>
                <Typography variant="h5" fontWeight={600} sx={{ mt: 2 }}>
                  {user.first_name} {user.middle_name} {user.last_name}
                </Typography>
                <Chip
                  label={user.is_active ? "Active" : "Inactive"}
                  color={user.is_active ? "success" : "error"}
                  sx={{ mt: 1, fontSize: 14 }}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Basic Information
                  </Typography>
                  <Typography>ID: {user.user_number}</Typography>
                  <Typography>Gender: {user.gender || "N/A"}</Typography>
                  <Typography>DOB: {user.date_of_birth}</Typography>
                  <Typography>Marital Status: {user.marital_status}</Typography>
                  <Typography>
                    Qualification: {user.qualification || "N/A"}
                  </Typography>
                  <Typography>
                    <CalendarToday sx={{ verticalAlign: "middle", mr: 1 }} />{" "}
                    Date Joined: {user.date_joined}
                  </Typography>
                </Paper>

                <Divider sx={{ my: 2 }} />

                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Work Information
                  </Typography>
                  <Typography>
                    <Work sx={{ verticalAlign: "middle", mr: 1 }} /> Role:{" "}
                    {user.role}
                  </Typography>
                  <Typography>
                    Department: {user.department_name || "N/A"}
                  </Typography>
                  <Typography>
                    Staff Status: {user.is_staff ? "Staff Member" : "Non-Staff"}
                  </Typography>
                </Paper>

                <Divider sx={{ my: 2 }} />

                <Paper sx={{ p: 3, mb: 2, bgcolor: "#f5f5f5" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Contact Information
                  </Typography>
                  <Typography>
                    <Email sx={{ verticalAlign: "middle", mr: 1 }} />{" "}
                    {user.email}
                  </Typography>
                  <Typography>
                    <Phone sx={{ verticalAlign: "middle", mr: 1 }} />{" "}
                    {user.phone}
                  </Typography>
                  <Typography>
                    <Home sx={{ verticalAlign: "middle", mr: 1 }} />{" "}
                    {user.address}
                  </Typography>
                </Paper>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/users/${id}/edit`}
                      color="primary"
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Message severity="error">No user found</Message>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
