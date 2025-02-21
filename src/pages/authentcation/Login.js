import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Divider,
  Spin,
  message,
} from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { login } from "../../store/user/userSlice";
import AuthFooter from "../../components/AuthFooter";
import logo from "../../assets/images/techdome.svg";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, userInfo } = useSelector((state) => state.getUsers);

  const [form] = Form.useForm();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const handleLogin = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row justify="center" style={{ width: "100%" }}>
        <Col xs={22} sm={18} md={12} lg={8}>
          <Card bordered style={{ padding: "24px", textAlign: "center" }}>
            {/* Logo */}
            <div onClick={() => (window.location.href = "#")}>
              <img
                src={logo}
                alt="techdometz"
                style={{ height: 40, marginRight: 10 }}
              />
            </div>

            <Title level={2} style={{ marginTop: "16px" }}>
              Hi, Welcome Back
            </Title>
            <Text type="secondary">Enter your credentials to continue</Text>

            {error && message.error(error)}

            <Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              style={{ marginTop: "24px" }}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              {/* Remember Me & Forgot Password */}
              <Row justify="space-between">
                <Col>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox defaultChecked>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </Col>
              </Row>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={loading}
                  icon={
                    loading ? <Spin indicator={<LoadingOutlined />} /> : null
                  }
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </Form.Item>
            </Form>

            {/* Divider */}
            <Divider />

            {/* Sign Up Link */}
            <Text>
              Don't have an account? Contact your employer to get one.
            </Text>
          </Card>

          {/* Footer */}
          <AuthFooter style={{ marginTop: "24px", textAlign: "center" }} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
