
import BannerSlider from "./Components/BannerSlider";
import CourseCategory from "./Components/CourseCategory";
import WhyChooseUs from "./Components/WhyChooseUs";
import slider1 from '../LandingPage/Components/educational-animation.json'
import { AllCourses } from "./Components/AllCourses";

// This is a landing page for all users and also student homepage
const LandingPage = () => {

    const bg = "bg-[#C5E898]"
    const textColor = "text-[#0766AD]"

    return (
        <div className="">
            <div className="">
            <BannerSlider slider={slider1} bg={bg} textColor={textColor} sliderText="Welcome to WishdomWave Take the touch of the wave of learning"></BannerSlider>
            </div>
            <div className="mx-[5vw] space-y-4 pt-12">
                <CourseCategory></CourseCategory>
                <AllCourses></AllCourses>
                <WhyChooseUs></WhyChooseUs>
            </div>
        </div>
    );
};

export default LandingPage;