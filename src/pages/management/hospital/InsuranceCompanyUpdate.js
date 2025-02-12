import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  insuranceCompanyDetails,
  updateInsuranceCompany,
} from "../../../store/management/insuranceCompanySlice";

const { Title } = Typography;

const InsuranceCompanyUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading, error, insuranceCompany } = useSelector(
    (state) => state.getInsuranceCompanies
  );

  useEffect(() => {
    dispatch(insuranceCompanyDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (insuranceCompany) {
      form.setFieldsValue({
        name: insuranceCompany.name,
        email: insuranceCompany.email,
        phone: insuranceCompany.phone,
        description: insuranceCompany.description,
      });
    }
  }, [insuranceCompany, form]);

  const onFinish = (values) => {
    dispatch(updateInsuranceCompany({ id, values }))
      .unwrap()
      .then(() => {
        message.success("Insurance insuranceCompany updated successfully!");
        navigate(`/management/insurance-companies/${id}`);
      })
      .catch(() =>
        message.error("Failed to update insurance insuranceCompany")
      );
  };

  return (
    <div className="edit-profile-container mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/insurance-companies">Insurance Companies</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Company</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Update Insurance Company Details" className="shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Title level={5}>Company Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Company Name"
                name="name"
                rules={[
                  { required: true, message: "Company name is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Phone Number" name="phone">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label="Description" name="description">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default InsuranceCompanyUpdate;
