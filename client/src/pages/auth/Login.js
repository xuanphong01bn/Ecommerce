import React, { useState, useEffect } from "react";
import { Button, Input, Space, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { auth, googleAuthProvider } from "../../firebase";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";
import { useLocation } from "react-router-dom";
import ColumnGroup from "antd/es/table/ColumnGroup";
const Login = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();
  console.log("Check location :", location);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleBasedRedirect = (res) => {
    if (!location?.state?.toCheckout) {
      if (res.data.role == "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };
  const { user } = useSelector((state) => state);
  // useEffect(() => {
  //   if (user && user.token) navigate("/");
  // }, [user]);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log("Check login result :", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch();

      // navigate("/");
      if (location?.state?.toCheckout) {
        navigate("/cart");
      }
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };
  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch();
        // navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* <Space size={[5, 5]} align={"center"}> */}
          <h4>Login</h4>
          <Space.Compact direction="vertical" block size={[5, 5]}>
            <Input
              placeholder="Enter e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              placeholder="Enter password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              icon={loading ? antIcon : <MailOutlined />}
              size="large"
              disabled={!email || password.length < 6}
              onClick={(e) => {
                handleSubmit(e);
              }}
              type="primary"
              className="center-items"
            >
              Login with Email
            </Button>
            <br />
            <Button
              icon={loading ? antIcon : <GoogleOutlined />}
              size="large"
              onClick={() => {
                googleLogin();
              }}
              className="center-items"
              danger
              type="primary"
            >
              Login with Google
            </Button>
            <br />
          </Space.Compact>
          <Link
            to="/forgot/password"
            className="text-danger float-right"
            style={{
              float: "right",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Forgot Password
          </Link>
          {/* </Space> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
