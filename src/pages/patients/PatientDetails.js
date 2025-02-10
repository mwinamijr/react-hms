import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { patientDetails } from "../../store/patient/patientSlice";
import {
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
  HomeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const PatientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, patient } = useSelector((state) => state.getPatients);

  useEffect(() => {
    dispatch(patientDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/management/patients" className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>

      <Card title="Patient Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : patient ? (
          <div className="profile-container">
            <div className="profile-header">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {patient.first_name} {patient.middle_name} {patient.last_name}
              </Title>
              <Tag color={patient.is_active ? "green" : "red"}>
                {patient.is_active ? "Active" : "Inactive"}
              </Tag>

              <Row justify="center" className="profile-actions">
                <Col>
                  <Space>
                    <Link to={`/management/patients/${id}/edit`}>
                      <Button type="primary">Edit Profile</Button>
                    </Link>
                    <Link to={`/management/patients/${id}/print`}>
                      <Button type="default">Print Profile</Button>
                    </Link>
                  </Space>
                </Col>
              </Row>
            </div>

            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="Patient ID">
                {patient.patient_number}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {patient.gender || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {patient.date_of_birth}
              </Descriptions.Item>
              <Descriptions.Item label="Marital Status">
                {patient.marital_status}
              </Descriptions.Item>
              <Descriptions.Item label="Occupation">
                {patient.occupation || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Contact Information" bordered column={2}>
              <Descriptions.Item label="Email">
                <MailOutlined /> {patient.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {patient.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined /> {patient.address || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Next of Kin" bordered column={2}>
              <Descriptions.Item label="Name">
                {patient.kin_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Relation">
                {patient.kin_relation || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {patient.kin_phone || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Insurance & Payment" bordered column={2}>
              <Descriptions.Item label="Payment Method">
                {patient.payment_method}
              </Descriptions.Item>
              {patient.payment_method === "insurance" && (
                <>
                  <Descriptions.Item label="Provider">
                    {patient.insurance_provider}
                  </Descriptions.Item>
                  <Descriptions.Item label="Policy #">
                    {patient.insurance_policy_number}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          </div>
        ) : (
          <Message variant="info">No patient found</Message>
        )}
      </Card>
    </div>
  );
};

export default PatientDetails;
