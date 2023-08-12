import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import { gallery } from "../../../../shared/AppConst/ThumnailGalery";
import styles from "./styles.module.scss";

// import required modules
import SwiperCore, { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";
const IntroHomeSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // SwiperCore.use([Autoplay]);
  return (
    <div className={styles.sliderHome}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {gallery.map((item) => (
          <SwiperSlide>
            <img src={item.image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
      >
        {gallery.map((item) => (
          <SwiperSlide>
            <div className={styles.footerSlider}>
              <div style={{ marginTop: "10%" }}>
                <div>{item.title}</div>
                <div>{item.subTitle}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IntroHomeSlider;
