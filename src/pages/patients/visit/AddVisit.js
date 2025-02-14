import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  DatePicker,
  Select,
  message,
  Typography,
  Switch,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  createVisit,
  resetCreateState,
} from "../../../store/patient/visitSlice";
import { listPatients } from "../../../store/patient/patientSlice";
import { listDepartments } from "../../../store/management/departmentSlice";
import { listUsers } from "../../../store/user/userSlice";
import { addConsultationPayment } from "../../../store/finance/paymentSlice";
import dayjs from "dayjs";

const { Option } = Select;
const { Title } = Typography;

const AddVisit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch data from Redux store
  const { patients } = useSelector((state) => state.getPatients);
  const { departments } = useSelector((state) => state.getDepartments);
  const { users } = useSelector((state) => state.getUsers);
  const { loading: addPaymentLoading, error: addPaymentError } = useSelector(
    (state) => state.getPayments
  );
  const { loading, error, successCreate, createdVisit } = useSelector(
    (state) => state.getVisits
  );

  useEffect(() => {
    dispatch(listPatients());
    dispatch(listDepartments());
    dispatch(listUsers()); // Fetch all users
  }, [dispatch]);

  useEffect(() => {
    if (successCreate && createdVisit) {
      dispatch(resetCreateState());

      // Add consultation payment for the created visit
      dispatch(
        addConsultationPayment({
          visit_id: createdVisit.id,
        })
      );

      message.success("Visit added successfully!");
      message.success("Consultation payment added successfully!");
      navigate("/management/patients/visits");
    }
  }, [dispatch, successCreate, createdVisit, navigate]);

  const submitHandler = (values) => {
    const formattedData = {
      ...values,
      assigned_doctor: values.assigned_doctor || null, // Ensure it can be null
      visit_date: values.visit_date
        ? dayjs(values.visit_date).format("YYYY-MM-DD")
        : null,
      is_active: values.is_active || false,
    };

    dispatch(createVisit(formattedData));
  };

  return (
    <div className="mt-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients/visits">Visits</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Visit</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {addPaymentLoading && <Loader />}
      <Card title="Register Visit" className="shadow">
        <Form form={form} layout="vertical" onFinish={submitHandler}>
          {/* Select Patient */}
          <Title level={5}>Patient Information</Title>
          <Form.Item
            label="Select Patient"
            name="patient"
            rules={[{ required: true, message: "Please select a patient" }]}
          >
            <Select placeholder="Select a patient">
              {patients.map((patient) => (
                <Option key={patient.id} value={patient.id}>
                  {patient.first_name} {patient.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Department & Doctor */}
          <Title level={5} className="mt-4">
            Visit Details
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select a department" },
                ]}
              >
                <Select placeholder="Select a department">
                  {departments.map((dept) => (
                    <Option key={dept.id} value={dept.id}>
                      {dept.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Assigned Doctor" name="assigned_doctor">
                <Select placeholder="Select a doctor" allowClear>
                  {users
                    .filter((user) => user.role === "doctor")
                    .map((doctor) => (
                      <Option key={doctor.id} value={doctor.id}>
                        {doctor.first_name} {doctor.last_name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Assigned By (Staff member) */}
          <Form.Item label="Assigned By (Staff)" name="assigned_by">
            <Input placeholder="Enter your staff ID (auto-fetch later)" />
          </Form.Item>

          {/* Visit Status */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Visit Status"
                name="status"
                rules={[
                  { required: true, message: "Please select visit status" },
                ]}
              >
                <Select>
                  <Option value="pending">Pending</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Visit Date" name="visit_date">
                <DatePicker
                  className="w-full"
                  format="YYYY-MM-DD"
                  defaultValue={dayjs()}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Is Active */}
          <Form.Item
            label="Active Visit"
            name="is_active"
            valuePropName="checked"
          >
            <Switch defaultChecked />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Registering..." : "Register Visit"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {error && <Message variant="danger">{error}</Message>}
      {addPaymentError && <Message variant="danger">{addPaymentError}</Message>}
    </div>
  );
};

export default AddVisit;
