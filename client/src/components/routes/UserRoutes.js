import React, { useEffect, useState } from "react";
import { Route, Link, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import style from "./styles.module.scss";
const UserRoutes = ({ children, element, ...rest }) => {
  const { user } = useSelector((state) => state);
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);
  return user && user.token ? (
    <Outlet />
  ) : (
    <>
      <div className="container p-5 text-center">
        You not login, redirect to login page in {count} seconds...
      </div>
      {count == 0 && <Navigate to="/login" />}
    </>
  );
  //   return (
  //     <Route
  //       {...rest}
  //       render={() =>
  //         user && user.token ? (
  //           { element }
  //         ) : (
  //           <Spin tip="Loading" size="large">
  //             <div className={style.content} />{" "}
  //           </Spin>
  //         )
  //       }
  //     />
  //   );
};

export default UserRoutes;
