import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Typography,
  Button,
  Table,
  Input,
  Popconfirm,
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Message from "../../components/Message";
import { listPatients, deletePatient } from "../../store/patient/patientSlice";

const { Search } = Input;

const PatientList = () => {
  const dispatch = useDispatch();

  const { loading, error, patients } = useSelector(
    (state) => state.getPatients
  );

  useEffect(() => {
    dispatch(listPatients());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePatient(id))
      .unwrap()
      .then(() => message.success("Patient deleted successfully"));
  };

  const columns = [
    {
      title: "Patient ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: ["gender"],
      key: "gender",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/management/patients/${record.id}`}>
            <EyeOutlined style={{ color: "blue", marginRight: 8 }} />
          </Link>
          <Link to={`/management/patients/${record.id}/edit`}>
            <EditOutlined style={{ color: "green", marginRight: 8 }} />
          </Link>
          <Popconfirm
            title="Delete this patient?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>
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
          { title: "Patients" },
        ]}
      />

      {/* Title */}
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Patients
      </Typography.Title>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button type="primary" icon={<UserAddOutlined />}>
          <Link to="/management/patients/add">Add Patient</Link>
        </Button>
        <Button type="default" block>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <UserAddOutlined />
            <Link to="/management/patients/visits/add">Add visit</Link>
          </span>
        </Button>
        <Button type="default" icon={<UploadOutlined />}>
          <Link to="/management/patients/upload">Bulk Upload</Link>
        </Button>
      </div>

      {/* Search Bar */}
      <Search
        placeholder="Search Patients..."
        style={{ marginBottom: 20 }}
        enterButton
      />

      {/* Error Message */}
      {error && <Message type="error">{error}</Message>}

      {/* Loading Indicator */}
      <Table
        dataSource={patients}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default PatientList;
