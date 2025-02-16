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
  Drawer,
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
const { Panel } = Collapse;
const { TextArea } = Input;

const MovementDetails = ({ patient }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm(); // Form instance
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Control drawer visibility

  // Redux State
  const { departments, loading: departmentsLoading } = useSelector(
    (state) => state.getDepartments
  );
  const {
    users,
    userInfo,
    loading: usersLoading,
  } = useSelector((state) => state.getUsers);
  const {
    loading: visitLoading,
    error,
    visit,
  } = useSelector((state) => state.getVisits);
  const { insuredPatients } = useSelector((state) => state.getInsuredPatients);
  const { loading: assignLoading } = useSelector(
    (state) => state.getVisitComments
  );

  // Fetch Data on Component Mount
  useEffect(() => {
    dispatch(visitDetails(id));
    dispatch(listInsuredPatients());
    dispatch(listDepartments());
    dispatch(listUsers());
  }, [dispatch, id]);

  // Pre-fill the form if visit details are available
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
  // Handle form submission
  const handleSubmit = (values) => {
    const { department, assigned_doctor, comment } = values;

    if (!visit) {
      message.error("Visit details are missing.");
      return;
    }

    dispatch(
      assignDoctor({
        id,
        visit_id: visit.id,
        doctor_id: assigned_doctor,
        department_id: department,
      })
    );

    dispatch(
      addVisitComment({
        id,
        description: comment,
        created_by: userInfo?.user?.id,
        visit: visit.id,
      })
    )
      .then(() => {
        message.success("Visit forwarded successfully!");
        setIsDrawerVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        message.error(`Error: ${error}`);
      });
  };

  // Calculate Patient Age
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

  // Get Patient's Insurer
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
  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);
  const [forResult, setForResult] = useState(true);
  const [makeConfidential, setMakeConfidential] = useState(true);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/patients/movement">Patient Movements</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Movement Details</Breadcrumb.Item>
      </Breadcrumb>

      {visitLoading && <Loader />}
      {error && <Message>{error}</Message>}

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
            <Text strong>Gender: </Text>
            {visit?.patient_details?.gender} <hr />
            <Text strong>Age: </Text>{" "}
            {getAge(visit?.patient_details?.date_of_birth)} <hr />
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Insurer: </Text> {getInsurer()} <hr />
            <Text strong>Created By: </Text> {visit?.createdBy} <hr />
            <Text strong>Assigned doctor: </Text>
            {visit?.doctor_name} <hr />
            <Text strong>Department: </Text>
            {visit?.department_name} <hr />
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row justify="center" style={{ marginTop: 20 }}>
          <Button
            type="primary"
            icon={<ForwardOutlined />}
            onClick={showDrawer}
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
      <Drawer
        title="Assign Forward"
        visible={isDrawerVisible}
        onClose={closeDrawer}
        width={600}
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
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={assignLoading}>
              Assign
            </Button>
          </Row>
        </Form>
      </Drawer>

      {/* Collapsible Sections */}
      <Collapse accordion>
        {/* Vital Signs */}
        <Panel header="🩺 Vital Signs" key="1">
          <List
            dataSource={patientDetails.vitals}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Panel>

        {/* Medical Services */}
        <Panel header="🏥 Medical Services" key="2">
          <List
            dataSource={patientDetails.medicalServices}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Panel>

        {/* Pharmacy List */}
        <Panel header="💊 Pharmacy List" key="3">
          <List
            dataSource={patientDetails.pharmacyList}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Panel>

        {/* Job Flows */}
        <Panel header="📜 Job Flows" key="4">
          <List
            dataSource={patientDetails.jobFlows}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default MovementDetails;
