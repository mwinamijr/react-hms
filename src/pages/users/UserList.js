import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton,
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
import { listUsers, deleteUser } from "../../store/user/userSlice";

const UserList = () => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setOpenDialog(false);
  };

  const handleClickOpen = (id) => {
    setDeleteUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <Typography color="textPrimary">Users</Typography>
      </Breadcrumbs>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Users
      </Typography>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          component={Link}
          to="/users/add"
        >
          Add User
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
          component={Link}
          to="/users/upload"
        >
          Bulk Upload
        </Button>
      </div>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search Users..."
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
                <TableCell>User ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{`${user?.first_name} ${user?.last_name}`}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.role || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/users/${user.id}`}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/users/${user.id}/edit`}
                        color="success"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleClickOpen(user.id)}
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
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete this user?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={() => handleDelete(deleteUserId)} color="error">
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
