import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Space,
  Typography,
  Button,
  message,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import Message from "../../../components/Message";
import {
  listInsuredPatients,
  deleteInsuredPatient,
} from "../../../store/management/insuredPatientSlice";

const { Title } = Typography;

const InsuredPatientList = () => {
  const dispatch = useDispatch();
  const { loading, error, insuredPatients } = useSelector(
    (state) => state.getInsuredPatients
  );

  useEffect(() => {
    dispatch(listInsuredPatients());
  }, [dispatch]);

  const columns = [
    {
      title: "Patient Name",
      key: "patient",
      render: (text, record) => (
        <Link to={`/management/insurance/${record.id}`}>
          {`${record.insured_patient.first_name} ${record.insured_patient.last_name}`}
        </Link>
      ),
    },
    {
      title: "Insurance Provider",
      key: "provider",
      render: (text, record) => record.provider?.name || "N/A",
    },
    {
      title: "Policy Number",
      dataIndex: "policy_number",
      key: "policy_number",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/management/insurance/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/management/insurance/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this record?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteInsuredPatient(id))
      .unwrap()
      .then(() => message.success("Insurance record deleted successfully"));
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Insured Patients</Breadcrumb.Item>
      </Breadcrumb>

      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/management/insurance/add">
          <PlusOutlined /> Add Insured Patient
        </Link>
      </Button>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Insured Patients
      </Title>

      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={insuredPatients}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default InsuredPatientList;
