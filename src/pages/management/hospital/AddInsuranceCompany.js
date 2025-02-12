import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Form, Input, Row, Col, Button, Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  createInsuranceCompany,
  resetCreateState,
} from "../../../store/management/insuranceCompanySlice";

const AddInsuranceCompany = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useSelector(
    (state) => state.getInsuranceCompanies
  );

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Insurance company added successfully!");
      navigate("/management/insurance-companies");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    dispatch(createInsuranceCompany(values));
  };

  return (
    <div className="mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/insurance-companies">Insurance Companies</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Insurance Company</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}

      <Card title="Add Insurance Company" className="shadow">
        <Form form={form} layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label="Company Name"
            name="name"
            rules={[{ required: true, message: "Enter company name" }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Enter a valid email" }]}
              >
                <Input placeholder="Enter contact email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Phone Number" name="phone">
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                label="Description"
                name="email"
                rules={[{ message: "Enter company's description" }]}
              >
                <Input placeholder="Enter company's description" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Saving..." : "Add Insurance Company"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default AddInsuranceCompany;
