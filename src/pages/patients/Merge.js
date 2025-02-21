import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Form, Typography, Space } from "antd";
import { listPatients } from "../../store/patient/patientSlice"; // Assuming this is the correct path
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const MergePatients = () => {
  const dispatch = useDispatch();

  const { patients, loading, error } = useSelector(
    (state) => state.getPatients
  );

  const [patient1, setPatient1] = useState("");
  const [patient2, setPatient2] = useState("");
  const [setMessage] = useState("");

  useEffect(() => {
    dispatch(listPatients()); // Fetch patients when the page is loaded
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patient1 || !patient2) {
      setMessage("Please select both patients to merge.");
    } else if (patient1 === patient2) {
      setMessage("You cannot merge the same patient.");
    } else {
      setMessage("Merging functionality will be handled later by the backend.");
    }
  };

  const { Option } = Select;

  return (
    <div>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Merge Patients
      </Typography.Title>

      {/* Form */}
      <Form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
        <Form.Item label="Select Patient 1" name="patient1" required>
          <Select
            value={patient1}
            onChange={(value) => setPatient1(value)}
            placeholder="Select Patient 1"
          >
            {patients.map((patient) => (
              <Option key={patient.id} value={patient.id}>
                {`${patient.first_name} ${patient.last_name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Select Patient 2" name="patient2" required>
          <Select
            value={patient2}
            onChange={(value) => setPatient2(value)}
            placeholder="Select Patient 2"
          >
            {patients.map((patient) => (
              <Option key={patient.id} value={patient.id}>
                {`${patient.first_name} ${patient.last_name}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Space style={{ width: "100%", justifyContent: "center" }}>
          <Button type="primary" onClick={handleSubmit}>
            Merge Patients
          </Button>
        </Space>
      </Form>

      {/* Loading and Error Messages */}
      {loading && <Loader />}
      {error && (
        <Message severity="error" align="center">
          {error}
        </Message>
      )}
    </div>
  );
};

export default MergePatients;
