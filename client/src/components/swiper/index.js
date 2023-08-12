import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size";
import "./styles.css";
import ProductCard from "../cards/ProductCard";
// import required modules
import { FreeMode, Pagination, Navigation } from "swiper";

export default function SlideShow({ products }) {
  const onlyWidth = useWindowWidth();
  const [slide, setSlide] = useState(5);
  useEffect(() => {
    if (onlyWidth < 1200) {
      setSlide(4);
    }
    if (onlyWidth < 980) {
      setSlide(3);
    }
    if (onlyWidth < 714) {
      setSlide(2);
    }
    if (onlyWidth < 490) {
      setSlide(1);
    }
    if (onlyWidth >= 1200) setSlide(5);
  }, [onlyWidth]);
  return (
    <>
      {products?.length && (
        <Swiper
          slidesPerView={5}
          spaceBetween={onlyWidth >= 1200 ? 120 : 30}
          freeMode={false}
          loop={false}
          navigation={true}
          modules={[FreeMode, Pagination, Navigation]}
          className="mySwiper"
        >
          {products?.map((product) => (
            <div>
              <SwiperSlide>
                <ProductCard product={product} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      )}
    </>
  );
}
