import Lottie from 'lottie-react';
import loader from '../loader.json'
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return (
        <div className="pt-20 text-center h-[80vh] flex flex-col gap-8 justify-center items-center">
            <ClipLoader color="#36d7b7" />
        </div>
    );
};

export default Loader;