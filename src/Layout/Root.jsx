import { Outlet } from "react-router-dom";
import Footer from "../SharedComponents/Footer/Footer";
import Header from "../SharedComponents/Header/Header";

const Root = () => {

    return (
        <div className=" max-w-screen-2xl mx-auto">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;