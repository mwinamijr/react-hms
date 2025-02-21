import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Avatar,
  Badge,
  Dropdown,
  Typography,
  Select,
  Button,
  Space,
} from "antd";
import { BellOutlined } from "@ant-design/icons";

const status = [
  { value: "all", label: "All Notification" },
  { value: "new", label: "New" },
  { value: "unread", label: "Unread" },
  { value: "other", label: "Other" },
];

const NotificationSection = () => {
  const [value, setValue] = useState("all");

  const menuItems = [
    {
      key: "header",
      label: (
        <Space>
          <Typography.Text strong>All Notifications</Typography.Text>
          <Badge count={1} />
        </Space>
      ),
    },
    {
      key: "markAll",
      label: <Link to="#">Mark all as read</Link>,
    },
    {
      key: "divider1",
      type: "divider",
    },
    {
      key: "filter",
      label: (
        <Select
          value={value}
          onChange={setValue}
          style={{ width: "100%" }}
          size="small"
        >
          {status.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      key: "divider2",
      type: "divider",
    },
    {
      key: "viewAll",
      label: (
        <Button type="link" block>
          View All
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Badge count={1} offset={[-5, 5]}>
        <Avatar
          shape="square"
          icon={<BellOutlined />}
          style={{
            cursor: "pointer",
            backgroundColor: "#f56a00",
          }}
        />
      </Badge>
    </Dropdown>
  );
};

export default NotificationSection;
