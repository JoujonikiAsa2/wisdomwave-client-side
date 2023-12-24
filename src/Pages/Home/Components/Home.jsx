import Banner from "./Banner";
import Courses from "./Courses";
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="mx-[5vw]">
                <Courses></Courses>
            </div>
        </div>
    );
};

export default Home;