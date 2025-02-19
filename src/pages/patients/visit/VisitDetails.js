import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { visitDetails } from "../../../store/patient/visitSlice";
import {
  listInvoices,
  listInvoiceItems,
} from "../../../store/finance/invoiceSlice";
import {
  listPayments,
  listPaymentItems,
} from "../../../store/finance/paymentSlice";
import { listInsuredPatients } from "../../../store/management/insuredPatientSlice";

import {
  Breadcrumb,
  Card,
  Descriptions,
  Avatar,
  Tag,
  Typography,
  Button,
  Col,
  Row,
  Space,
  Table,
  Divider,
} from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const VisitDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch visit details
  const { loading, error, visit } = useSelector((state) => state.getVisits);
  const { insuredPatients } = useSelector((state) => state.getInsuredPatients);

  const {
    invoices,
    invoiceItems,
    loading: invoiceLoading,
  } = useSelector((state) => state.getInvoices);
  const {
    payments,
    paymentItems,
    loading: paymentLoading,
  } = useSelector((state) => state.getPayments);

  // Determine if the patient is insured
  const patientNumber = String(visit?.patient_details?.patient_number || "");
  const patient_is_insured = insuredPatients.some(
    (insured) =>
      String(insured.insured_patient.patient_number) === patientNumber
  );

  // Fetch necessary data
  useEffect(() => {
    dispatch(visitDetails(id));
    dispatch(listInsuredPatients());
  }, [dispatch, id]);

  useEffect(() => {
    if (visit) {
      if (patient_is_insured) {
        dispatch(listInvoices());
        dispatch(listInvoiceItems());
      } else {
        dispatch(listPayments());
        dispatch(listPaymentItems());
      }
    }
  }, [dispatch, visit, patient_is_insured]);

  const visitPayment = payments.find(
    (payment) => String(payment.visit_number) === String(visit?.visit_number)
  );

  const filteredPaymentItems = paymentItems.filter(
    (item) => Number(item.payment) === Number(visitPayment?.id)
  );

  const visitInvoice = invoices.find(
    (invoice) => invoice.visit.id === visit?.id
  );

  const filteredInvoiceItems = invoiceItems.filter(
    (item) => item.invoice === visitInvoice?.id
  );

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/management/patients/visits">Visits</Link> },
          { title: "Visit Details" },
        ]}
      />

      <Card title="Visit Details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : visit ? (
          <div className="profile-container">
            {/* Patient Information */}
            <Title level={4}>Patient Information</Title>
            <div className="profile-header">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {visit.patient_details?.first_name}{" "}
                {visit.patient_details?.middle_name}{" "}
                {visit.patient_details?.last_name}
              </Title>
              <Text type="secondary" className="profile-username">
                @{visit.patient_details?.username || "N/A"}
              </Text>
            </div>

            {/* Visit Information */}
            <Descriptions
              title="Visit Details"
              bordered
              column={2}
              className="mt-3"
            >
              <Descriptions.Item label="Visit ID">
                {visit.visit_number}
              </Descriptions.Item>
              <Descriptions.Item label="Visit Date">
                <CalendarOutlined /> {visit.visit_date}
              </Descriptions.Item>
              <Descriptions.Item label="Department">
                {visit.department_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Assigned Doctor">
                {visit.doctor_name ? visit.doctor_name : "Not assigned"}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    visit.status === "completed"
                      ? "green"
                      : visit.status === "onprogress"
                      ? "cyan"
                      : "orange"
                  }
                >
                  {visit.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Active Visit">
                {visit.is_active ? "Yes" : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Insurance Status">
                <Tag color={patient_is_insured ? "blue" : "red"}>
                  {patient_is_insured ? "Insured" : "Uninsured"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {/* Financial Information */}
            <Title level={4} className="mt-4">
              {patient_is_insured ? "Invoice Details" : "Payment Details"}
            </Title>

            {/* Display Total Amounts */}
            <Descriptions bordered column={1} className="mt-3">
              <Descriptions.Item label="Total Amount">
                <strong>
                  {patient_is_insured
                    ? visitInvoice?.total_amount
                    : visitPayment?.amount}{" "}
                  TZS
                </strong>
              </Descriptions.Item>
            </Descriptions>
            <Divider />

            {/* Show Invoice or Payment Items */}
            {patient_is_insured ? (
              invoiceLoading ? (
                <Loader />
              ) : (
                <Table
                  dataSource={filteredInvoiceItems}
                  columns={[
                    {
                      title: "Item Name",
                      dataIndex: ["item", "name"], // Access item.name
                      key: "name",
                      render: (_, record) => record.item?.name || "N/A",
                    },
                    {
                      title: "Description",
                      dataIndex: ["item", "description"], // Access item.description
                      key: "description",
                      render: (_, record) => record.item?.description || "N/A",
                    },
                    {
                      title: "Price",
                      dataIndex: ["item", "price"], // Access item.price
                      key: "price",
                      render: (_, record) =>
                        `${record.item?.price?.toLocaleString()} TZS` || "N/A",
                    },
                  ]}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              )
            ) : paymentLoading ? (
              <Loader />
            ) : (
              <Table
                dataSource={filteredPaymentItems}
                columns={[
                  {
                    title: "Service",
                    dataIndex: ["item name"], // Fetching from item.name
                    key: "service_name",
                    render: (_, record) => record?.item_name || "N/A",
                  },
                  {
                    title: "Description",
                    dataIndex: ["item", "description"], // Fetching from item.description
                    key: "description",
                    render: (_, record) => record?.item_type || "N/A",
                  },
                  {
                    title: "Amount Paid",
                    dataIndex: ["item", "price"], // Fetching from item.price
                    key: "amount",
                    render: (_, record) =>
                      `TSH ${record?.item_price?.toLocaleString()}` || "N/A",
                  },
                  {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: (status) => (
                      <Tag color={status === "pending" ? "orange" : "green"}>
                        {status}
                      </Tag>
                    ),
                  },
                ]}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            )}

            {/* Action Buttons */}
            <Row justify="center" className="profile-actions mt-4">
              <Col>
                <Space>
                  <Link to={`/management/patients/visits/${id}/edit`}>
                    <Button type="primary">Edit Visit</Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No visit found</Message>
        )}
      </Card>
    </div>
  );
};

export default VisitDetails;
