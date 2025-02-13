import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { insuredPatientDetails } from "../../../store/management/insuredPatientSlice";

import {
  Breadcrumb,
  Card,
  Descriptions,
  Avatar,
  Button,
  Col,
  Row,
  Space,
} from "antd";
import { UserOutlined, BankOutlined, ProfileOutlined } from "@ant-design/icons";

const InsuredPatientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, insuredPatient } = useSelector(
    (state) => state.getInsuredPatients
  );

  useEffect(() => {
    dispatch(insuredPatientDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/insurance">Insured Patients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Patient Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Insured Patient Details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : insuredPatient ? (
          <div>
            {/* Patient Information */}
            <Avatar
              size={120}
              icon={<UserOutlined />}
              className="profile-avatar"
            />

            <Descriptions bordered column={1} className="mt-3">
              <Descriptions.Item label="Patient Name">
                {`${insuredPatient.insured_patient.first_name} ${insuredPatient.insured_patient.last_name}`}
              </Descriptions.Item>
              <Descriptions.Item label="Insurance Provider">
                <BankOutlined /> {insuredPatient.provider.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Policy Number">
                <ProfileOutlined /> {insuredPatient.policy_number || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Action Buttons */}
            <Row justify="center" className="profile-actions mt-4">
              <Col>
                <Space>
                  <Link to={`/management/insurance/${id}/edit`}>
                    <Button type="primary">Edit Patient</Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No insured patient found</Message>
        )}
      </Card>
    </div>
  );
};

export default InsuredPatientDetails;
