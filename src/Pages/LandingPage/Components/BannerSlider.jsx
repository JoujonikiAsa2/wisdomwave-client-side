import Lottie from 'lottie-react';
import './styles.css';


const BannerSlider = ({slider, sliderText}) => {

    return (
        <div className='flex flex-col-reverse lg:flex-row md:flex-row justify-center items-center bg-[#C5E898]  w-full p-20'>
            <div className='text-2xl text-[#0766AD] font-bold lora lg:w-1/2'>
                <h2 className='text-wrap text-center'>{sliderText}</h2>
            </div>
            <div className='lg:w-1/2 flex justify-center items-center'>
                <Lottie animationData={slider} className=' lg:max-w-[500px] lg:h-[350px] h-full'></Lottie>
            </div>
        </div>
    );
};

export default BannerSlider;