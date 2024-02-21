import Lottie from 'lottie-react';
import './styles.css';


const BannerSlider = ({slider, sliderText,bg,textColor}) => {

    return (
        <div className={`flex flex-col-reverse lg:flex-row md:flex-row justify-center items-center  w-full p-10 ${bg}`}>
            <div className={`text-2xl  font-bold lora lg:w-1/2 ${textColor}`}>
                <h2 className='text-wrap text-center'>{sliderText}</h2>
            </div>
            <div className='lg:w-1/2 flex justify-center items-center'>
                <Lottie animationData={slider} className=' lg:w-[500px] md:w-[400px] w-[300px] lg:h-[320px] h-full pt-10'></Lottie>
            </div>
        </div>
    );
};

export default BannerSlider;