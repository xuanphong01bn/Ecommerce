import { Row, Col } from "antd";
import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { message, Spin } from "antd";
import { Form, Input, Button } from "antd";
import { EmailAuthProvider } from "firebase/auth";
import ContainerPage from "../../core/ContainerPage";
const Password = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loadinng, setLoadinng] = useState(false);
  const user = auth.currentUser;
  console.log("Check user :", user, auth);
  const onFinish = async (values) => {
    console.log(
      "Received values of form: ",
      values,
      values.oldPassword,
      user.email
    );
    const credential = EmailAuthProvider.credential(
      user.email,
      values.oldPassword
    );
    setLoadinng(true);
    await user
      .reauthenticateWithCredential(credential)
      .then(async () => {
        await user
          .updatePassword(values.newPassword)
          .then(() => {
            setLoadinng(false);
            message.success("Password updated successfully");
          })
          .catch((error) => {
            setLoadinng(false);
            message.error("Error updating password:", error.message);
          });
      })
      .catch((error) => {
        setLoadinng(false);
        // An error occurred while reauthenticating the user
        message.error("Wrong old password");
      });
  };
  return (
    <ContainerPage>
      <Spin spinning={loadinng}>
        <Row>
          <Col>
            <UserNav />
          </Col>
          <Col>
            <h4>Password Update</h4>
            <Form name="updatePasswordForm" onFinish={onFinish}>
              <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={newPassword.length < 6}
                >
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </ContainerPage>
  );
};

export default Password;
