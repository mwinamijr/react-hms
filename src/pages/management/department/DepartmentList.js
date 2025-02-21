import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Typography,
  Button,
  Table,
  Space,
  Modal,
  Input,
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import {
  listDepartments,
  deleteDepartment,
} from "../../../store/management/departmentSlice";

const { Search } = Input;

const DepartmentList = () => {
  const dispatch = useDispatch();
  const { loading, error, departments } = useSelector(
    (state) => state.getDepartments
  );

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteDepartment(id));
    setOpenDialog(false);
    message.success("Department deleted successfully");
  };

  const handleClickOpen = (id) => {
    setDeleteDepartmentId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Departments</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Departments
      </Typography.Title>

      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>
          <Link to="/management/departments/add">Add Department</Link>
        </Button>
        <Button type="default" icon={<UploadOutlined />}>
          <Link to="/management/departments/upload">Bulk Upload</Link>
        </Button>
      </Space>

      <Search
        placeholder="Search Departments..."
        enterButton
        style={{ marginBottom: 20, width: "100%" }}
      />

      {error && <Message type="error">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Table dataSource={departments} rowKey="id" bordered>
          <Table.Column title="Department ID" dataIndex="id" key="id" />
          <Table.Column title="Department Name" dataIndex="name" key="name" />
          <Table.Column
            title="Short Name"
            dataIndex="short_name"
            key="short_name"
          />
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Table.Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <Space size="middle">
                <Link to={`/management/departments/${record.id}`}>
                  <EyeOutlined style={{ color: "blue" }} />
                </Link>
                <Link to={`/management/departments/${record.id}/edit`}>
                  <EditOutlined style={{ color: "green" }} />
                </Link>
                <DeleteOutlined
                  style={{ color: "red" }}
                  onClick={() => handleClickOpen(record.id)}
                />
              </Space>
            )}
          />
        </Table>
      )}

      <Modal
        title="Delete this department?"
        visible={openDialog}
        onOk={() => handleDelete(deleteDepartmentId)}
        onCancel={handleCloseDialog}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Typography.Paragraph>
          Are you sure you want to delete this department? This action cannot be
          undone.
        </Typography.Paragraph>
      </Modal>
    </div>
  );
};

export default DepartmentList;
