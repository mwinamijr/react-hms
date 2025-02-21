import React from "react";
import { Layout, Typography, Row, Col } from "antd";

const { Footer } = Layout;

const AuthFooter = () => (
  <Footer style={{ textAlign: "center", padding: "16px 0" }}>
    <Row justify="space-between">
      <Col>
        <Typography.Text>
          <a
            href="https://mwinamijr.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed by - Mwinami Jr
          </a>
        </Typography.Text>
      </Col>
      <Col>
        <Typography.Text>
          <a
            href="https://mwinamijr.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; techdometz
          </a>
        </Typography.Text>
      </Col>
    </Row>
  </Footer>
);

export default AuthFooter;
