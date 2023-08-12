import { Anchor } from "antd";
import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const AdminNav = () => {
  return (
    <Menu mode="inline">
      <Menu.Item key="0">
        <Link to="/admin/dashboard">Order Management</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/admin/sales-management">Sales Management</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admin/product">Product</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/admin/products">Products</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/admin/category">Category</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/admin/sub">Sub Category</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/admin/coupon">Coupon</Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/user/password">Password</Link>
      </Menu.Item>
      <Menu.Item key="8">
        <Link to="/admin/support-chat">Support Chat</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AdminNav;
