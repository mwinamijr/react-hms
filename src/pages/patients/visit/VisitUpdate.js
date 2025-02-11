import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  DatePicker,
  Select,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import dayjs from "dayjs";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { visitDetails, updateVisit } from "../../../store/patient/visitSlice";
import { listUsers } from "../../../store/user/userSlice";
import { listDepartments } from "../../../store/management/departmentSlice";

const { Option } = Select;
const { Title } = Typography;

const VisitUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Get visit details from Redux store
  const { loading, error, visit } = useSelector((state) => state.getVisits);
  const { departments, } = useSelector((state) => state.getDepartments); // Assuming departments and doctors are stored in Redux
  const { users, } = useSelector((state) => state.getUsers); // Assuming departments and doctors are stored in Redux

  useEffect(() => {
    dispatch(visitDetails(id)); // Fetch visit details
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(listDepartments())
  })

  useEffect(()=> {
    dispatch(listUsers())
  })

  useEffect(() => {
    if (visit) {
      form.setFieldsValue({
        // Patient Details
        first_name: visit.patient_details?.first_name,
        middle_name: visit.patient_details?.middle_name,
        last_name: visit.patient_details?.last_name,
        gender: visit.patient_details?.gender,
        date_of_birth: visit.patient_details?.date_of_birth
          ? dayjs(visit.patient_details.date_of_birth)
          : null,
        
        // Visit Information
        department: visit.department, // Should match Select component value
        assigned_doctor: visit.assigned_doctor, // Should match Select component value
        visit_date: visit.visit_date ? dayjs(visit.visit_date) : null,
      });
    }
  }, [visit, form]);

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth
        ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
        : null,
      visit_date: values.visit_date
        ? dayjs(values.visit_date).format("YYYY-MM-DD")
        : null,
    };

    dispatch(updateVisit({ id, ...formattedValues }))
      .unwrap()
      .then(() => {
        message.success("Visit updated successfully!");
        navigate(`/management/patients/visits/${id}`);
      })
      .catch(() => message.error("Failed to update visit"));
  };

  return (
    <div className="edit-profile-container mt-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients/visits">Visits</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Visit</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Edit Visit Details" className="shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Patient Information */}
          <Title level={5}>Patient Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="First Name" name="first_name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Middle Name" name="middle_name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Last Name" name="last_name">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Gender" name="gender">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Date of Birth" name="date_of_birth">
                <DatePicker className="w-full" format="DD-MM-YYYY" disabled />
              </Form.Item>
            </Col>
          </Row>

          {/* Visit Information */}
          <Title level={5} className="mt-4">
            Visit Information
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: "Department is required" }]}
              >
                <Select placeholder="Select Department">
                  {departments?.map((dept) => (
                    <Option key={dept.id} value={dept.id}>
                      {dept.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Assigned Doctor"
                name="assigned_doctor"
                rules={[
                  { required: true, message: "Please assign a doctor" },
                ]}
              >
                <Select placeholder="Select Doctor">
                  {users?.map((doc) => (
                    <Option key={doc.id} value={doc.id}>
                      {doc.first_name} {doc.last_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Visit Date" name="visit_date">
                <DatePicker className="w-full" format="DD-MM-YYYY" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default VisitUpdate;
