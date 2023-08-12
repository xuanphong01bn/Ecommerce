import React from "react";
import { Card, Skeleton } from "antd";
import SampleLap from "../../assets/images/sampleLap2.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import StarRatings from "react-star-ratings";
import { formatNumberWithCommas } from "../../shared/util/formatCommas";
const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { description, images, title, slug, price, ratings } = product;
  console.log("prd rate :", product);
  const star = ratings
    .map((item) => item?.star)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  var starAve;
  if (star > 0) {
    starAve = (star / ratings.length).toFixed(2);
  }
  const navigate = useNavigate();
  return (
    <div>
      <Card
        bordered={true}
        hoverable
        style={{
          width: 240,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
        cover={
          <div
            style={{ padding: "15px" }}
            onClick={() => navigate(`/product/${slug}`)}
          >
            <img
              alt={description}
              src={(images && images?.length && images[0]?.url) || SampleLap}
              style={{
                height: "150px",
                objectFit: "cover",
              }}
            />
          </div>
        }
        actions={[
          <div
            style={{ cursor: "pointer", fontWeight: "400" }}
            onClick={() => {
              navigate(`/product/${slug}`);
            }}
          >
            <EyeOutlined />
            <div>View Product</div>
          </div>,
          <div style={{ cursor: "pointer", fontWeight: "400" }}>
            <ShoppingCartOutlined onClick={() => alert("add")} />
            <div>Add To Cart</div>
          </div>,
        ]}
      >
        <div style={{ textAlign: "left", padding: "12px" }}>
          <div
            style={{
              fontWeight: "500",
              textTransform: "capitalize",
              marginBottom: "12px",
              height: "66px",
            }}
            className="text-title"
          >
            {title}
          </div>
          <div
            style={{
              fontWeight: "700px",
              fontSize: "18px",
              color: "#d70018",
              marginBottom: "8px",
            }}
          >
            {formatNumberWithCommas(price)}đ
          </div>
          <div>
            {starAve ? (
              <StarRatings
                rating={star > 0 ? +starAve : +star}
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#ffcc00"
              />
            ) : (
              <div
                style={{
                  fontWeight: "500",
                  textTransform: "capitalize",
                  // color: "#3366cc",
                }}
              >
                Chưa có đánh giá
              </div>
            )}
          </div>
        </div>
        {/* <Meta
          title={title}
          description={description.substring(0, 40) + "..."}
          style={{ textAlign: "left" }}
        /> */}
      </Card>
    </div>
  );
};

export default ProductCard;
