import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Card,
  message,
  InputNumber,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  createHospitalItem,
  resetCreateState,
} from "../../../store/management/hospitalItemSlice";
import { listItemTypes } from "../../../store/management/itemTypeSlice";
import { listInsuranceCompanies } from "../../../store/management/insuranceCompanySlice"; // Fetch insurance companies

const { Option } = Select;

const AddHospitalItem = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useSelector(
    (state) => state.getHospitalItems
  );
  const { itemTypes } = useSelector((state) => state.getItemTypes);
  const { insuranceCompanies } = useSelector(
    (state) => state.getInsuranceCompanies
  );

  useEffect(() => {
    dispatch(listItemTypes());
    dispatch(listInsuranceCompanies()); // Fetch available insurance companies
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Hospital item added successfully!");
      navigate("/management/hospital-items");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    const newItem = {
      ...values,
      insurance_company_ids: values.insurance_company_ids || [], // Send as IDs
    };

    dispatch(createHospitalItem(newItem));
  };

  return (
    <div className="mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/hospital-items">Hospital Items</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Hospital Item</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}

      <Card title="Add Hospital Item" className="shadow">
        <Form form={form} layout="vertical" onFinish={submitHandler}>
          <Form.Item
            label="Item Name"
            name="name"
            rules={[{ required: true, message: "Enter item name" }]}
          >
            <Input placeholder="Enter item name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item label="Item Type" name="item_type">
            <Select placeholder="Select an item type">
              {itemTypes.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter item price" }]}
          >
            <InputNumber min={0} className="w-full" placeholder="Enter price" />
          </Form.Item>

          {/* Display Insurance Companies */}
          <Form.Item label="Insurance Companies (Read-Only)">
            <Select mode="multiple" placeholder="Insurance companies" disabled>
              {insuranceCompanies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Send Insurance Company IDs when creating */}
          <Form.Item
            label="Select Insurance Companies"
            name="insurance_company_ids"
            rules={[{ required: true, message: "Select at least one company" }]}
          >
            <Select mode="multiple" placeholder="Select insurance companies">
              {insuranceCompanies.map((company) => (
                <Option key={company.id} value={company.id}>
                  {company.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Saving..." : "Add Hospital Item"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default AddHospitalItem;
