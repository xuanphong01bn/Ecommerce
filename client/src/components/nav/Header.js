import React, { useState } from "react";
import { Menu, Input, Modal, Avatar, Dropdown, Badge } from "antd";
import { Link } from "react-router-dom";
import {
  ContainerOutlined,
  SearchOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  AimOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContainerPage from "../../core/ContainerPage";
import styles from "./header.module.scss";
import logo from "../../assets/images/logo.png";
import HeaderSelection from "./HeaderSelection";
import ButtonCore from "../../core/ButtonCore";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
const { SubMenu, Item } = Menu;
const hihi = [
  {
    label: "hehehe",
  },
];
const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onlyWidth = useWindowWidth();
  console.log("width :", onlyWidth);
  const logout = () => {
    firebase.auth().signOut(); // log out bằng firebase ảo vl
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };
  const items = [
    {
      label: <div onClick={() => navigate("/admin/dashboard")}>Dashboard</div>,
      key: "0",
    },
    {
      label: <div onClick={() => logout()}>Logout</div>,
      key: "1",
    },
  ];
  // const hihi = [
  //   {
  //     label: <div onClick={() => navigate("/admin/dashboard")}>Dashboard</div>,
  //     key: "0",
  //   },
  //   {
  //     label: <div onClick={() => logout()}>Logout</div>,
  //     key: "1",
  //   },
  // ];
  const { user, search, cart } = useSelector((state) => state);
  const { text } = search;
  // const [textSearch, setTextSearch] = useState("");
  console.log("Check state :", user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChangeText = (e) => {
    // setTextSearch(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };
  const submitText = (e) => {
    navigate(`/shop/?${text}`);
  };
  console.log("check exist :", hihi, items);
  return (
    <div className={styles.header}>
      <ContainerPage>
        {onlyWidth > 1200 && (
          <div
            className="display-flex-center"
            style={{ height: "60px", gap: "10px" }}
          >
            <div
              style={{
                fontSize: "24px",
                color: "#FFFFFF",
                fontFamily: "cursive",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              SHOPPING FUN
            </div>
            <div>
              <HeaderSelection
                title="Danh mục"
                padding="9px 9px"
                icon={
                  <ContainerOutlined
                    style={{ fontSize: "20px", color: "#FFFFFF" }}
                  />
                }
              />
            </div>
            {/* <div>
          <HeaderSelection
            padding="1px 9px"
            title="Gọi mua hàng <br/> 0978305201"
            icon={
              <PhoneOutlined style={{ fontSize: "20px", color: "#FFFFFF" }} />
            }
          />
        </div> */}
            <div style={{ width: "300px" }}>
              <Input
                size="large"
                placeholder="Bạn cần tìm gì ?"
                prefix={<SearchOutlined />}
                value={text}
                onChange={(e) => handleChangeText(e)}
                onPressEnter={(e) => submitText(e)}
              />
            </div>

            <div onClick={() => navigate("/shop")}>
              <HeaderSelection
                padding="1px 9px"
                title="Xem <br/> Cửa hàng"
                backgroundColor="rgba(39, 106, 245, 0.82)"
                icon={
                  <EnvironmentOutlined
                    style={{ fontSize: "20px", color: "#FFFFFF" }}
                  />
                }
              />
            </div>
            <div>
              <HeaderSelection
                padding="1px 9px"
                title="Tra cứu <br/> đơn hàng"
                backgroundColor="rgba(39, 106, 245, 0.82)"
                icon={
                  <AimOutlined style={{ fontSize: "20px", color: "#FFFFFF" }} />
                }
              />
            </div>
            <div
              onClick={() => {
                navigate("/cart");
              }}
            >
              <HeaderSelection
                padding="9px 9px"
                title="Giỏ hàng<br/>"
                backgroundColor="rgba(39, 106, 245, 0.82)"
                icon={
                  <Badge count={cart.length} size="small">
                    <ShoppingCartOutlined
                      style={{ fontSize: "20px", color: "#FFFFFF" }}
                    />
                  </Badge>
                }
              />
            </div>
            {user ? (
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <div
                  style={{
                    padding: "1px",
                    borderRadius: "4px",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar
                    style={{ backgroundColor: "rgba(39, 106, 245, 0.82)" }}
                    size={32}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>{" "}
                  {user.name.slice(0, 10)}...
                </div>
              </Dropdown>
            ) : (
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <HeaderSelection
                  padding="9px 9px"
                  title="Đăng nhập<br/>"
                  backgroundColor="rgba(39, 106, 245, 0.82)"
                  icon={
                    <UserOutlined
                      style={{ fontSize: "20px", color: "#FFFFFF" }}
                    />
                  }
                />
              </div>
            )}
          </div>
        )}
        {onlyWidth < 1200 && (
          <div
            className="display-flex-center"
            style={{
              height: "60px",
              gap: "10px",
              // justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                color: "#FFFFFF",
                fontFamily: "cursive",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              SHOPPING FUN
            </div>
            <div style={{ width: "700px" }}>
              <Input
                size="large"
                placeholder="Bạn cần tìm gì ?"
                prefix={<SearchOutlined />}
                value={text}
                onChange={(e) => handleChangeText(e)}
                onPressEnter={(e) => submitText(e)}
              />
            </div>
            <div className="display-flex-center">
              {user ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}
                  >
                    <div
                      style={{
                        padding: "1px",
                        borderRadius: "4px",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Avatar
                        style={{ backgroundColor: "rgba(39, 106, 245, 0.82)" }}
                        size={32}
                      >
                        {user?.name?.charAt(0).toUpperCase()}
                      </Avatar>{" "}
                      {user.name.slice(0, 10)}...
                    </div>
                  </Dropdown>
                </>
              ) : (
                <div
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  <HeaderSelection
                    padding="9px 9px"
                    title="Đăng nhập<br/>"
                    backgroundColor="rgba(39, 106, 245, 0.82)"
                    icon={
                      <UserOutlined
                        style={{ fontSize: "20px", color: "#FFFFFF" }}
                      />
                    }
                  />
                </div>
              )}
              <div style={{ marginLeft: "12px" }}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <div onClick={(e) => e.preventDefault()}>
                    <UnorderedListOutlined
                      style={{ color: "white", fontSize: "28px" }}
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        )}
      </ContainerPage>
      <Modal
        title="Shopping Fun"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <div>
          Để có trải nghiệm mua sắm tốt hơn, vui lòng đăng nhập
          <div
            className="display-flex-center"
            style={{ gap: "12px", marginTop: "12px" }}
          >
            <ButtonCore
              text="Đăng nhập"
              onClick={() => {
                navigate("/login");
                setIsModalOpen(false);
              }}
            />
            <ButtonCore
              text="Đăng kí"
              isGhost={true}
              onClick={() => {
                navigate("/register");
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
