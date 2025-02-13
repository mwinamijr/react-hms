import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { itemTypeDetails } from "../../../store/management/itemTypeSlice";

import {
  Breadcrumb,
  Card,
  Descriptions,
  Typography,
  Button,
  Col,
  Row,
  Space,
} from "antd";
import { TagOutlined } from "@ant-design/icons";

const { Title } = Typography;

const HospitalItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, itemType } = useSelector(
    (state) => state.getItemTypes
  );

  useEffect(() => {
    dispatch(itemTypeDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/management/item-types">Item Types</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Item Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Hospital Item Details">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : itemType ? (
          <div>
            {/* Item Information */}
            <Title level={4}>{itemType.name}</Title>

            <Descriptions bordered column={1} className="mt-3">
              <Descriptions.Item label="Item ID">
                {itemType.id}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <TagOutlined /> {itemType.description || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Action Buttons */}
            <Row justify="center" className="profile-actions mt-4">
              <Col>
                <Space>
                  <Link to={`/management/item-types/${id}/edit`}>
                    <Button type="primary">Edit Item</Button>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No item found</Message>
        )}
      </Card>
    </div>
  );
};

export default HospitalItemDetails;
