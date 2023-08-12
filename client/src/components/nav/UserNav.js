import { Anchor } from "antd";
import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const UserNav = () => {
  return (
    // <nav>
    //   <ul className="nav flex-column">
    //     <li className="nav-item">
    //       <Link to="/user/history" className="nav-link">
    //         History
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/user/password " className="nav-link">
    //         Password
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/user/wishlist" className="nav-link">
    //         Wishlist
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
    // <Anchor
    //   items={[
    //     {
    //       key: "history",
    //       href: "/user/history",
    //       title: "History",
    //     },
    //     {
    //       key: "password",
    //       href: "/user/password",
    //       title: "Password",
    //     },
    //     {
    //       key: "wishlist",
    //       href: "/user/wishlist",
    //       title: "WishList",
    //     },
    //   ]}
    // />
    <Menu mode="inline">
      <Menu.Item key="1">
        <Link to="/user/history">History</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/user/password">Password</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/user/wishlist">WishList</Link>
      </Menu.Item>
    </Menu>
  );
};

export default UserNav;
