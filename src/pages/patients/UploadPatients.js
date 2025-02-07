import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { bulkCreatePatients } from "../../store/patient/patientSlice";

const PatientBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedPatients, setNotCreatedPatients] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getPatients);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreatePatients(file))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedPatients(response.not_created || []);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
      <Link
        to="/management/patients"
        style={{
          textDecoration: "none",
          marginBottom: "10px",
          display: "block",
        }}
      >
        <Button variant="outlined">Go Back</Button>
      </Link>

      <Card>
        <CardHeader
          title={<Typography variant="h5">Bulk Upload Patients</Typography>}
        />
        <CardContent>
          {error && <Alert severity="error">{error}</Alert>}
          {loading && (
            <CircularProgress style={{ display: "block", margin: "auto" }} />
          )}
          {uploadMessage && <Alert severity="success">{uploadMessage}</Alert>}

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

          {notCreatedPatients.length > 0 && (
            <Card style={{ marginTop: "20px" }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Failed Uploads ({notCreatedPatients.length})
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
                      {notCreatedPatients.map((patient, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{patient.first_name}</TableCell>
                          <TableCell>{patient.last_name}</TableCell>
                          <TableCell>{patient.error}</TableCell>
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

export default PatientBulkUpload;
