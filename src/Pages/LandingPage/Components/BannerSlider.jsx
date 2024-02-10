import Lottie from 'lottie-react';
import './styles.css';


const BannerSlider = ({slider, sliderText}) => {

    const lottieStyle = {
        width: '100%',
        height: '50%'
    }
    return (
        <div className='flex flex-col lg:flex-row md:flex-row justify-center items-center gap-2 relative h-[450px] bg-[#C5E898]  w-full'>
            <div className='text-2xl text-[#0766AD] font-bold z-50 lora p-10'>
                <h2 className='text-wrap text-center'>{sliderText}</h2>
            </div>
            <div className='w-full p-10'>
                <Lottie animationData={slider} style={lottieStyle}></Lottie>
            </div>
        </div>
    );
};

export default BannerSlider;