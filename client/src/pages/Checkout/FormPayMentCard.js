import React, { useState } from "react";
import { Image, Modal } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutElements from "./StripeCheckoutElements";
import "./stripe.css";
const linkImage = [
  "https://cdn.icon-icons.com/icons2/2389/PNG/512/stripe_logo_icon_145416.png",
  "https://static.vecteezy.com/system/resources/previews/009/469/637/original/paypal-payment-icon-editorial-logo-free-vector.jpg",
  "https://daygiare.com/public/storage/thumb/2019/10/03/tong-hop-hong-tin-khuyen-mai-ma-giam-gia-voucher-uu-dai-lon-vnpay-qr.png",
  "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png",
];

const promise = loadStripe(
  "pk_test_51NF4ugGuwedm0TQJCq3PjfCf9u3hj1YdtuHq37iSbel9QiCFZU04U9devEKMSrrrzVYHS26esL0rIb5GuU0h0M1z00OQyH7CKh"
);
const FormPayMentCard = ({ fullCart }) => {
  const [openStripe, setOpenStripe] = useState(false);
  const handleOk = () => {
    setTimeout(() => {
      setOpenStripe(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpenStripe(false);
  };
  return (
    <div style={{ height: "260px", padding: "20px" }}>
      <h5>Chọn hình thức thanh toán</h5>
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "60px",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        {/* {linkImage?.map((item) => (
          <div style={{ height: "60px", width: "60px" }} onClick={}>
            
          </div>
        ))} */}
        <Image
          height="60px"
          width={"60px"}
          src={
            "https://cdn.icon-icons.com/icons2/2389/PNG/512/stripe_logo_icon_145416.png"
          }
          preview={false}
          onClick={() => setOpenStripe(true)}
        />
        <Modal
          open={openStripe}
          title={<h5>Thanh toán bằng Stripe</h5>}
          onOk={handleOk}
          onCancel={handleCancel}
          // footer={[]}
        >
          <h5 style={{ textAlign: "center" }}>
            Số tiền:{" "}
            {fullCart?.totalAfterDiscount > 0
              ? fullCart?.totalAfterDiscount
              : fullCart?.cartTotal}
          </h5>
          <Elements stripe={promise}>
            <StripeCheckoutElements />
          </Elements>
        </Modal>
      </div>
    </div>
  );
};

export default FormPayMentCard;
