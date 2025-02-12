import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { insuranceCompanyDetails } from "../../../store/management/insuranceCompanySlice";

import {
  Breadcrumb,
  Card,
  Descriptions,
  Avatar,
  Typography,
  Button,
  Col,
  Row,
  Space,
} from "antd";
import { BankOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title } = Typography;

const InsuranceCompanyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, insuranceCompany } = useSelector(
    (state) => state.getInsuranceCompanies
  );

  useEffect(() => {
    dispatch(insuranceCompanyDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/insurance-companies">Insurance Companies</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Company Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Insurance Company Details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : insuranceCompany ? (
          <div>
            {/* Company Information */}
            <Title level={4}>{insuranceCompany.name}</Title>
            <Avatar
              size={120}
              icon={<BankOutlined />}
              className="profile-avatar"
            />

            <Descriptions bordered column={1} className="mt-3">
              <Descriptions.Item label="Company Name">
                {insuranceCompany.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined /> {insuranceCompany.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {insuranceCompany.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <PhoneOutlined /> {insuranceCompany.description || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Action Buttons */}
            <Row justify="center" className="profile-actions mt-4">
              <Col>
                <Space>
                  <Link to={`/management/insurance-companies/${id}/edit`}>
                    <Button type="primary">Edit Company</Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No insuranceCompany found</Message>
        )}
      </Card>
    </div>
  );
};

export default InsuranceCompanyDetails;
