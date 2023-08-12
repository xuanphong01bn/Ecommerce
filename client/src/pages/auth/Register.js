import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is send to ${email} ! Click to link to continue register !`
    );

    //save user email to local storage
    window.localStorage.setItem("emailForRegistation", email);
    setEmail("");
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* <Space size={[5, 5]} align={"center"}> */}
          <h4>Register</h4>
          <Input
            placeholder="Enter e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </Button>
          {/* </Space> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
