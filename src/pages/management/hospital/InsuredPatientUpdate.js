import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  insuredPatientDetails,
  updateInsuredPatient,
} from "../../../store/management/insuredPatientSlice";

const { Title } = Typography;

const InsuredPatientUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading, error, insuredPatient } = useSelector(
    (state) => state.getInsuredPatients
  );

  useEffect(() => {
    dispatch(insuredPatientDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (insuredPatient) {
      form.setFieldsValue({
        patient_name: `${insuredPatient.insured_patient?.first_name || ""} ${
          insuredPatient.insured_patient?.last_name || ""
        }`,
        provider_name: insuredPatient.provider?.name || "",
        provider_id: insuredPatient.provider?.id || "", // Needed for backend update
        policy_number: insuredPatient.policy_number || "",
      });
    }
  }, [insuredPatient, form]);

  const onFinish = (values) => {
    const updatedData = {
      ...values,
      provider_id: insuredPatient.provider?.id, // Ensure provider_id is sent
    };

    dispatch(updateInsuredPatient({ id, ...updatedData }))
      .unwrap()
      .then(() => {
        message.success("Insured patient details updated successfully!");
        navigate(`/management/insurance/${id}`);
      })
      .catch(() => message.error("Failed to update insured patient details"));
  };

  return (
    <div className="edit-profile-container mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/insurance">Insured Patients</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Patient</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Update Insured Patient Details" className="shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Title level={5}>Insurance Details</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Patient Name" name="patient_name">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Insurance Provider" name="provider_name">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          {/* Hidden field to send provider_id to the backend */}
          <Form.Item name="provider_id" hidden>
            <Input />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Policy Number"
                name="policy_number"
                rules={[
                  { required: true, message: "Policy number is required" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

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

export default InsuredPatientUpdate;
