import React, { useEffect, useState } from "react";
import ContainerPage from "../core/ContainerPage";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../functions/user";
import { message, Row, Col } from "antd";
import StepsCheckout from "./Checkout/StepsCheckout";
const Checkout = () => {
  const { user } = useSelector((state) => state);
  const [fullCart, setFullCart] = useState();
  const dispatch = useDispatch();
  const [key, setKey] = useState();

  useEffect(() => {
    getUserCart()
      .then((res) => {
        setFullCart(res.data);
      })
      .catch(() => message.error("Lỗi"));
  }, [key]);
  console.log("check full cart:", fullCart);
  return (
    <ContainerPage>
      <Row align="middle" justify="center">
        <Col span={16}>
          {fullCart && <StepsCheckout fullCart={fullCart} setKey={setKey} />}
        </Col>
      </Row>
    </ContainerPage>
  );
};

export default Checkout;
