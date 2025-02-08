import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { bulkCreateDepartments } from "../../../store/management/departmentSlice";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

const DepartmentBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedDepartments, setNotCreatedDepartments] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getDepartments);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreateDepartments(file))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedDepartments(response.not_created || []);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
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
        <Typography color="textPrimary">Department details</Typography>
      </Breadcrumbs>

      <Card>
        <CardHeader
          title={<Typography variant="h5">Bulk Upload Departments</Typography>}
        />
        <CardContent>
          {error && <Message severity="error">{error}</Message>}
          {loading && <Loader style={{ display: "block", margin: "auto" }} />}
          {uploadMessage && (
            <Message severity="success">{uploadMessage}</Message>
          )}

          <form onSubmit={submitHandler} style={{ marginTop: "20px" }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setFile(e.target.files[0])}
              required
              style={{ marginBottom: "15px" }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Upload
            </Button>
          </form>

          {notCreatedDepartments.length > 0 && (
            <Card style={{ marginTop: "20px" }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Failed Uploads ({notCreatedDepartments.length})
                  </Typography>
                }
              />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Error</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notCreatedDepartments.map((department, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{department.first_name}</TableCell>
                          <TableCell>{department.last_name}</TableCell>
                          <TableCell>{department.error}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentBulkUpload;
