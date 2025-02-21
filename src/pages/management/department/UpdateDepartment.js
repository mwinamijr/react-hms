import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  departmentDetails,
  updateDepartment,
} from "../../../store/management/departmentSlice";
import { Breadcrumb, Input, Button, Card, Form, message } from "antd";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

const DepartmentUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, department } = useSelector(
    (state) => state.getDepartments
  );

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(departmentDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (department) {
      setFormData({ ...department });
    }
  }, [department]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateDepartment({ id, formData }));
    message.success("Department updated successfully!");
    setTimeout(() => {
      navigate(`/management/departments/${id}`);
    }, 2000);
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/departments">Departments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Department Update</Breadcrumb.Item>
      </Breadcrumb>

      <Card
        title="Update Department Details"
        style={{ maxWidth: 800, margin: "auto" }}
      >
        {loading && <Loader />}
        {error && <Message severity="error">{error}</Message>}

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" required>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Short Name">
            <Input
              name="short_name"
              value={formData.short_name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Department
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default DepartmentUpdate;
