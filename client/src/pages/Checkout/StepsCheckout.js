import { Button, message, Steps, theme, Input, Divider } from "antd";
import { useState, createContext } from "react";
import ButtonCore from "../../core/ButtonCore";
import FormCheckout from "./FormCheckout";
import FormPayMentCard from "./FormPayMentCard";
import { useNavigate } from "react-router-dom";
import { applyCouponApi } from "../../functions/coupon";

export const ReceiverContext = createContext();
const StepsCheckout = ({ fullCart, setKey }) => {
  const [coupon, setCoupon] = useState();
  const [receiverInfo, setReceiverInfo] = useState();

  const navigate = useNavigate();
  const applyCoupon = () => {
    alert("apply coupon");
    applyCouponApi(coupon)
      .then(() => setKey((prev) => prev + 1))
      .catch((err) => message.error(err));
  };
  const steps = [
    {
      title: "Chọn sản phẩm",
      content: (
        <div style={{ lineHeight: "260px" }}>
          <ButtonCore text="Xem giỏ hàng" onClick={() => navigate("/cart")} />
        </div>
      ),
    },
    {
      title: "Thông tin",
      content: <FormCheckout setReceiverInfo={setReceiverInfo} />,
    },
    {
      title: "Mã giảm giá",
      content: (
        <div style={{ height: "260px" }}>
          <div
            style={{
              width: "50%",
              height: "30px",
              display: "flex",
              margin: "12px auto",
            }}
          >
            <Input
              placeholder="Nhập mã giảm giá"
              onChange={(e) => setCoupon(e.target.value)}
            />
            <ButtonCore text="Áp dụng" onClick={() => applyCoupon()} />
          </div>
          <Divider />
          <div
            style={{
              textDecoration: fullCart?.totalAfterDiscount
                ? "line-through"
                : "",
            }}
          >
            <h5>Tổng tiền: {fullCart?.cartTotal}$</h5>
          </div>
          <Divider />
          {fullCart?.totalAfterDiscount ? (
            <div>
              <h5>Giá mới : {fullCart?.totalAfterDiscount}$</h5>
            </div>
          ) : (
            ""
          )}
          <div></div>
        </div>
      ),
    },
    {
      title: "Thanh toán",
      content: <FormPayMentCard fullCart={fullCart} />,
    },
    {
      title: "Hoàn tất",
      content: (
        <div style={{ height: "260px", padding: "30px" }}>
          <div>
            <h4>Cảm ơn quý khách đã đặt hàng</h4>
            <div style={{ marginTop: "30px" }}>
              <ButtonCore
                text="Tiếp tục mua sắm"
                onClick={() => navigate("/shop")}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    // lineHeight: "260px",
    textAlign: "center",
    // color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <ReceiverContext.Provider value={{ receiverInfo: receiverInfo }}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </ReceiverContext.Provider>
  );
};
export default StepsCheckout;
