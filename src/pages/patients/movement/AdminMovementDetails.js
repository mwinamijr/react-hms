import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Collapse,
  Checkbox,
  List,
  Typography,
  Form,
  message,
  Select,
  Modal,
  Input,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { visitDetails, assignDoctor } from "../../../store/patient/visitSlice";
import { listInsuredPatients } from "../../../store/management/insuredPatientSlice";
import { listDepartments } from "../../../store/management/departmentSlice";
import { listUsers } from "../../../store/user/userSlice";
import { addVisitComment } from "../../../store/management/visitCommentSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;

const MovementDetails = ({ patient }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm(); // Form instance
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redux State
  const { departments, loading: departmentsLoading } = useSelector(
    (state) => state.getDepartments
  );
  const { users, loading: usersLoading } = useSelector(
    (state) => state.getUsers
  );
  const {
    loading: visitLoading,
    error,
    visit,
  } = useSelector((state) => state.getVisits);
  const { insuredPatients } = useSelector((state) => state.getInsuredPatients);
  const { loading: assignLoading } = useSelector(
    (state) => state.getVisitComments
  );

  useEffect(() => {
    dispatch(visitDetails(id));
    dispatch(listInsuredPatients());
    dispatch(listDepartments());
    dispatch(listUsers());
  }, [dispatch, id]);

  useEffect(() => {
    if (visit) {
      form.setFieldsValue({
        department: visit?.department_details?.name
          ? visit?.department_details?.id
          : null,
        assigned_doctor:
          `${visit?.doctor_details?.first_name} ${visit?.doctor_details?.last_name}`
            ? visit?.doctor_details?.id
            : null,
      });
    }
  }, [form, visit]);

  const handleSubmit = (values) => {
    const { department, assigned_doctor, comment } = values;

    if (!visit) {
      message.error("Visit details are missing.");
      return;
    }

    const departmentChanged = department !== visit?.department_details?.id;
    const doctorChanged = assigned_doctor !== visit?.doctor_details?.id;

    if (departmentChanged || doctorChanged) {
      dispatch(
        assignDoctor({
          id,
          visit_id: visit.id,
          doctor_id: assigned_doctor,
          department_id: department,
        })
      )
        .then(() => {
          message.success("Assigned doctor and department successfully!");
        })
        .catch((error) => {
          message.error(`Error: ${error}`);
        });
    }

    if (comment && comment.trim() !== "") {
      dispatch(
        addVisitComment({
          id,
          description: comment,
        })
      )
        .then(() => {
          message.success("Visit forwarded successfully!");
        })
        .catch((error) => {
          message.error(`Error: ${error}`);
        });
    }

    if (
      departmentChanged ||
      doctorChanged ||
      (comment && comment.trim() !== "")
    ) {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getInsurer = () => {
    const insuredPatient = insuredPatients.find(
      (insured) =>
        String(insured.insured_patient.patient_number) ===
        String(visit?.patient_details?.patient_number)
    );
    return insuredPatient ? insuredPatient.provider.name : "Cash";
  };

  // Placeholder Data
  const patientDetails = {
    vitals: patient?.vitals || ["BP: 120/80", "Pulse: 75 bpm"],
    medicalServices: patient?.medicalServices || ["X-Ray", "Blood Test"],
    pharmacyList: patient?.pharmacyList || ["Paracetamol", "Ibuprofen"],
    jobFlows: patient?.jobFlows || ["Doctor Assigned", "Lab Test Ordered"],
  };

  // Drawer Controls
  const [forResult, setForResult] = useState(true);
  const [makeConfidential, setMakeConfidential] = useState(true);

  const collapseItems = [
    {
      key: "1",
      label: "🩺 Vital Signs",
      children: (
        <List
          dataSource={patientDetails.vitals}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "2",
      label: "🏥 Medical Services",
      children: (
        <List
          dataSource={patientDetails.medicalServices}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "3",
      label: "💊 Pharmacy List",
      children: (
        <List
          dataSource={patientDetails.pharmacyList}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "4",
      label: "📜 Job Flows",
      children: (
        <List
          dataSource={patientDetails.jobFlows}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          {
            title: (
              <Link to="/management/patients/movement">Patient Movements</Link>
            ),
          },
          { title: "Movement Details" },
        ]}
      />
      {visitLoading && <Loader />}
      {error && <Message type="error">{error}</Message>}
      <Card bordered style={{ marginBottom: 20 }}>
        <Row gutter={24} align="middle">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar size={100} icon={<UserOutlined />} />
          </Col>
          <Col xs={24} md={10}>
            <Title level={4}>
              {visit?.patient_details?.first_name}{" "}
              {visit?.patient_details?.last_name}
            </Title>
            <Text strong>Patient Number: </Text>
            {visit?.patient_details?.patient_number} <hr />
            <Text strong>Visit Number: </Text>
            {visit?.visit_number} <hr />
            <Text strong>Assigned doctor: </Text>
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "1.1rem",
              }}
            >
              {visit?.doctor_details?.first_name}{" "}
              {visit?.doctor_details?.last_name} <hr />
            </span>
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Gender: </Text>
            {visit?.patient_details?.gender} <hr />
            <Text strong>Age: </Text>{" "}
            {getAge(visit?.patient_details?.date_of_birth)} <hr />
            <Text strong>Insurer: </Text> {getInsurer()} <hr />
            <Text strong>Created By: </Text> {visit?.createdBy} <hr />
            <Text strong>Department: </Text>
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "1.1rem",
              }}
            >
              {visit?.department_details?.name} <hr />
            </span>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row justify="center" style={{ marginTop: 20 }}>
          <Button
            type="primary"
            icon={<ForwardOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Assign Forward
          </Button>
          <Button
            type="default"
            icon={<FileTextOutlined />}
            style={{ marginLeft: 10 }}
          >
            Preview File
          </Button>
        </Row>
      </Card>
      {/* Drawer for Assigning Forward */}
      <Modal
        title="Assign Forward"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={600}
        footer={null}
      >
        <br />
        <Card className="mt-4 text-center">
          <Text strong>Insurer: </Text> {getInsurer()} <br />
        </Card>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="department"
            label="Select Department"
            rules={[{ required: true }]}
          >
            <Select
              loading={departmentsLoading}
              placeholder="Select Department"
            >
              {departments?.map((dept) => (
                <Select.Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="assigned_doctor"
            label="Select Doctor"
            rules={[{ required: true }]}
          >
            <Select loading={usersLoading} placeholder="Select Doctor">
              {users?.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Checkbox
            checked={forResult}
            onChange={(e) => setForResult(e.target.checked)}
          >
            For result{" "}
          </Checkbox>

          <Form.Item name="comment" label="Comment">
            <TextArea
              rows={4}
              placeholder="Write a comment about the patient"
            />
          </Form.Item>

          <Checkbox
            checked={makeConfidential}
            onChange={(e) => setMakeConfidential(e.target.checked)}
          >
            {" "}
            Make Confidetial
          </Checkbox>

          <Row justify="end">
            <Button
              onClick={() => setIsModalOpen(false)}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={assignLoading}>
              Assign
            </Button>
          </Row>
        </Form>
      </Modal>
      {/* Collapsible Sections */}
      <Collapse accordion items={collapseItems} />;
    </div>
  );
};

export default MovementDetails;
