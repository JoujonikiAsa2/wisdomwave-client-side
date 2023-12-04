import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slider1 from '../../../assets/Photos/slider-2.jpg'
import slider2 from '../../../assets/Photos/slide-2.jpg'
import slider3 from '../../../assets/Photos/slide-3.jpg'

const Banner = () => {
    return (
        <div>
            <Carousel showArrows={true} onChange={onchange}>
                <div className="h-[100vh] w-full hero">
                    <img src={slider2} />
                </div>
                <div className="h-[100vh] w-full">
                    <img src={slider1} />
                </div>
                <div className="h-[100vh] w-full">
                    <img src={slider3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;