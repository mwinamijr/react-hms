import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { hospitalItemDetails } from "../../../store/management/hospitalItemSlice";

import {
  Breadcrumb,
  Card,
  Descriptions,
  Typography,
  Button,
  Col,
  Row,
  Space,
  Tag,
} from "antd";
import {
  MedicineBoxOutlined,
  TagOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const HospitalItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, hospitalItem } = useSelector(
    (state) => state.getHospitalItems
  );

  useEffect(() => {
    dispatch(hospitalItemDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/hospital-items">Hospital Items</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Item Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Hospital Item Details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : hospitalItem ? (
          <div>
            {/* Item Name */}
            <Title level={4}>
              <MedicineBoxOutlined style={{ marginRight: 8 }} />
              {hospitalItem.name}
            </Title>

            {/* Descriptions Section */}
            <Descriptions bordered column={1} className="mt-3">
              <Descriptions.Item label="Item ID">
                {hospitalItem.id}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {hospitalItem.description || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                <TagOutlined /> {hospitalItem.item_type?.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                <DollarCircleOutlined /> $
                {Number(hospitalItem.price).toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {hospitalItem.is_active ? (
                  <Tag color="green">
                    <CheckCircleOutlined /> Active
                  </Tag>
                ) : (
                  <Tag color="red">
                    <ClockCircleOutlined /> Inactive
                  </Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(hospitalItem.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Last Updated">
                {new Date(hospitalItem.updated_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Insurance Companies">
                {hospitalItem.insurance_companies.length > 0
                  ? hospitalItem.insurance_companies.map((company) => (
                      <Tag color="blue" key={company.id}>
                        {company.name}
                      </Tag>
                    ))
                  : "Not covered by any insurance"}
              </Descriptions.Item>
            </Descriptions>

            {/* Action Buttons */}
            <Row justify="center" className="profile-actions mt-4">
              <Col>
                <Space>
                  <Link to={`/management/hospital-items/${id}/edit`}>
                    <Button type="primary">Edit Item</Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No item found</Message>
        )}
      </Card>
    </div>
  );
};

export default HospitalItemDetails;
