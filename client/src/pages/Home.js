import React, { useState, useEffect } from "react";
import { message, Button, Row, Col } from "antd";
import { getProductsByCount, getProductRatingsDes } from "../functions/product";
import { useQuery } from "react-query";
import ProductCard from "../components/cards/ProductCard";
import ContainerPage from "../core/ContainerPage";
import IntroductionsCardSlides from "../components/IntroductionsCardSlides";
import SlideShow from "../components/swiper";
import IntroHome from "./HomePage/IntroHome";
import IntroHomeSlider from "./HomePage/IntroHome/IntroHomeSlider";
import MapSearch from "../components/MapSearch";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsRatings, setProductsRatings] = useState([]);
  const { data, isLoading } = useQuery(
    "products",
    // () => axios.get("https://reqres.in/api/users?page=2"),
    () =>
      getProductsByCount(6).then((res) => {
        setProducts(res?.data);
      }),
    {
      onSuccess: () => {
        console.log("Data loaded successfully:");
      },
    }
  );
  const res = useQuery(
    "products/ratings-sort",
    // () => axios.get("https://reqres.in/api/users?page=2"),
    () =>
      getProductRatingsDes().then((res) => {
        setProductsRatings(res?.data);
      }),
    {
      onSuccess: () => {
        console.log("Data loaded successfully:");
      },
    }
  );
  console.log("product home :", products);
  console.log("Ratings Product :", productsRatings);
  return (
    <ContainerPage>
      <IntroHome />
      <div style={{ marginBottom: "16px", marginTop: "16px" }}>
        <IntroductionsCardSlides
          products={products}
          title="Máy tính mới nhất"
        />
      </div>
      {/* <div style={{ marginBottom: "16px" }}>
        <IntroductionsCardSlides
          products={productsRatings}
          title="Máy tính nổi bật"
        />
      </div> */}
      <div style={{ marginBottom: "16px" }}>
        <IntroductionsCardSlides products={products} title="Máy tính nổi bật" />
      </div>
    </ContainerPage>
  );
};

export default Home;
