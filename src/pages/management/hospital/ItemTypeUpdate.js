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
  itemTypeDetails,
  updateItemType,
} from "../../../store/management/itemTypeSlice";

const { Title } = Typography;

const ItemTypeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loading, error, itemType } = useSelector(
    (state) => state.getItemTypes
  );

  useEffect(() => {
    dispatch(itemTypeDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (itemType) {
      form.setFieldsValue({
        name: itemType.name,
        description: itemType.description,
      });
    }
  }, [itemType, form]);

  const onFinish = (values) => {
    dispatch(updateItemType({ id, values }))
      .unwrap()
      .then(() => {
        message.success("Item type updated successfully!");
        navigate(`/management/item-types/${id}`);
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
          <Link to="/management/item-types">Item Types</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Item</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Update Item Type Details" className="shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Title level={5}>Item Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Item Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ItemTypeUpdate;
