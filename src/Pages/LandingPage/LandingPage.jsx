import CourseCategory from "./Components/CourseCategory";
import WhyChooseUs from "./Components/WhyChooseUs";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { useState } from "react";
import useCourses from "../../hooks/useCourses";
import Banner from "./Components/Banner";
import slider from './Components/Education.json'
import Courses from "./Components/Courses";
import useAuth from "../../hooks/useAuth";

// This is a landing page for all users and also student homepage
const LandingPage = () => {

    const bg = "bg-[#CEE7E1]"
    const { user } = useAuth()
    const { allCourses } = useCourses()
    const [courses, setCourses] = useState(allCourses)
    console.log("Searches", allCourses)

    const handleCategorySearch = (category) => {
        console.log(category)
        axiosPublic.get(`/api/searchedCategory/${category}`)
            .then((res) => {
                console.log("Result:", res.data.data)
                setCourses(res.data.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    
    return (

        <div className="space-y-10">
            <Banner slider={slider} sliderText="Welcome to WisdomWave" subText=" Take the touch of the wave of learning" bg={bg}></Banner>
            <div className=" pb-10 px-8">
                <div className="mx-[5vw]">
                    <Courses courses={courses}></Courses>
                </div>
            </div>
            <div className="mx-[5vw] px-8">
                <CourseCategory handleCategorySearch={handleCategorySearch}></CourseCategory>
            </div>
            <div className=" mb-10 px-8">
                <div className="mx-[5vw]">
                    <WhyChooseUs></WhyChooseUs>
                </div>
            </div>
        </div>

    );
};

export default LandingPage