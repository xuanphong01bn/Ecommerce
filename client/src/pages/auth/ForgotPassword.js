import React, { useEffect, useState } from "react";
import { Menu, message, Spin, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  MailOutlined,
} from "@ant-design/icons";
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);
  const submitEmail = async (values) => {
    console.log("value email :", values);
    setLoading(true);
    const config = {
      url: "http://localhost:3000/login",
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        message.success("Check email you have entered");
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.message);
        console.log(err.message);
      });
  };
  return (
    <Spin spinning={loading}>
      <div className="col-md-6 offset-md-3 p-5">
        {loading ? <Spin /> : <h4>Forgot Password</h4>}
        <Form onFinish={submitEmail}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" disabled={!email}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default ForgotPassword;
