import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  patientDetails,
  updatePatient,
} from "../../store/patient/patientSlice";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  message,
  Spin,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

const PatientUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, patient } = useSelector((state) => state.getPatients);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(patientDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({ ...patient });
    }
  }, [patient, form]);

  const onFinish = (values) => {
    dispatch(updatePatient({ id, formData: values }))
      .then(() => {
        message.success("Patient updated successfully!");
        navigate(`/patients/${id}`);
      })
      .catch(() => {
        message.error("Failed to update patient. Please try again.");
      });
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients">Patients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Patient Update</Breadcrumb.Item>
      </Breadcrumb>

      <Card title={<Title level={4}>Update Patient Details</Title>}>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Typography.Text type="danger">{error}</Typography.Text>
        ) : (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: "First Name is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Middle Name" name="middle_name">
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Last Name is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="date_of_birth"
              rules={[{ required: true, message: "Date of Birth is required" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Marital Status" name="marital_status">
              <Select>
                <Option value="single">Single</Option>
                <Option value="married">Married</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? "Updating ...." : "Update Patient"}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </>
  );
};

export default PatientUpdate;
