import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Form,
  Button,
  Card,
  Select,
  message,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  createVisit,
  resetCreateState,
} from "../../../store/patient/visitSlice";
import { listPatients } from "../../../store/patient/patientSlice";
import { listUsers } from "../../../store/user/userSlice";
import { addConsultationPayment } from "../../../store/finance/paymentSlice";

const { Option } = Select;
const { Title } = Typography;

const AddVisit = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch data from Redux store
  const { patients } = useSelector((state) => state.getPatients);
  const { userInfo } = useSelector((state) => state.getUsers);
  const { loading: addPaymentLoading, error: addPaymentError } = useSelector(
    (state) => state.getPayments
  );
  const { loading, error, successCreate, createdVisit } = useSelector(
    (state) => state.getVisits
  );

  useEffect(() => {
    dispatch(listPatients());
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
      created_by: userInfo.user.id || null,
    };

    dispatch(createVisit(formattedData));
  };

  return (
    <div className="mt-4">
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/management/patients/visits">Visits</Link> },
          { title: "Add Visit" },
        ]}
      />

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
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select a patient"
            >
              {patients.map((patient) => (
                <Option key={patient.id} value={patient.id}>
                  {patient.first_name} {patient.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Adding visit..." : "Add Visit"}
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
