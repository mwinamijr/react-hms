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
  UploadOutlined,
} from "@ant-design/icons";

import Message from "../../../components/Message";
import {
  listHospitalItems,
  deleteHospitalItem,
} from "../../../store/management/hospitalItemSlice";

const { Title } = Typography;

const HospitalItemList = () => {
  const dispatch = useDispatch();
  const { loading, error, hospitalItems } = useSelector(
    (state) => state.getHospitalItems
  );

  useEffect(() => {
    dispatch(listHospitalItems());
  }, [dispatch]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "item_type",
      key: "item_type",
      render: (item_type) => `${item_type.name}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Insurance Companies",
      dataIndex: "insurance_companies",
      key: "insurance_companies",
      render: (insurance_companies) =>
        insurance_companies && insurance_companies.length > 0
          ? insurance_companies.map((company) => company.name).join(", ")
          : "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/management/hospital-items/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/management/hospital-items/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this item?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteHospitalItem(id))
      .unwrap()
      .then(() => message.success("Hospital item deleted successfully"));
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Hospital Items</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button type="primary" icon={<PlusOutlined />}>
          <Link to="/management/hospital-items/add">Add Hospital Item</Link>
        </Button>
        <Button type="default" icon={<UploadOutlined />}>
          <Link to="/management/hospital-items/upload">Bulk Upload</Link>
        </Button>
      </div>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Hospital Items
      </Title>

      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={hospitalItems}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default HospitalItemList;
