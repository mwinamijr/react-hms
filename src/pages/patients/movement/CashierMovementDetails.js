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
  List,
  Typography,
  Table,
  Checkbox,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  DollarOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { visitDetails } from "../../../store/patient/visitSlice";
import { listInsuredPatients } from "../../../store/management/insuredPatientSlice";
import {
  completePayments,
  listVisitPaymentItems,
  listVisitPayments,
} from "../../../store/finance/paymentSlice";

const { Title, Text } = Typography;

const MovementDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux State
  const {
    loading: visitLoading,
    error,
    visit,
  } = useSelector((state) => state.getVisits);
  const { insuredPatients } = useSelector((state) => state.getInsuredPatients);
  const {
    loading: paymentLoading,
    error: paymentError,
    payments,
    paymentItems,
    completed,
    successUpdate,
  } = useSelector((state) => state.getPayments);

  useEffect(() => {
    dispatch(visitDetails(id));
    dispatch(listInsuredPatients());
    dispatch(listVisitPayments(id));
    dispatch(listVisitPaymentItems(id));
  }, [dispatch, id]);

  const [selectedItems, setSelectedItems] = useState([]);

  // **Checkbox Handler**
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const submitHandler = () => {
    if (selectedItems.length === 0) return;

    const values = {
      payment_id: payments?.id,
      item_ids: selectedItems,
    };

    dispatch(completePayments({ id, values }));
    if (successUpdate) {
      message.success(`${completed.details}`);
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

  const [activeComponent, setActiveComponent] = useState(null);

  const posPayments = paymentItems
    .filter((item) => item.item_type === "Consultation fee")
    .map((item) => ({ ...item, key: item.id }));

  const sum = (items) =>
    items.reduce((acc, item) => acc + (item.item_price || 0), 0);

  const pendingPayments =
    paymentItems?.filter((item) => item.status === "pending") || [];
  const totalRemaining = sum(pendingPayments);
  const totalPaid = sum(
    paymentItems?.filter((item) => item.status === "completed") || []
  );
  const noOfPendingPayments = pendingPayments.length;
  const totalRequired = payments?.amount || 0;

  const posColumns = [
    { title: "Name", dataIndex: "item_name", key: "item_name" },
    { title: "Price (Tsh)", dataIndex: "item_price", key: "item_price" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (_, record) => (
        <Checkbox checked={record.status === "completed"} disabled />
      ),
    },
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.includes(record.id)}
          onChange={() => handleCheckboxChange(record.id)}
          disabled={record.status === "completed"}
        />
      ),
    },
  ];

  // Dummy Data for Pharmacy & Medical Services
  const pharmacyData = [
    {
      key: 1,
      code: "MED001",
      name: "Paracetamol",
      quantity: 2,
      price: 10,
      received: false,
      billed: false,
    },
    {
      key: 2,
      code: "MED002",
      name: "Ibuprofen",
      quantity: 1,
      price: 15,
      received: false,
      billed: false,
    },
  ];

  const servicesData = [
    { key: 1, code: "SRV001", name: "X-Ray", price: 50, received: false },
    { key: 2, code: "SRV002", name: "Blood Test", price: 30, received: false },
  ];

  const columns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price (Tsh)", dataIndex: "price", key: "price" },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
      render: (_, record) => <Checkbox checked={record.received} />,
    },
    {
      title: "Billed",
      dataIndex: "billed",
      key: "billed",
      render: (_, record) => <Checkbox checked={record.billed} />,
    },
  ];

  const servicesColumns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Service", dataIndex: "name", key: "name" },
    { title: "Price (TSH)", dataIndex: "price", key: "price" },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
      render: (_, record) => <Checkbox checked={record.received} />,
    },
  ];

  const patientDetails = {
    vitals: ["BP: 120/80", "Pulse: 75 bpm"],
    medicalServices: ["X-Ray", "Blood Test"],
    pharmacyList: ["Paracetamol", "Ibuprofen"],
    jobFlows: ["Doctor Assigned", "Lab Test Ordered"],
  };

  const collapseItems = [
    {
      key: "vitalSigns",
      label: "🩺 Vital Signs",
      children: (
        <List
          dataSource={patientDetails.vitals}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: "medicalHistories",
      label: "📜 Medical Histories",
    },
    {
      key: "medicalServices",
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
      key: "medicalDiagnosis",
      label: "📜 Medical Diagnosis",
      children: (
        <List
          dataSource={patientDetails.jobFlows}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
  ];

  const PaymentTop = () => (
    <div>
      <Title level={4}>
        <u>Amount required - {totalRequired}</u>
      </Title>
      <Table
        dataSource={[
          {
            key: "date",
            label: "Visit Date",
            value: visit.visit_date,
          },
          {
            key: "1",
            label: "Pending Payments",
            value: noOfPendingPayments,
          },
          {
            key: "2",
            label: "Total Remaining",
            value: totalRemaining,
          },
          {
            key: "3",
            label: "Total Paid",
            value: totalPaid,
          },
        ]}
        pagination={false}
        columns={[
          {
            title: "Description",
            dataIndex: "label",
            key: "label",
          },
          {
            title: "Amount",
            dataIndex: "value",
            key: "value",
            render: (text) => <strong>{text}</strong>,
          },
        ]}
        bordered
      />
      <Divider />
    </div>
  );

  return (
    <div>
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
      {visitLoading || (paymentLoading && <Loader />)}
      {error && <Message>{error}</Message>}
      {paymentError && <Message>{paymentError}</Message>}

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
            <Text strong>Patient Number:</Text>{" "}
            {visit?.patient_details?.patient_number} <hr />
            <Text strong>Visit Number:</Text> {visit?.visit_number} <hr />
            <Text strong>Assigned doctor:</Text>{" "}
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "1.1rem",
              }}
            >
              {visit?.doctor_details?.first_name}{" "}
              {visit?.doctor_details?.last_name}
            </span>
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Gender:</Text> {visit?.patient_details?.gender} <hr />
            <Text strong>Age:</Text>{" "}
            {getAge(visit?.patient_details?.date_of_birth)} <hr />
            <Text strong>Insurer:</Text> {getInsurer()} <hr />
            <Text strong>Created By:</Text> {visit?.createdBy} <hr />
            <Text strong>Department:</Text>{" "}
            <span
              style={{
                color: "red",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "1.1rem",
              }}
            >
              {visit?.department_details.name}
            </span>
          </Col>
        </Row>
      </Card>

      <Row justify="center" style={{ marginTop: 20 }}>
        <Button
          type="primary"
          icon={<FileTextOutlined />}
          style={{ marginLeft: 10 }}
          onClick={() => setActiveComponent("preview")}
        >
          Preview File
        </Button>
        <Button
          type="primary"
          icon={<MedicineBoxOutlined />}
          style={{ marginLeft: 10 }}
          onClick={() => setActiveComponent("pharmacy")}
        >
          Pharmacy
        </Button>
        <Button
          type="primary"
          icon={<SolutionOutlined />}
          style={{ marginLeft: 10 }}
          onClick={() => setActiveComponent("services")}
        >
          Medical Services
        </Button>
        <Button
          type="primary"
          icon={<DollarOutlined />}
          style={{ marginLeft: 10 }}
          onClick={() => setActiveComponent("pos")}
        >
          POS Invoice
        </Button>
      </Row>

      {activeComponent === "preview" && (
        <Card title="Patient File Preview" style={{ marginTop: 20 }}>
          <Collapse accordion items={collapseItems} />;
        </Card>
      )}

      {activeComponent === "pharmacy" && (
        <Card title="Pharmacy" style={{ marginTop: 20 }}>
          <PaymentTop />
          <Table dataSource={pharmacyData} columns={columns} />
        </Card>
      )}

      {activeComponent === "services" && (
        <Card title="Medical Services" style={{ marginTop: 20 }}>
          <PaymentTop />
          <Table dataSource={servicesData} columns={servicesColumns} />
        </Card>
      )}

      {activeComponent === "pos" && (
        <Card title="POS Invoice" style={{ marginTop: 20 }}>
          <PaymentTop
            totalRequired={totalRequired}
            noOfPendingPayments={noOfPendingPayments}
            totalRemaining={totalRemaining}
            totalPaid={totalPaid}
          />
          <Table dataSource={posPayments} columns={posColumns} />

          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={paymentLoading || selectedItems.length === 0}
            onClick={submitHandler}
          >
            {paymentLoading ? "Submitting..." : "Submit Payment"}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default MovementDetails;
