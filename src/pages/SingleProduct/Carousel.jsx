import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Controller } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export function Carousel({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
        }}
        className="mb-3 h-80 md:mb-10 md:h-[35rem]"
        navigation={true}
        modules={[Navigation, Thumbs, Controller]}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          autoScrollOffset: 1,
        }}
      >
        {images.map((i, index) => {
          return i.width > 300 ? (
            <SwiperSlide key={index}>
              <img src={i.href} className="h-full w-full mx-auto object-contain" />
            </SwiperSlide>
          ) : null;
        })}
      </Swiper>

      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
      >
        {images.map((i, index) => {
          return i.width > 300 ? (
            <SwiperSlide
              className="border border-slate-200 p-3 rounded-md hover:opacity-50 transition-opacity duration-100 ease-in cursor-pointer"
              key={index}
            >
              <img src={i.href} className="h-10 md:h-24 object-contain mx-auto" />
            </SwiperSlide>
          ) : null;
        })}
      </Swiper>
    </>
  );
}
