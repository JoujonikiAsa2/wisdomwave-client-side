import Banner from "./Banner";
import CourseCategory from "./CourseCategory";
import Courses from "./Courses";

// Student
const StudentHome = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="mx-[5vw] space-y-12">
                <Courses></Courses>
                <CourseCategory></CourseCategory>
            </div>
        </div>
    );
};

export default StudentHome;