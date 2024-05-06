import Lottie from 'lottie-react';

// Landing page Banner
const Banner = ({ slider, sliderText, subText }) => {
    return (
        <div className="h-[450px] md:wh-[70vh] lg:h-[70vh] w-full lg:pt-20 pt-28 flex lg:flex-row md:flex-row flex-col-reverse justify-center items-center bg-[#CEE7E1] lg:gap-20 md:gap-20 pb-10">
            <div className='max-w-[380px] text-center '>
                <h2 className="text-2xl lg:text-3xl font-bold text-[#0766AD]">{sliderText}</h2>
                <p className='p-4 text-gray-500'>{subText}</p>
            </div>
            <div>
                <Lottie animationData={slider} className='lg:h-[300px] md:h-[300px] h-[260px]'></Lottie>
            </div>

        </div>
    );
}

export default Banner
