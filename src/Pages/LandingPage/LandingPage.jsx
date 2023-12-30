import Banner from "./Components/Banner";
import CourseCategory from "./Components/CourseCategory";
import Courses from "./Components/Courses";
import WhyChooseUs from "./Components/WhyChooseUs";

// This is a landing page for all users and also student homepage
const LandingPage = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="mx-[5vw] space-y-12">
                <Courses></Courses>
                <CourseCategory></CourseCategory>
                <WhyChooseUs></WhyChooseUs>
            </div>
        </div>
    );
};

export default LandingPage;