
import BannerSlider from "./Components/BannerSlider";
import CourseCategory from "./Components/CourseCategory";
import WhyChooseUs from "./Components/WhyChooseUs";
import slider1 from '../LandingPage/Components/educational-animation.json'
import { AllCourses } from "./Components/AllCourses";
import Container from "../../SharedComponents/Container/Container";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useCourses from "../../hooks/useCourses";

// This is a landing page for all users and also student homepage
const LandingPage = () => {

    const { allCourses } = useCourses()
    const bg = "bg-[#C5E898]"
    const textColor = "text-[#0766AD]"
    const [courses, setCourses] = useState(allCourses)

    const handleCategorySearch = (category)=>{
        console.log(category)
        axiosPublic.get(`/api/searchedCategory/${category}`)
        .then((res)=>{
            console.log("Result:", res.data.data)
            setCourses(res.data.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    return (
        <div className="space-y-10 bg-[#F3F3F3]">
            <BannerSlider slider={slider1} bg={bg} textColor={textColor} sliderText="Welcome to WishdomWave Take the touch of the wave of learning"></BannerSlider>
            <Container>
                <CourseCategory handleCategorySearch={handleCategorySearch}></CourseCategory>
                <AllCourses courses={courses}></AllCourses>
                <WhyChooseUs></WhyChooseUs>
            </Container>
        </div>
    );
};

export default LandingPage;