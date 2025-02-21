import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { departmentDetails } from "../../../store/management/departmentSlice";
import { Breadcrumb, Card, Typography, Button } from "antd";

const { Title } = Typography;

const DepartmentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, department } = useSelector(
    (state) => state.getDepartments
  );

  useEffect(() => {
    dispatch(departmentDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/departments">Departments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Department Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card
        style={{ padding: 24, maxWidth: 800, margin: "auto", marginTop: 24 }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Update Department Details
        </Title>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : department ? (
          <div>
            <Typography.Title level={5}>
              Department Information
            </Typography.Title>
            <Typography>Name: {department.name}</Typography>
            <Typography>
              Short Name: {department.short_name || "N/A"}
            </Typography>
            <Typography>Description: {department.description}</Typography>

            <Button type="primary" style={{ marginTop: 16 }}>
              <Link to={`/management/departments/${id}/edit`}>
                Edit Department
              </Link>
            </Button>
          </div>
        ) : (
          <Message type="error">No department found</Message>
        )}
      </Card>
    </div>
  );
};

export default DepartmentDetails;
