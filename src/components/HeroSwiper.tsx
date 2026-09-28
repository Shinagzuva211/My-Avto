import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { ReactNode } from "react";

type HeroSwiperProps = {
    leftSide: ReactNode;
    statsPanel: ReactNode;
};

export default function HeroSwiper({ leftSide, statsPanel }: HeroSwiperProps) {
    return (
        <div className="hero-swiper-wrap">
            <Swiper
                className="hero-swiper"
                modules={[Pagination]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={0}
                grabCursor
            >
                <SwiperSlide className="hero-slide">{leftSide}</SwiperSlide>
                <SwiperSlide className="hero-slide">{statsPanel}</SwiperSlide>
            </Swiper>
        </div>
    );
}
