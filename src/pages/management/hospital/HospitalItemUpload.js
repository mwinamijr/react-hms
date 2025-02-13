import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Upload,
  Button,
  Card,
  Typography,
  Alert,
  Table,
  message,
  Col,
  Row,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { bulkCreateHospitalItems } from "../../../store/management/hospitalItemSlice";

const { Title } = Typography;

const HospitalItemBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedItems, setNotCreatedItems] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getHospitalItems);

  const handleFileChange = ({ file }) => {
    setFile(file.originFileObj); // Save the actual file
  };

  const submitHandler = () => {
    if (!file) {
      message.warning("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    dispatch(bulkCreateHospitalItems(formData))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedItems(response.not_created || []);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        message.error("File upload failed!");
      });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}>
      <Link to="/management/hospital-items" className="ant-btn ant-btn-link">
        Go Back
      </Link>

      <Card className="shadow" style={{ marginTop: "20px" }}>
        <Title level={4} className="text-center">
          Bulk Upload Hospital Items
        </Title>

        <Card style={{ padding: "20px" }}>
          {error && <Alert type="error" message={error} showIcon />}
          {uploadMessage && (
            <Alert type="success" message={uploadMessage} showIcon />
          )}
          <Row style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <Col>
              <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Select File (.xlsx, .xls)
                </Button>
              </Upload>
            </Col>
            <Col>
              <Button type="primary" onClick={submitHandler} loading={loading}>
                Upload
              </Button>
            </Col>
          </Row>
        </Card>

        {/* ✅ Display Not Created Items If Any */}
        {notCreatedItems.length > 0 && (
          <Card style={{ marginTop: "20px" }}>
            <Title level={5} style={{ textAlign: "center", color: "red" }}>
              Failed Uploads ({notCreatedItems.length})
            </Title>
            <Table
              dataSource={notCreatedItems}
              rowKey={(record, index) => index}
              bordered
              pagination={false}
            >
              <Table.Column
                title="#"
                render={(text, record, index) => index + 1}
              />
              <Table.Column title="Item Name" dataIndex="name" key="name" />
              <Table.Column title="Error" dataIndex="error" key="error" />
            </Table>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default HospitalItemBulkUpload;
