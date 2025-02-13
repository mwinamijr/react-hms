import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Form, Input, Select, Button, Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  createInsuredPatient,
  resetCreateState,
} from "../../../store/management/insuredPatientSlice";
import { listPatients } from "../../../store/patient/patientSlice";
import { listInsuranceCompanies } from "../../../store/management/insuranceCompanySlice";

const { Option } = Select;

const AddInsuredPatient = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patients } = useSelector((state) => state.getPatients);
  const { insuranceCompanies } = useSelector(
    (state) => state.getInsuranceCompanies
  );
  const { loading, error, successCreate } = useSelector(
    (state) => state.getInsuredPatients
  );

  useEffect(() => {
    dispatch(listPatients());
    dispatch(listInsuranceCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Insured patient added successfully!");
      navigate("/management/insurance");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    const formattedValues = {
      ...values,
      provider_id: values.provider,
    };

    dispatch(createInsuredPatient(formattedValues));
  };

  return (
    <div className="mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/insurance">Insured Patients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Insured Patient</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}

      <Card title="Add Insured Patient" className="shadow">
        <Form form={form} layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label="Select Patient"
            name="patient"
            rules={[{ required: true, message: "Select a patient" }]}
          >
            <Select placeholder="Select a patient">
              {patients.map((patient) => (
                <Option key={patient.id} value={patient.id}>
                  {patient.first_name} {patient.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Insurance Provider"
            name="provider"
            rules={[
              { required: true, message: "Select an insurance provider" },
            ]}
          >
            <Select placeholder="Select an insurance provider">
              {insuranceCompanies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Policy Number"
            name="policy_number"
            rules={[{ required: true, message: "Enter policy number" }]}
          >
            <Input placeholder="Enter policy number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Saving..." : "Add Insured Patient"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default AddInsuredPatient;
