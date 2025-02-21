import React from "react";
import { Alert } from "antd";

function Message({ children, type }) {
  return (
    <Alert
      style={{ marginBottom: "8px" }}
      message={children}
      type={type}
      closable
    />
  );
}

export default Message;
