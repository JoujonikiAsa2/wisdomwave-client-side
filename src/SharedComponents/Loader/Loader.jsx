import Lottie from 'lottie-react';
import loader from '../loader.json'

const Loader = () => {
    return (
        <div className="pt-20 text-center h-[80vh] flex flex-col gap-8 justify-center items-center">
            <Lottie animationData={loader} style={{ width: "40px" , height:"40px"}}></Lottie>
        </div>
    );
};

export default Loader;