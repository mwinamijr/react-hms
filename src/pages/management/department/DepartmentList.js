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
  PersonOff,
  CloudUpload,
} from "@mui/icons-material";

import { PlusOutlined } from "@ant-design/icons";

import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  listDepartments,
  deleteDepartment,
} from "../../../store/management/departmentSlice";

const DepartmentList = () => {
  const dispatch = useDispatch();

  const { loading, error, departments } = useSelector(
    (state) => state.getDepartments
  );

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteDepartment(id));
    setOpenDialog(false);
  };

  const handleClickOpen = (id) => {
    setDeleteDepartmentId(id);
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
        <Typography color="textPrimary">Departments</Typography>
      </Breadcrumbs>

      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Departments
      </Typography>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button
          variant="contained"
          startIcon={<PlusOutlined />}
          component={Link}
          to="/management/departments/add"
        >
          Add Department
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
          component={Link}
          to="/management/departments/upload"
        >
          Bulk Upload
        </Button>
      </div>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search Departments..."
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
                <TableCell>Department ID</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Short Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.length > 0 ? (
                departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>{department.id}</TableCell>
                    <TableCell>{department.name}</TableCell>
                    <TableCell>{department.short_name}</TableCell>
                    <TableCell>
                      {department.description?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/management/departments/${department.id}`}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        component={Link}
                        to={`/management/departments/${department.id}/edit`}
                        color="success"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleClickOpen(department.id)}
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
                      No departments found
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
        <DialogTitle>Delete this department?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this department? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog} color="primary">
            Cancel
          </MuiButton>
          <MuiButton
            onClick={() => handleDelete(deleteDepartmentId)}
            color="error"
          >
            Confirm
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DepartmentList;
