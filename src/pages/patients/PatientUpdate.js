import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  patientDetails,
  updatePatient,
} from "../../store/patient/patientSlice";
import { listInsuranceCompanies } from "../../store/management/insuranceCompanySlice";
import {
  createInsuredPatient,
  listInsuredPatients,
  updateInsuredPatient,
} from "../../store/management/insuredPatientSlice";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  message,
  Checkbox,
} from "antd";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const { Title } = Typography;
const { Option } = Select;

const PatientUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, patient } = useSelector((state) => state.getPatients);
  const { insuranceCompanies } = useSelector(
    (state) => state.getInsuranceCompanies
  );
  const { insuredPatients, error: insuranceError } = useSelector(
    (state) => state.getInsuredPatients
  );
  const isInsured = !!insuredPatients?.find((insuredPatient) => {
    return (
      String(insuredPatient?.insured_patient?.patient_number) ===
      String(patient?.patient_number)
    );
  });

  const insuranceDetails = insuredPatients?.find((insuredPatient) => {
    return (
      String(insuredPatient?.insured_patient?.patient_number) ===
        String(patient?.patient_number) || null
    );
  });

  console.log(insuranceDetails);

  const [form] = Form.useForm();
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceId, setInsuranceId] = useState(null);

  useEffect(() => {
    dispatch(patientDetails(id));
    dispatch(listInsuranceCompanies());
    dispatch(listInsuredPatients());
  }, [dispatch, id]);

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        ...patient,
        date_of_birth: patient.date_of_birth ? patient.date_of_birth : "",
        provider: insuranceDetails?.provider?.id || undefined,
        policy_number: insuranceDetails?.policy_number || "",
      });

      if (isInsured) {
        setHasInsurance(true);
        setInsuranceId(insuranceDetails?.id);
      }
    }
  }, [patient, isInsured, insuranceDetails, form]);

  const onFinish = async (values) => {
    try {
      await dispatch(updatePatient({ id, ...values })).unwrap();
      message.success("Patient updated successfully!");

      // If the patient has insurance, update it
      if (
        hasInsurance &&
        insuranceId &&
        values.provider &&
        values.policy_number
      ) {
        const formData = {
          provider_id: values.provider,
          policy_number: values.policy_number,
          patient: id,
        };
        dispatch(
          updateInsuredPatient({
            id: insuranceId,
            ...formData,
          })
        ).unwrap();
        message.success("Insurance details updated!");
      } else {
        dispatch(
          createInsuredPatient({
            provider_id: values.provider,
            policy_number: values.policy_number,
            patient: id,
          })
        );
      }

      navigate(`/management/patients/${id}`);
    } catch (error) {
      message.error("Failed to update patient. Please try again.");
    }
  };

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/management/patients">Patients</Link> },
          { title: "Patient Update" },
        ]}
      />

      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {insuranceError && <Message>{insuranceError}</Message>}

      <Card title={<Title level={4}>Update Patient Details</Title>}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "First Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Middle Name" name="middle_name">
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Last Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="date_of_birth"
            rules={[{ required: true, message: "Date of Birth is required" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item label="Marital Status" name="marital_status">
            <Select>
              <Option value="single">Single</Option>
              <Option value="married">Married</Option>
            </Select>
          </Form.Item>

          {/* Insurance Checkbox */}
          <Form.Item>
            <Checkbox
              checked={hasInsurance}
              onChange={(e) => setHasInsurance(e.target.checked)}
            >
              Has Insurance?
            </Checkbox>
          </Form.Item>

          {/* Insurance Fields (Only Show if hasInsurance is True) */}
          {hasInsurance && (
            <>
              <Form.Item label="Insurance Provider" name="provider">
                <Select placeholder="Select Insurance Provider">
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
                rules={[
                  { required: true, message: "Policy Number is required" },
                ]}
              >
                <Input placeholder="Enter Policy Number" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Updating ...." : "Update Patient"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default PatientUpdate;
