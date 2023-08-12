import React, { useState } from "react";
import { Row, Col, Progress, Button, Avatar } from "antd";
import styles from "./styles.module.scss";
import { StarFilled } from "@ant-design/icons";
import CommentBox from "./CommentBox";
import ButtonCore from "../../../core/ButtonCore";
import { useSelector } from "react-redux";
import ModalRating from "./ModalRating";
import StarRatings from "react-star-ratings";
const RateAndComments = ({ product, setKeyProduct }) => {
  const { user } = useSelector((state) => state);
  const [isOpenModalRate, setIsOpenModalRate] = useState(false);
  console.log("product rate :", product, product?.ratings.length);
  const totalRate = product?.ratings?.length;
  const aveStar = product?.ratings?.length
    ? (
        product?.ratings
          .map((item) => item?.star)
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          ) / product?.ratings?.length
      ).toFixed(2)
    : 0;
  // const aveStar = 0;
  return (
    <div style={{ padding: "12px" }}>
      <div className={styles.title}>Đánh giá & nhận xét {product?.title}</div>
      <div className={styles.rate}>
        <Row>
          <Col span={8}>
            <div
              style={{
                padding: "12px",
                marginTop: "10%",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {aveStar}/5
              </div>
              <div style={{ textAlign: "center" }}>
                {/* <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <StarFilled style={{ color: "#ffcc00" }} />{" "}
                <StarFilled style={{ color: "#ffcc00" }} /> */}
                <StarRatings
                  rating={+aveStar}
                  starDimension="20px"
                  starSpacing="2px"
                  starRatedColor="#ffcc00"
                />
              </div>
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                {product?.ratings?.length} đánh giá và nhận xét
              </div>
            </div>
          </Col>
          <Col span={16} className={styles.progress}>
            {[1, 2, 3, 4, 5].reverse().map((item) => (
              <div
                key={item}
                className="display-flex-center"
                style={{ gap: "8px" }}
              >
                <div className="display-flex-center" style={{ gap: "3px" }}>
                  {item} <StarFilled style={{ color: "#ffcc00" }} />
                </div>
                <Progress
                  percent={
                    (product?.ratings?.filter((t) => t?.star == item).length /
                      totalRate) *
                    100
                  }
                  size={[300, 20]}
                  showInfo={false}
                  strokeColor="#3366cc"
                />
                <div>
                  {product?.ratings?.filter((t) => t?.star == item).length} đánh
                  giá
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </div>
      <div style={{ textAlign: "center", margin: "8px 0px" }}>
        <div>Bạn đánh giá sản phẩm này</div>
        <div style={{ marginTop: "4px" }}>
          <ButtonCore
            text="Đánh giá ngay"
            onClick={() => setIsOpenModalRate(true)}
          />
        </div>
      </div>
      <div>
        {product?.ratings?.map((item) => (
          <CommentBox
            key={item}
            comment={item?.comment}
            nameRate={item?.name}
            timeComment={item?.timeRating}
            rating={item?.star}
          />
        ))}
      </div>
      <ModalRating
        product={product}
        setIsOpenModalRate={setIsOpenModalRate}
        isOpenModalRate={isOpenModalRate}
        setKeyProduct={setKeyProduct}
      />
    </div>
  );
};

export default RateAndComments;
