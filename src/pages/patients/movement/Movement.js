import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Typography, Tabs } from "antd";

import Message from "../../../components/Message";
import { listVisits } from "../../../store/patient/visitSlice";
import { listInsuredPatients } from "../../../store/management/insuredPatientSlice";

const { Title } = Typography;
const { TabPane } = Tabs;

const PatientMovement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myTask"); // Default to "My Task"

  // Access visit state from the store
  const { loading, error, visits } = useSelector((state) => state.getVisits);
  const { insuredPatients } = useSelector((state) => state.getInsuredPatients);

  useEffect(() => {
    dispatch(listVisits()); // Fetch visits
    dispatch(listInsuredPatients()); // Fetch insured patients
  }, [dispatch]);

  // **Filter Data Based on Active Tab**
  const filteredVisits = visits.filter((visit) => {
    if (activeTab === "myTask") return visit.status === "started"; // New tasks
    if (activeTab === "taskAssignedOut") return visit.status === "pending"; // Tasks in progress
    if (activeTab === "todayList")
      return visit.visit_date === new Date().toISOString().split("T")[0]; // Today's visits
    return visits;
  });

  const renderInsurer = (record) => {
    const insuredPatient = insuredPatients.find(
      (patient) =>
        Number(patient?.insured_patient?.id) ===
        Number(record?.patient_details?.id)
    );
    return insuredPatient ? insuredPatient.provider.name : "Cash";
  };

  const columns = [
    {
      title: "Visit ID",
      dataIndex: "visit_number",
      key: "visit_number",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (text, record) =>
        `${record.patient_details?.first_name} ${record?.patient_details?.last_name}`,
    },
    {
      title: "Assigned to",

      key: "doctorName",
      render: (text, record) =>
        `${record.doctor_details?.first_name} ${record?.doctor_details?.last_name}`,
    },
    {
      title: "Insurer",
      key: "insurer",
      render: renderInsurer,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color:
              status === "started"
                ? "blue"
                : status === "pending"
                ? "orange"
                : "green",
            fontWeight: "bold",
          }}
        >
          {status.replace("_", " ").toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: "Patient Movement" },
        ]}
      />

      {/* Title */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Patient Visits
      </Title>

      {/* Tabs for Filtering Visits */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        <TabPane tab="📝 My Task" key="myTask"></TabPane>
        <TabPane tab="🔄 Task Assigned Out" key="taskAssignedOut"></TabPane>
        <TabPane tab="📅 Today List" key="todayList"></TabPane>
      </Tabs>

      {/* Display Error Message */}
      {error && <Message variant="danger">{error}</Message>}

      {/* Visits Table */}
      <Table
        dataSource={filteredVisits}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
        onRow={(record) => ({
          onClick: () => {
            navigate(`/management/patients/movement/${record.id}`);
          },
          style: { cursor: "pointer" }, // Make it look clickable
        })}
      />
    </div>
  );
};

export default PatientMovement;
