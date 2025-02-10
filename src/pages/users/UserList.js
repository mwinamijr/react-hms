import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Typography,
  Button,
  Table,
  Popconfirm,
  Input,
  Space,
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { listUsers, deleteUser } from "../../store/user/userSlice";

const { Search } = Input;

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => message.success("User deleted successfully"))
      .catch(() => {
        message.error("Failed to delete user.");
      });
  };

  const columns = [
    {
      title: "User ID",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/users/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/users/${record.id}/edit`}>
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

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Users
      </Typography.Title>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<UserAddOutlined />}>
          <Link to="/users/add">Add User</Link>
        </Button>
        <Button icon={<UploadOutlined />}>
          <Link to="/users/upload">Bulk Upload</Link>
        </Button>
      </Space>

      <Search placeholder="Search Users..." style={{ marginBottom: 20 }} />

      {error && <Typography.Text type="danger">{error}</Typography.Text>}

      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        rowKey="id"
      />
    </div>
  );
};

export default UserList;
