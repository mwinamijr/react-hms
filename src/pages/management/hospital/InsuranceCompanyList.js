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
  listInsuranceCompanies,
  deleteInsuranceCompany,
} from "../../../store/management/insuranceCompanySlice";

const { Title } = Typography;

const InsuranceCompanyList = () => {
  const dispatch = useDispatch();
  const { loading, error, insuranceCompanies } = useSelector(
    (state) => state.getInsuranceCompanies
  );

  useEffect(() => {
    dispatch(listInsuranceCompanies());
  }, [dispatch]);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/management/insurance-companies/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/management/insurance-companies/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this company?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteInsuranceCompany(id))
      .unwrap()
      .then(() => message.success("Insurance company deleted successfully"));
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Insurance Companies</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Insurance Companies
      </Title>

      <Button type="primary" style={{ marginBottom: 16 }}>
        <Link to="/management/insurance-companies/add">
          <PlusOutlined /> Add Insurance Company
        </Link>
      </Button>

      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={insuranceCompanies}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default InsuranceCompanyList;
