import React from "react";
import { Spin } from "antd";

function Loader() {
  return (
    <div style={{ textAlign: "center" }}>
      <Spin size="large" style={{ margin: "20px auto", display: "block" }} />
    </div>
  );
}

export default Loader;
