import slider1 from '../../../assets/Photos/LandingPage/slide-3.jpg'
import slider2 from '../../../assets/Photos/LandingPage/slide-2.jpg'
import slider3 from '../../../assets/Photos/LandingPage/slider-2.jpg'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Landing page Banner
const Banner = () => {

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img src={slider1} alt="Slide-1" className='' /></SwiperSlide>
                <SwiperSlide><img src={slider2} alt="Slide-2" className='' /></SwiperSlide>
                <SwiperSlide><img src={slider3} alt="Slide-3" className='' /></SwiperSlide>
            </Swiper>
        </>
    );
}

export default Banner
