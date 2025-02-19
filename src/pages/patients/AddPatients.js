import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  Typography,
  Checkbox,
  Spin,
  message,
  DatePicker,
  Form,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  createPatient,
  resetCreateState,
} from "../../store/patient/patientSlice";
import { listInsuranceCompanies } from "../../store/management/insuranceCompanySlice";
import { createInsuredPatient } from "../../store/management/insuredPatientSlice";
import Loader from "../../components/Loader";

const { Title } = Typography;
const { Option } = Select;

const AddPatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate, createdPatient } = useSelector(
    (state) => state.getPatients
  );
  const { insuranceCompanies } = useSelector(
    (state) => state.getInsuranceCompanies
  );
  const { loading: insuredPatientsLoading, error: insuredPatientsError } =
    useSelector((state) => state.getInsuredPatients);

  const [hasInsurance, setHasInsurance] = useState(false);

  useEffect(() => {
    dispatch(listInsuranceCompanies());
  }, [dispatch]); // Fetch insurance companies on mount

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Patient added successfully!");
      navigate("/management/patients");
    }
  }, [dispatch, successCreate, navigate]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });

    // Format date_of_birth correctly
    if (values.date_of_birth) {
      formData.set(
        "date_of_birth",
        dayjs(values.date_of_birth).format("YYYY-MM-DD")
      );
    }

    // Dispatch createPatient action
    dispatch(createPatient(formData));

    // Dispatch createInsuredPatient only if insurance details are provided
    if (
      successCreate &&
      hasInsurance &&
      values.provider &&
      values.policy_number
    ) {
      const insuranceData = new FormData();
      insuranceData.append("provider_id", values.provider);
      insuranceData.append("policy_number", values.policy_number);
      insuranceData.append("patient", createdPatient?.id);

      dispatch(createInsuredPatient(insuranceData));
      message.success("Patient Insurance added successfully!");
    }
  };

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/management/patients">Patients</Link> },
          { title: "Add Patient" },
        ]}
      />

      <Card style={{ maxWidth: 800, margin: "auto", marginTop: 20 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Add Patient
        </Title>
        {error && message.error(error)}
        {insuredPatientsError && message.error(insuredPatientsError)}
        {insuredPatientsLoading && <Loader />}

        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="middle_name" label="Middle Name">
                <Input placeholder="Middle Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date_of_birth" label="Date of Birth">
                <DatePicker
                  placeholder="Date of Birth"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Enter a valid email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="address" label="Address">
                <Input.TextArea rows={3} placeholder="Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="occupation" label="Occupation">
                <Input placeholder="Occupation" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Kin Name" name="kin_name">
                <Input placeholder="Kin Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="kin_relation" label="Kin relation">
                <Input placeholder="Kin relation" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Kin phone" name="kin_phone">
                <Input placeholder="Kin phone" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name="priority" valuePropName="checked">
                <Checkbox>Priority Patient</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          {/* Insurance Checkbox */}
          <Row>
            <Col span={12}>
              <Checkbox
                checked={hasInsurance}
                onChange={(e) => setHasInsurance(e.target.checked)}
              >
                Has Insurance?
              </Checkbox>
            </Col>
          </Row>

          {/* Insurance Fields (Only Show if hasInsurance is True) */}
          {hasInsurance && (
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Form.Item name="provider">
                  <Select placeholder="Select Insurance Provider">
                    {insuranceCompanies.map((company) => (
                      <Option key={company.id} value={company.id}>
                        {company.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="policy_number">
                  <Input placeholder="Enter Policy Number" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin /> : "Add Patient"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddPatient;
