import logo from "./logo.svg";
import jwtdecode from "jwt-decode";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import "antd/dist/reset.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoutes from "./components/routes/UserRoutes";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoutes from "./components/routes/AdminRoute";
import { useNavigate } from "react-router-dom";
import CreateCategory from "./pages/admin/category/CreateCategory";
import SubCreate from "./pages/admin/sub/SubCreate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/footer";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Coupon from "./pages/admin/coupon";
import SalesManagement from "./pages/admin/sales-management";
import { fetchToken, onMessageListener } from "./firebase";
import { openNotification } from "./shared/util/notification";
import SupportChat from "./components/SupportChat";
import Chat from "./pages/admin/chat";
const queryClient = new QueryClient();
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  console.log("Check user ne hehe:", user);

  //
  const navigate = useNavigate();
  const [isTokenFound, setTokenFound] = useState(false);
  const [key, setKey] = useState(0);
  // socket.emit("join_room", room);
  fetchToken(setTokenFound); // check registration token
  useEffect(() => {
    if (isTokenFound) return;
  }, [isTokenFound]);
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        console.log(key);
        setKey((prev) => prev + 1);
        openNotification(
          payload?.notification?.title,
          payload?.notification?.body
        );
        console.log("payload message :", payload);
      })
      .catch((err) => console.log("failed: ", err));
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        {/* <div style={{ position: "fixed", top: "130px", height: "80%" }}>
          <img
            src={
              "https://anphat.com.vn/media/banner/06_May9adccc090d9029966259f2187d8446ad.png"
            }
            height="70%"
          />
        </div>
        <div
          style={{
            position: "fixed",
            top: "130px",
            right: "0px",
            height: "80%",
          }}
        >
          <img
            src={
              "https://anphat.com.vn/media/banner/06_May9adccc090d9029966259f2187d8446ad.png"
            }
            height="70%"
          />
        </div> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:slug" element={<ProductDetail />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            path="/register/complete"
            element={<RegisterComplete></RegisterComplete>}
          />
          <Route exact path="/forgot/password" element={<ForgotPassword />} />
          {/* <UserRoutes exact path="/user/history" element={<History />} /> */}
          <Route exact path="/user/history" element={<UserRoutes />}>
            <Route exact path="/user/history" element={<History />} />
          </Route>
          <Route exact path="/user/password" element={<UserRoutes />}>
            <Route exact path="/user/password" element={<Password />} />
          </Route>
          <Route exact path="/user/wishlist" element={<UserRoutes />}>
            <Route exact path="/user/wishlist" element={<Wishlist />} />
          </Route>
          <Route exact path="/admin/dashboard" element={<AdminRoutes />}>
            <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route exact path="/admin/category" element={<AdminRoutes />}>
            <Route exact path="/admin/category" element={<CreateCategory />} />
          </Route>
          <Route exact path="/admin/sub" element={<AdminRoutes />}>
            <Route exact path="/admin/sub" element={<SubCreate />} />
          </Route>
          <Route exact path="/admin/product" element={<AdminRoutes />}>
            <Route exact path="/admin/product" element={<ProductCreate />} />
          </Route>
          <Route exact path="/admin/products" element={<AdminRoutes />}>
            <Route exact path="/admin/products" element={<AllProducts />} />
          </Route>
          <Route exact path="/admin/coupon" element={<AdminRoutes />}>
            <Route exact path="/admin/coupon" element={<Coupon />} />
          </Route>
          <Route
            exact
            path="/admin/product/update/:slug"
            element={<AdminRoutes />}
          >
            <Route
              exact
              path="/admin/product/update/:slug"
              element={<ProductUpdate />}
            />
          </Route>
          <Route exact path="/shop" element={<Shop />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/checkout" element={<UserRoutes />}>
            <Route exact path="/checkout" element={<Checkout />} />
          </Route>
          <Route exact path="/admin/sales-management" element={<AdminRoutes />}>
            <Route
              exact
              path="/admin/sales-management"
              element={<SalesManagement />}
            />
          </Route>
          <Route exact path="/admin/support-chat" element={<AdminRoutes />}>
            <Route exact path="/admin/support-chat" element={<Chat />} />
          </Route>
        </Routes>
        <Footer />
        <div>
          <SupportChat />
        </div>

        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
