import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createOrUpdateUser } from "../../functions/auth";
const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //   const params = useParams();
  //   console.log("Check params :", params);
  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required ");
      return;
    }
    if (password.length < 6) {
      toast.error("Password > 6 charaters");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result?.user.emailVerified) {
        // remove user email in local storage
        window.localStorage.removeItem("emailForRegistation");
        // get user ID token
        let user = auth.currentUser;
        await user.updatePassword(password); // hàm này để lưu cái mật khẩu  cho dễ
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("Check user :", user, idTokenResult);
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
          })
          .catch();
        //redirect
        navigate("/");
      }
      console.log("Check result :", result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistation"));
  }, []);
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Compelete</h4>
          <Input
            placeholder="Enter e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
          />
          <Input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Compelte Registration
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterComplete;
