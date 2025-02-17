import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Typography, Tabs, Select } from "antd";

import Message from "../../../components/Message";
import { listVisits } from "../../../store/patient/visitSlice";
import { listInsuredPatients } from "../../../store/management/insuredPatientSlice";

const { Title } = Typography;
const { Option } = Select;

const CashierPatientMovement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myTask"); // Default to "My Task"
  const [selectedWard, setSelectedWard] = useState(null); // Ward filter

  // Get user info from Redux state
  //const { userInfo } = useSelector((state) => state.getUsers);
  const { loading, error, visits } = useSelector((state) => state.getVisits);
  const { insuredPatients } = useSelector((state) => state.getInsuredPatients);

  useEffect(() => {
    dispatch(listVisits()); // Fetch visits
    dispatch(listInsuredPatients()); // Fetch insured patients
  }, [dispatch]);

  // **Filter Data Based on Active Tab**
  const filteredVisits = visits.filter((visit) => {
    if (activeTab === "myTask")
      return visit.status === "started" || visit.status === "pending";
    if (activeTab === "inpatientCenter")
      return visit.department?.name === "Inpatient";
    if (activeTab === "todayList")
      return visit.visit_date === new Date().toISOString().split("T")[0];
    return visits;
  });

  // **Filter Inpatient Patients by Ward**
  const inpatientVisits = selectedWard
    ? filteredVisits.filter((visit) => visit.ward?.name === selectedWard)
    : filteredVisits;

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
      title: "Patient No",
      dataIndex: "visit_number",
      key: "visit_number",
    },
    {
      title: "Patient Name",
      key: "fullName",
      render: (text, record) =>
        `${record.patient_details?.first_name} ${record?.patient_details?.last_name}`,
    },
    {
      title: "Insurer",
      key: "insurer",
      render: renderInsurer,
    },
    {
      title: "Visiting Date",
      dataIndex: "visit_date",
      key: "visit_date",
    },
    {
      title: "Department",
      key: "department",
      render: (text, record) => record.department?.name || "N/A",
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
                : status === "onprogress"
                ? "light-blue"
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

  const tabItems = [
    { key: "myTask", label: "📝 My Task" },
    { key: "inpatientCenter", label: "🏥 Inpatient Center" },
    { key: "todayList", label: "📅 Today List" },
  ];

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: "Cashier Patient Movement" },
        ]}
      />
      {/* Title */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Patient Visits - Cashier
      </Title>

      {/* Tabs for Filtering Visits */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
        items={tabItems}
      />

      {/* Ward Filter for Inpatient Center */}
      {activeTab === "inpatientCenter" && (
        <Select
          placeholder="Filter by Ward"
          onChange={(value) => setSelectedWard(value)}
          allowClear
          style={{ width: 200, marginBottom: 16 }}
        >
          {Array.from(new Set(visits.map((visit) => visit.ward?.name)))
            .filter(Boolean)
            .map((ward) => (
              <Option key={ward} value={ward}>
                {ward}
              </Option>
            ))}
        </Select>
      )}

      {/* Display Error Message */}
      {error && <Message variant="danger">{error}</Message>}

      {/* Visits Table */}
      <Table
        dataSource={
          activeTab === "inpatientCenter" ? inpatientVisits : filteredVisits
        }
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

export default CashierPatientMovement;
