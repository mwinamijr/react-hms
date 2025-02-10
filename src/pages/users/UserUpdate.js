import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { userDetails, updateUser } from "../../store/user/userSlice";
import { listDepartments } from "../../store/management/departmentSlice";
import {
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

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.getUsers);
  const { departments } = useSelector((state) => state.getDepartments);
  const [form] = Form.useForm(); // Ant Design's form instance
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    dispatch(userDetails(id));
    dispatch(listDepartments());
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        date_of_birth: user.date_of_birth ? dayjs(user.date_of_birth) : null,
        department: user.department?.id || user.department,
      });
    }
  }, [user, form]);

  const handleSubmit = (values) => {
    const formattedData = {
      ...values,
      date_of_birth: values.date_of_birth
        ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
        : null,
    };

    dispatch(updateUser({ id, formData: formattedData }))
      .then(() => {
        message.success("User updated successfully!");
        navigate(`/users/${id}`);
      })
      .catch(() => {
        message.error("Failed to update user.");
      });
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users">Users</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>User Update</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3}>Update User Details</Title>

      {loading && <Loader />}
      {error && <Message severity="error">{error}</Message>}

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{ is_staff: false, is_active: true }} // Default values
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Middle Name" name="middle_name">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Date of Birth"
              name="date_of_birth"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Qualification"
              name="qualification"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true }]}
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

          <Col span={12}>
            <Form.Item label="Role" name="role" rules={[{ required: true }]}>
              <Select>
                {roles.map((role) => (
                  <Option key={role} value={role.toLowerCase()}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Change Password">
              <Checkbox
                checked={showPasswordFields}
                onChange={() => setShowPasswordFields(!showPasswordFields)}
              />
            </Form.Item>
          </Col>

          {showPasswordFields && (
            <>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Confirm Password" name="confirmPassword">
                  <Input.Password
                    iconRender={(visible) =>
                      visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </>
          )}

          <Col span={12}>
            <Form.Item name="is_staff" valuePropName="checked">
              <Checkbox>Staff Member</Checkbox>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="is_active" valuePropName="checked">
              <Checkbox>Active User</Checkbox>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? "Updating..." : "Update User"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserUpdate;
