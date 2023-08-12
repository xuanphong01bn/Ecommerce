import React from "react";
import ContainerPage from "../core/ContainerPage";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, Divider, message } from "antd";
import TableCart from "./Cart/TableCart";
import ButtonCore from "../core/ButtonCore";
import { useNavigate } from "react-router-dom";
import { userCart } from "../functions/user";
const Cart = () => {
  const { user, cart } = useSelector((state) => state);
  const navigate = useNavigate();
  const handleSaveCart = () => {
    alert("save cart");
    userCart(cart)
      .then((res) => navigate("/checkout"))
      .catch(() => message.error("Lỗi lưu cart"));
    // navigate("/checkout");
  };
  return (
    <ContainerPage>
      <Card>
        <Row>
          <Col span={16}>
            <div>
              <h2>Card</h2>
            </div>
            <div>
              <h4>{cart.length} Products</h4>
            </div>
            <TableCart />
          </Col>
          <Col span={8} style={{ marginTop: "77px", paddingLeft: "30px" }}>
            <div>
              <h4>Order Summary</h4>
            </div>
            <Divider />
            <div>
              <h5>Products</h5>
            </div>
            <Divider />
            <div>
              {cart?.map((item) => (
                <div key={item?.title}>
                  {item?.title} x {item?.count} = {item?.price * item?.count}
                </div>
              ))}
            </div>
            <Divider />
            <div>
              <h5>
                Total :{" "}
                {cart
                  ?.map((item) => item?.price * item?.count)
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )}
              </h5>
            </div>
            <Divider />
            <div>
              {user ? (
                <ButtonCore text="Checkout" onClick={() => handleSaveCart()} />
              ) : (
                <ButtonCore
                  text="Login to Checkout"
                  onClick={() =>
                    navigate("/login", { state: { toCheckout: true } })
                  }
                />
              )}
            </div>
            <div style={{ color: "green", marginTop: "20px" }}>
              <h6>Cash on Delivery</h6>
            </div>
          </Col>
        </Row>
      </Card>
    </ContainerPage>
  );
};

export default Cart;
