import React from "react";
import styles from "./styles.module.scss";
import { LaptopOutlined, RightOutlined } from "@ant-design/icons";
import IntroHomeSlider from "./IntroHomeSlider";
import { advertismentBanner } from "../../../shared/AppConst/GeneralConst";
const IntroHome = () => {
  return (
    <div
      style={{
        height: "376px",
        display: "flex",
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          width: "200px",
          margin: "0 5px",
          borderRadius: "12px",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >
        {[
          "Laptop",
          "Điện thoại",
          "Máy tính bảng",
          "Đồng hồ",
          "Âm thanh",
          "Điện thoại",
          "Hàng cũ",
          "Khuyến mại",
          "Phụ kiện",
        ].map((item) => (
          <div
            className={`display-flex-center ${styles.category}`}
            style={{
              fontWeight: "bold",
              gap: "8px",
              padding: "8px",
              position: "relative",
            }}
          >
            <LaptopOutlined style={{ fontSize: "24px" }} />{" "}
            <div style={{ fontSize: "12px", width: "128px" }}>{item}</div>
            <div className="display-flex-center" style={{ right: "0" }}>
              <RightOutlined />
            </div>
          </div>
        ))}
      </div>
      <div style={{ width: "740px" }} className={styles.centerContent}>
        <IntroHomeSlider />
      </div>
      <div style={{ width: "260px" }}>
        {advertismentBanner.map((item) => (
          <div
            key={item}
            style={{
              height: "115px",
              width: "100%",

              borderRadius: "12px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              marginTop: "10px",
              marginLeft: "5px",
            }}
          >
            <img
              src={item}
              height="100%"
              width={"98%"}
              style={{ borderRadius: "12px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroHome;
