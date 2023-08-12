import React, { useState, useEffect, useMemo } from "react";
import ContainerPage from "../core/ContainerPage";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../functions/product";
import { Row, Col } from "antd";
import SingleProduct from "../components/cards/SingleProduct";
import RateAndComments from "../components/ProductDetail/RateAndComments";
import "./ProductDetail.css";
const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { slug } = useParams();
  const [keyProduct, setKeyProduct] = useState(0);
  useEffect(() => {
    if (slug) {
      getProductBySlug(slug).then((res) => setProduct(res?.data?.[0]));
    }
  }, [slug, keyProduct]);
  console.log("prodc :", product);
  const des = product?.description?.split("/");
  console.log("desi :", des);

  return (
    <div>
      <ContainerPage>
        {product && <SingleProduct product={product} />}
      </ContainerPage>
      <ContainerPage>
        <Row>
          <Col span={16}>
            {product && (
              <RateAndComments
                product={product}
                setKeyProduct={setKeyProduct}
              />
            )}
          </Col>
        </Row>
      </ContainerPage>
    </div>
  );
};

export default ProductDetail;
