import slider1 from './educational-animation.json'
import slider2 from './discussion.json'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import {Pagination, Navigation } from 'swiper/modules';
import BannerSlider from './BannerSlider';

// Landing page Banner
const Banner = () => {

    return (
        <>
            <Swiper
                spaceBetween={300}
                centeredSlides={true}
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,
                // }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <BannerSlider slider={slider1} sliderText="Welcome to WishdomWave Take the touch of the wave of learning"></BannerSlider>
                </SwiperSlide>
                <SwiperSlide>
                    <BannerSlider slider={slider2} sliderText="You can disscuss your Problems with other"></BannerSlider>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default Banner
