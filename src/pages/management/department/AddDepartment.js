import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Input,
  Button,
  Card,
  Typography,
  Spin,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  resetCreateState,
} from "../../../store/management/departmentSlice";

const { Title } = Typography;

const AddDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successCreate } = useSelector(
    (state) => state.getDepartments
  );

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    if (successCreate) {
      message.success("Department added successfully!");
      setTimeout(() => {
        dispatch(resetCreateState());
        navigate("/management/departments");
      }, 2000);
    }
  }, [dispatch, successCreate, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDepartment(formData));
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/departments">Departments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Department</Breadcrumb.Item>
      </Breadcrumb>

      <Card
        style={{ maxWidth: 800, margin: "auto", marginTop: 24, padding: 24 }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Add Department
        </Title>

        {error && (
          <div style={{ color: "red", textAlign: "center", marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Short Name"
              name="short_name"
              value={formData.short_name}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin size="small" /> : "Add Department"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddDepartment;
