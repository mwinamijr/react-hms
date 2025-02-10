import React from "react";
import { Alert } from "antd";

function Message({ severity = "info", children }) {
  return <Alert message={children} type={severity} showIcon />;
}

export default Message;
