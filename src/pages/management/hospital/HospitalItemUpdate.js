import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Select,
  Card,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  hospitalItemDetails,
  updateHospitalItem,
} from "../../../store/management/hospitalItemSlice";
import { listInsuranceCompanies } from "../../../store/management/insuranceCompanySlice";
import { listItemTypes } from "../../../store/management/itemTypeSlice";

const { Title } = Typography;
const { Option } = Select;

const HospitalItemUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading, error, hospitalItem } = useSelector(
    (state) => state.getHospitalItems
  );

  const { insuranceCompanies } = useSelector(
    (state) => state.getInsuranceCompanies
  );
  const { itemTypes } = useSelector((state) => state.getItemTypes);

  useEffect(() => {
    dispatch(hospitalItemDetails(id));
    dispatch(listInsuranceCompanies());
    dispatch(listItemTypes());
  }, [dispatch, id]);

  useEffect(() => {
    if (hospitalItem) {
      form.setFieldsValue({
        name: hospitalItem.name,
        description: hospitalItem.description,
        price: hospitalItem.price,
        item_type_id: hospitalItem.item_type?.id,
        insurance_company_ids:
          hospitalItem.insurance_company?.map((company) => company.id) || [],
      });
    }
  }, [hospitalItem, form]);

  const onFinish = (values) => {
    const updatedData = {
      ...values,
      item_type_id: values.item_type_id,
      insurance_company_ids: values.insurance_company_ids || [],
    };

    dispatch(updateHospitalItem({ id, values: updatedData }))
      .unwrap()
      .then(() => {
        message.success("Hospital item updated successfully!");
        navigate("/management/hospital-items");
      })
      .catch(() => message.error("Failed to update hospital item"));
  };

  return (
    <div className="edit-profile-container mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/hospital-items">Hospital Items</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Item</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Update Hospital Item Details" className="shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Title level={5}>Hospital Item Information</Title>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Item Name"
                name="name"
                rules={[{ required: true, message: "Item name is required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Price" name="price">
                <Input type="number" min="0" step="0.01" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                label="Item Type"
                name="item_type_id"
                rules={[{ required: true, message: "Select an item type" }]}
              >
                <Select placeholder="Select an item type">
                  {itemTypes.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item label="Current Insurance Companies (Read-Only)">
                <Select
                  mode="multiple"
                  placeholder="Insurance companies"
                  disabled
                >
                  {hospitalItem?.insurance_company?.map((company) => (
                    <Option key={company.id} value={company.id}>
                      {company.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                label="Update Insurance Companies"
                name="insurance_company_ids"
                rules={[
                  { required: true, message: "Select at least one company" },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select insurance companies"
                >
                  {insuranceCompanies.map((company) => (
                    <Option key={company.id} value={company.id}>
                      {company.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={loading}
              loading={loading}
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HospitalItemUpdate;
