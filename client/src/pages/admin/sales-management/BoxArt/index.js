import React from "react";
import { CaretUpOutlined } from "@ant-design/icons";

const BoxArt = ({ title, backColor, text, percent }) => {
  return (
    <div
      style={{
        background: backColor,
        borderRadius: "15px",
        boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
        color: "white",
        display: "inline-block",
        //   alignItems: "center",
        //   justifyContent: "center",
        textAlign: "center",
        padding: "24px 32px",
        marginRight: "14px",
      }}
    >
      <div style={{ fontSize: "24px" }}>{title}</div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "24px" }}>{text}</div>
        {percent > 0 && (
          <div style={{ fontSize: "14px" }}>
            <CaretUpOutlined /> {percent}%
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxArt;
