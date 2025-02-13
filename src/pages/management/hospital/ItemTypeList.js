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
  listItemTypes,
  deleteItemType,
} from "../../../store/management/itemTypeSlice";

const { Title } = Typography;

const ItemTypeList = () => {
  const dispatch = useDispatch();
  const { loading, error, itemTypes } = useSelector(
    (state) => state.getItemTypes
  );

  useEffect(() => {
    dispatch(listItemTypes());
  }, [dispatch]);

  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/management/item-types/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/management/item-types/${record.id}/edit`}>
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
    dispatch(deleteItemType(id))
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
          <Link to="/management/item-types/add">Add Hospital Item</Link>
        </Button>
        <Button type="default" icon={<UploadOutlined />}>
          <Link to="/management/item-types/upload">Bulk Upload</Link>
        </Button>{" "}
      </div>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Hospital Items
      </Title>

      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={itemTypes}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default ItemTypeList;
