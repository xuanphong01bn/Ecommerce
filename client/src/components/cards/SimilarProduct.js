import React, { useEffect, useState } from "react";
import { Row } from "antd";
import SlideShow from "../swiper";
import { getSimilarProducts } from "../../functions/product";
const SimilarProduct = ({ product }) => {
  console.log("simi pro :", product, product?.subs?.[0]?._id);
  const [simiProd, setSimiProd] = useState();
  useEffect(() => {
    getSimilarProducts(product?.subs?.[0]?._id).then((res) => {
      setSimiProd(res?.data);
      console.log("simi pr:", res?.data);
    });
  }, []);
  return (
    <div style={{ margin: "16px 0" }}>
      <div
        style={{
          fontSize: "18px",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
      >
        Sản phẩm tương tự
      </div>
      <div>
        <Row>
          <SlideShow products={simiProd} />
        </Row>
      </div>
    </div>
  );
};

export default SimilarProduct;
