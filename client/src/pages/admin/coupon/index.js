import React from "react";
import ContainerPage from "../../../core/ContainerPage/index";
import {
  Row,
  Col,
  Space,
  Input,
  Form,
  DatePicker,
  Button,
  message,
} from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { createCoupon } from "../../../functions/coupon";
const Coupon = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onFinish = async (values) => {
    console.log(values);
    await createCoupon(values)
      .then((res) => message.success("Create success"))
      .catch((err) => message.error(err));
  };
  return (
    <ContainerPage>
      <Row>
        <Col>
          <AdminNav />
        </Col>
        <Col>
          <h2>Create Coupon</h2>
          <Form onFinish={(values) => onFinish(values)}>
            <Space direction="vertical" size="24">
              <Form.Item name="name" label="Coupon Name">
                <Input placeholder="Nhập tên coupon"></Input>
              </Form.Item>
              <Form.Item name="discount" label="Discount">
                <Input placeholder="Discount"></Input>
              </Form.Item>
              <Form.Item name="expiry" label="Expiry Date">
                <DatePicker onChange={onChange} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default Coupon;
