import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { visitDetails } from "../../../store/patient/visitSlice";

import {
  Breadcrumb,
  Card,
  Descriptions,
  Avatar,
  Tag,
  Typography,
  Button,
  Col,
  Row,
  Space,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const VisitDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, visit } = useSelector((state) => state.getVisits);

  useEffect(() => {
    dispatch(visitDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients/visits">Visits</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Visit Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Visit Details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : visit ? (
          <div className="profile-container">
            {/* Patient Information */}
            <Title level={4}>Patient Information</Title>
            <div className="profile-header">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {visit.patient_details?.first_name}{" "}
                {visit.patient_details?.middle_name}{" "}
                {visit.patient_details?.last_name}
              </Title>
              <Text type="secondary" className="profile-username">
                @{visit.patient_details?.username || "N/A"}
              </Text>
            </div>

            {/* Visit Information */}
            <Descriptions title="Visit Details" bordered column={2} className="mt-3">
              <Descriptions.Item label="Visit ID">{visit.id}</Descriptions.Item>
              <Descriptions.Item label="Visit Date">
                <CalendarOutlined /> {visit.visit_date}
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                {visit.department_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Assigned Doctor">
                {visit.doctor_name ? (
                visit.doctor_name
                ) : (
                  "Not assigned"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={visit.status === "completed" ? "green" : "orange"}>
                  {visit.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Active Visit">
                {visit.is_active ? "Yes" : "No"}
              </Descriptions.Item>
            </Descriptions>

            {/* Contact Information */}
            <Descriptions title="Patient Contact Details" bordered column={2} className="mt-3">
              <Descriptions.Item label="Email">
                <MailOutlined /> {visit.patient_details?.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {visit.patient_details?.phone_number || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {visit.patient_details?.address || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Action Buttons */}
            <Row justify="center" className="profile-actions mt-4">
              <Col>
                <Space>
                  <Link to={`/management/patients/visits/${id}/edit`}>
                    <Button type="primary">Edit Visit</Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No visit found</Message>
        )}
      </Card>
    </div>
  );
};

export default VisitDetails;
