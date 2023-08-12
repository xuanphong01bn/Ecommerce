import React, { useEffect, useState } from "react";
import { Route, Link, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import style from "./styles.module.scss";
import { currentAdmin } from "../../functions/auth";
const AdminRoutes = ({ children, element, ...rest }) => {
  const { user } = useSelector((state) => state);
  const [count, setCount] = useState(3);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT_ADMIN-Res :", res);
          setOk(true);
        })
        .catch(() => {
          setOk(false);
          console.log("Admin route errour");
        });
    }
  }, [user]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  return ok ? (
    <Outlet />
  ) : (
    <>
      <div className="container p-5 text-center">
        Access denid, redirect to home page in {count} seconds...
      </div>
      {count == 0 && <Navigate to="/" />}
    </>
  );
};

export default AdminRoutes;
