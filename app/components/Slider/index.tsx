import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";

export interface ISliderProps {
  imageUrls: string[];
}

const Slider = ({ imageUrls }: ISliderProps) => {
  return (
    <Swiper
      slidesPerView={7}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={5}
      centeredSlides
      centeredSlidesBounds
      centerInsufficientSlides
      slideToClickedSlide
      modules={[Navigation]}
    >
      {imageUrls.map((url, index) => (
        <SwiperSlide>
          <div className="slider_image-container">
            <img
              className="slider_image"
              src={url}
              alt={`Image slide ${index}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
