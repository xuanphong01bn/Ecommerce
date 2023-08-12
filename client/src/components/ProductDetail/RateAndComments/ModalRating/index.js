import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import StarRatings from "react-star-ratings";
import ButtonCore from "../../../../core/ButtonCore";
import { useSelector } from "react-redux";
import { rateStarProduct } from "../../../../functions/product";
import { useNavigate } from "react-router-dom";
const ModalRating = ({
  isOpenModalRate,
  setIsOpenModalRate,
  product,
  setKeyProduct,
}) => {
  const [rating, setRating] = useState();
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  console.log("product :", product, user);
  const handleChangeRating = (e) => {
    console.log("rating :", e);
    setRating(e);
  };
  const [rateComment, setRateComment] = useState("");
  const { TextArea } = Input;
  const handleSaveRate = async () => {
    const rateObject = {
      star: rating,
      comment: rateComment,
    };
    try {
      await rateStarProduct(product?._id, rateObject).then((res) => {
        console.log(res);
        setIsOpenModalRate(false);
        message.success("Đánh giá thành công");
        setKeyProduct((prev) => prev + 1);
      });
    } catch (error) {
      console.log(error);
      message.error("Lỗi!");
    }
  };
  return (
    <Modal
      open={isOpenModalRate}
      footer={
        user?.token
          ? [<ButtonCore text="Hoàn thành" onClick={() => handleSaveRate()} />]
          : []
      }
      onCancel={() => setIsOpenModalRate(false)}
      title={
        <div style={{ fontWeight: "500" }}>
          {user?.token
            ? "Đánh giá và Nhận xét"
            : "Vui lòng đăng nhập để đánh giá"}
        </div>
      }
    >
      {user?.token ? (
        <div>
          <div>
            <StarRatings
              rating={rating}
              starRatedColor="#ffcc00"
              numberOfStars={5}
              changeRating={(e) => handleChangeRating(e)}
              name="rating"
              starHoverColor="#ffcc00"
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <TextArea
              rows={4}
              placeholder="Nhập đánh giá của bạn"
              onChange={(e) => {
                setRateComment(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="display-flex-center"
          style={{ gap: "12px", marginTop: "12px" }}
        >
          <ButtonCore
            text="Đăng nhập"
            onClick={() => {
              navigate("/login");
              setIsOpenModalRate(false);
            }}
          />
          <ButtonCore
            text="Đăng kí"
            isGhost={true}
            onClick={() => {
              navigate("/register");
              setIsOpenModalRate(false);
            }}
          />
        </div>
      )}
    </Modal>
  );
};

export default ModalRating;
