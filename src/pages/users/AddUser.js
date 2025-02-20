import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Breadcrumb,
  Button,
  Form,
  Input,
  Checkbox,
  Select,
  DatePicker,
  Row,
  Col,
  message,
  Typography,
} from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { register, resetCreateState } from "../../store/user/userSlice";
import { listDepartments } from "../../store/management/departmentSlice";

const { Title } = Typography;
const { Option } = Select;

const roles = [
  "Doctor",
  "Dentist",
  "Nurse",
  "Receptionist",
  "Cashier",
  "Lab Technician",
  "Radiology Staff",
  "Pharmacist",
  "Admin",
];

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successCreate } = useSelector(
    (state) => state.getUsers
  );

  const { departments } = useSelector((state) => state.getDepartments);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
    }
  }, [dispatch, successCreate, navigate]);

  const handleSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formattedData = {
      ...values,
      date_of_birth: values.date_of_birth
        ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
        : null,
    };

    dispatch(register(formattedData))
      .then(() => {
        message.success("User Added successfully!");
      })
      .catch(() => {
        message.error("Failed to add user. Please try again.");
      });
    navigate("/users");
  };

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/users">Users</Link> },
          { title: "Add User" },
        ]}
      />

      <Card style={{ padding: 3, margin: "auto", marginTop: 4 }}>
        <>
          <Title variant="h4" align="center" gutterBottom>
            Add User
          </Title>

          {loading && <Loader />}
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ is_staff: false, is_active: true }} // Default values
          >
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    { required: true, message: "First Name is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Middle Name" name="middle_name">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[{ required: true, message: "Last Name is required" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Phone number is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Email is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Gender is required" }]}
                >
                  <Select>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Date of Birth"
                  name="date_of_birth"
                  rules={[
                    { required: true, message: "Date of Birth is required" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Qualification"
                  name="qualification"
                  rules={[
                    { required: true, message: "Qualification is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    { required: true, message: "Password 2 is required" },
                  ]}
                >
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[
                    { required: true, message: "Department is required" },
                  ]}
                >
                  <Select>
                    {departments.map((department) => (
                      <Option key={department.id} value={department.id}>
                        {department.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: "Role is required" }]}
                >
                  <Select>
                    {roles.map((role) => (
                      <Option key={role} value={role.toLowerCase()}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="is_staff" valuePropName="checked">
                  <Checkbox>Staff Member</Checkbox>
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item name="is_active" valuePropName="checked">
                  <Checkbox>Active User</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Col span={12}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  {loading ? "Adding..." : "Add User"}
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </>
        {error && <Message>{error}</Message>}
      </Card>
    </div>
  );
};

export default AddUser;
