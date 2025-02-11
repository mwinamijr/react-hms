import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Space,
  Typography,
  Row,
  Col,
  Button,
  message,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Message from "../../../components/Message";
import { listVisits, deleteVisit } from "../../../store/patient/visitSlice";

const { Title } = Typography;

const VisitList = () => {
  const dispatch = useDispatch();

  // Access visit state from the store
  const { loading, error, visits } = useSelector((state) => state.getVisits);

  useEffect(() => {
    dispatch(listVisits()); // Dispatch the action to fetch visits
  }, [dispatch]);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Visit ID",
      dataIndex: "visit_id",
      key: "visit_id",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (text, record) => (
        <Link
          to={`/management/patients/visits/${record.id}`}
        >{`${record.patient_details.first_name} ${record.patient_details.last_name}`}</Link>
      ),
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department",
    },
    {
      title: "Visit Date",
      dataIndex: "visit_date",
      key: "visit_date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/management/patients/visits/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/management/patients/visits/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this visit?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteVisit(id))
      .unwrap()
      .then(() => message.success("visit deleted successfully"));
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients/visits">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>visits</Breadcrumb.Item>
      </Breadcrumb>

      {/* Title */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        visits
      </Title>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} lg={6}>
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
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Button type="default" block>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <UploadOutlined />
              <Link to="/management/patients/visits/upload">Bulk Upload</Link>
            </span>
          </Button>
        </Col>
      </Row>

      {/* Content */}
      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={visits}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default VisitList;
