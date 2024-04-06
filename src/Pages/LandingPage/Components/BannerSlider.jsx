import Lottie from 'lottie-react';
import './styles.css';


const BannerSlider = ({ slider }) => {

    return (
        <div className='pt-20'>
            <div className={`flex justify-center items-center bg-red-400 w-[350px] h-[350px] object-fill`}>
                <Lottie animationData={slider} className=''></Lottie>
            </div>
        </div>
    );
};

export default BannerSlider;