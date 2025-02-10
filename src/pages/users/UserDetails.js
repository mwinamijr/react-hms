import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { userDetails } from "../../store/user/userSlice";
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
  HomeOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, user } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(userDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users">Users</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>User Update</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="User Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : user ? (
          <div className="profile-container">
            <div className="profile-header">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {user.first_name} {user.middle_name} {user.last_name}
              </Title>
              <Tag color={user.is_active ? "green" : "red"}>
                {user.is_active ? "Active" : "Inactive"}
              </Tag>

              <Row justify="center" className="profile-actions">
                <Col>
                  <Space>
                    <Link to={`/users/${id}/edit`}>
                      <Button type="primary">Edit Profile</Button>
                    </Link>
                    <Link to={`/users/${id}/print`}>
                      <Button type="default">Print Profile</Button>
                    </Link>
                  </Space>
                </Col>
              </Row>
            </div>

            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="User ID">
                {user.user_number}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {user.gender || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {user.date_of_birth}
              </Descriptions.Item>
              <Descriptions.Item label="Marital Status">
                {user.marital_status}
              </Descriptions.Item>
              <Descriptions.Item label="Qualification">
                {user.qualification || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Contact Information" bordered column={2}>
              <Descriptions.Item label="Email">
                <MailOutlined /> {user.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {user.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined /> {user.address || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Work Information" bordered column={2}>
              <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
              <Descriptions.Item label="Department">
                {user.department_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Staff Status">
                {user.is_staff ? "Staff Member" : "Non-Staff"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Message variant="info">No user found</Message>
        )}
      </Card>
    </div>
  );
};

export default UserDetails;
