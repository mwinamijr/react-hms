import { Avatar, Dropdown, Typography, Space, message } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import User1 from "../../assets/images/users/user-round.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    message.success("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "profile",
      label: <Typography.Text>Good Morning, John Doe</Typography.Text>,
    },
    {
      key: "role",
      label: <Typography.Text type="secondary">Project Admin</Typography.Text>,
    },
    {
      key: "divider1",
      type: "divider",
    },
    {
      key: "settings",
      label: (
        <Space>
          <SettingOutlined /> Account Settings
        </Space>
      ),
    },
    {
      key: "social",
      label: (
        <Space>
          <UserOutlined /> Social Profile{" "}
          <BellOutlined style={{ marginLeft: 10 }} />
        </Space>
      ),
    },
    {
      key: "logout",
      label: (
        <Space onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogoutOutlined /> Logout
        </Space>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Avatar
        src={User1}
        size="large"
        style={{ cursor: "pointer", border: "2px solid #1890ff" }}
      />
    </Dropdown>
  );
};

export default ProfileSection;
