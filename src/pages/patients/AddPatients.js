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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  createPatient,
  resetCreateState,
} from "../../store/patient/patientSlice";

const { Title } = Typography;
const { Option } = Select;

const AddPatient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, successCreate } = useSelector(
    (state) => state.getPatients
  );

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: null,
    email: "",
    phone: "",
    address: "",
    occupation: "",
    kin_name: "",
    kin_relation: "",
    kin_phone: "",
    national_id: "",
    marital_status: "single",
    priority: false,
    payment_method: "cash",
    insurance_provider: "",
    insurance_policy_number: "",
    is_active: true,
  });

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Patient added successfully!");
      navigate("/management/patients");
    }
  }, [dispatch, successCreate, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? dayjs(formData.date_of_birth).format("YYYY-MM-DD")
        : null,
    };
    dispatch(createPatient(formattedData));
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients">Patients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Patient Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card style={{ maxWidth: 800, margin: "auto", marginTop: 20 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Add Patient
        </Title>
        {error && message.error(error)}

        <form onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={8}>
              <Input
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Middle Name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <DatePicker
                placeholder="Date of Birth"
                onChange={handleDateChange}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Input
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Col>
            <Col span={12}>
              <Input
                placeholder="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Input
                placeholder="Next of Kin Name"
                name="kin_name"
                value={formData.kin_name}
                onChange={handleChange}
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Next of Kin Relation"
                name="kin_relation"
                value={formData.kin_relation}
                onChange={handleChange}
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Next of Kin Phone"
                name="kin_phone"
                value={formData.kin_phone}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Input
                placeholder="National ID"
                name="national_id"
                value={formData.national_id}
                onChange={handleChange}
              />
            </Col>
            <Col span={8}>
              <Select
                value={formData.marital_status}
                name="marital_status"
                onChange={(value) =>
                  setFormData({ ...formData, marital_status: value })
                }
                style={{ width: "100%" }}
              >
                <Option value="single">Single</Option>
                <Option value="married">Married</Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select
                value={formData.payment_method}
                name="payment_method"
                onChange={(value) =>
                  setFormData({ ...formData, payment_method: value })
                }
                style={{ width: "100%" }}
              >
                <Option value="cash">Cash</Option>
                <Option value="insurance">Insurance</Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Checkbox
              checked={formData.priority}
              onChange={handleCheckboxChange}
              name="priority"
            >
              Priority Patient
            </Checkbox>
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? <Spin /> && "Adding patient ...." : "Add Patient"}
            </Button>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddPatient;
