import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bulkCreateDepartments } from "../../../store/management/departmentSlice";
import {
  Breadcrumb,
  Card,
  Upload,
  Button,
  Table,
  Typography,
  message,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DepartmentBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedDepartments, setNotCreatedDepartments] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getDepartments);

  const handleFileChange = (info) => {
    if (info.file.status === "done" || info.file.status === "removed") {
      setFile(info.file.originFileObj || null);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      message.warning("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreateDepartments(file))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedDepartments(response.not_created || []);
        message.success("File uploaded successfully!");
      })
      .catch((err) => {
        message.error("Upload failed.");
        console.error("Upload failed:", err);
      });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    { title: "Error", dataIndex: "error", key: "error" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/departments">Departments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Bulk Upload</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Bulk Upload Departments">
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        {loading && <Spin style={{ display: "block", margin: "auto" }} />}
        {uploadMessage && (
          <Typography.Text type="success">{uploadMessage}</Typography.Text>
        )}

        <Upload
          beforeUpload={() => false}
          onChange={handleFileChange}
          maxCount={1}
          accept=".xlsx,.xls"
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>

        <Button
          type="primary"
          onClick={submitHandler}
          style={{ marginTop: "10px" }}
          block
        >
          Upload
        </Button>
      </Card>

      {notCreatedDepartments.length > 0 && (
        <Card
          title={`Failed Uploads (${notCreatedDepartments.length})`}
          style={{ marginTop: "20px" }}
        >
          <Table
            dataSource={notCreatedDepartments}
            columns={columns}
            rowKey={(record, index) => index}
          />
        </Card>
      )}
    </div>
  );
};

export default DepartmentBulkUpload;
