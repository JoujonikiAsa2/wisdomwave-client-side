import { Outlet } from "react-router-dom";
import Footer from "../SharedComponents/Footer/Footer";
import Header from "../SharedComponents/Header/Header";

// Home layout for Student
const Root = () => {

    return (
        <div className=" max-w-screen-2xl mx-auto">
            <Header></Header>
            <div className="w-full min-h-screen dark:bg-white">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;