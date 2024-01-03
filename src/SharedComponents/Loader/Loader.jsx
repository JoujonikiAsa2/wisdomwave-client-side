import Lottie from 'lottie-react';
import loader from '../loader.json'

const Loader = () => {
    return (
        <div className="my-20 text-center min-h-[80vh] flex justify-center items-center"><Lottie animationData={loader} style={{ width: "50px" }}></Lottie></div>
    );
};

export default Loader;