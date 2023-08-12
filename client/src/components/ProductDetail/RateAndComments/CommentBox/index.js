import React from "react";
import { Avatar } from "antd";
import styles from "./styles.module.scss";
import { StarFilled } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
const CommentBox = ({ rating, nameRate, timeComment, comment }) => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "16px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        margin: "8px 0px",
      }}
    >
      <div
        className="display-flex-center"
        style={{ justifyContent: "space-between" }}
      >
        <div className="display-flex-center" style={{ gap: "8px" }}>
          <Avatar style={{ backgroundColor: "rgb(221,221,221)" }}>N</Avatar>
          <div style={{ fontWeight: "bold" }}>{nameRate}</div>
        </div>
        <div style={{ fontWeight: "500" }}>{timeComment}</div>
      </div>
      <div
        style={{
          padding: "18px 40px",
        }}
      >
        <div className="display-flex-center" style={{ gap: "4px" }}>
          Đánh giá:{" "}
          <div style={{ marginBottom: "5px" }}>
            <StarRatings
              rating={rating}
              starDimension="20px"
              starSpacing="2px"
              starRatedColor="#ffcc00"
            />
          </div>
        </div>
        <div className="display-flex-center" style={{ gap: "4px" }}>
          <div style={{ fontWeight: "500" }}>Nhận xét: </div> {comment}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
