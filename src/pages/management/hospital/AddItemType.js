import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Form, Input, Button, Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import {
  createItemType,
  resetCreateState,
} from "../../../store/management/itemTypeSlice";

const AddItemType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useSelector(
    (state) => state.getItemTypes
  );

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Hospital item added successfully!");
      navigate("/management/item-types");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    dispatch(createItemType(values));
  };

  return (
    <div className="mt-4">
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/hospital-items">Item Types</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Item Type</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}

      <Card title="Add Item Type" className="shadow">
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? "Saving..." : "Add Item Type"}
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};

export default AddItemType;
