import React, { useState, useEffect, useContext } from "react";
import { Input, Space, Checkbox } from "antd";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReceiverContext } from "./StepsCheckout";
import MapSearch from "../../components/MapSearch";
const FormCheckout = ({ setReceiverInfo }) => {
  const { user } = useSelector((state) => state);
  const rec = useContext(ReceiverContext);
  const [address, setAddredd] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSendEmail, setIsSendEmail] = useState();
  useEffect(() => {
    setReceiverInfo({
      name,
      phone,
      address,
      isSendEmail,
    });
  }, [name, phone, address, isSendEmail]);
  return (
    <div className={styles.formCheckout}>
      <Space direction="vertical" align="right">
        <h6>Thông tin đặt hàng</h6>
        <div style={{ textAlign: "left" }}>Người đặt hàng: {user?.name}</div>
        <div style={{ textAlign: "left" }}>Thông tin người nhận: </div>
        <Input
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* <Input value={address} placeholder="Nhập địa chỉ" /> */}
        <MapSearch setAddredd={setAddredd} address={address} />
        <div
          style={{ marginTop: "30px", marginBottom: "15px", textAlign: "left" }}
        >
          <Checkbox onChange={(e) => setIsSendEmail(e.target.checked)}>
            <div style={{ fontSize: "16px" }}>Nhận email hoá đơn</div>
          </Checkbox>
        </div>
      </Space>
    </div>
  );
};

export default FormCheckout;
