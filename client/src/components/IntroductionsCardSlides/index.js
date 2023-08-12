import React from "react";
import SlideShow from "../swiper";
import { Row } from "antd";
const IntroductionsCardSlides = ({ products, title }) => {
  return (
    <div
      style={
        {
          // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          // borderRadius: "12px",
          // padding: "12px",
        }
      }
    >
      {/* <h2 style={{ marginBottom: "8px" }}>{title}</h2> */}
      <div
        style={{
          marginBottom: "8px",
          color: "white",
          textTransform: "capitalize",
          fontSize: "24px",
          background: "linear-gradient(to right, #3366cc 36%, #33ccff 100%)",
          padding: "8px",
          borderRadius: "10px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          padding: "4px 12px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          // border: "1px solid red",
          // boxShadow:
          //   "10px 0 10px rgba(0, 0, 0, 0.2), -10px 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Row>
          <SlideShow products={products} />
        </Row>
      </div>
    </div>
  );
};

export default IntroductionsCardSlides;
