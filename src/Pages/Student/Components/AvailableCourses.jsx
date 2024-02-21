import React from 'react';
import useCourses from '../../../hooks/useCourses';
import Course from '../../LandingPage/Components/Course';
import { FcNext, FcPrevious } from 'react-icons/fc';
import Loader from '../../../SharedComponents/Loader/Loader';


const AvailableCourses = () => {
    const { courses, isLoading, isError } = useCourses()
    let enrolled = true

    if (isLoading) {
        return <Loader></Loader>; //if loading
    }

    if (isError) {
        return <div className="my-20 text-center min-h-[80vh] flex justify-center items-center">Error loading blogs</div>;
    }
    console.log(courses)
    return (
        <div className='pb-10 bg-[#F3F3F3]  min-h-screen'>
            {/* all courses i have enrolled */}
            <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 justify-center items-center gap-2 flex-wrap mx-[5vw] pt-32'>
                {
                    courses.slice(0,5).map(course => <Course key={course._id} course={course} enrolled={enrolled}></Course>)
                }
            </div>
        </div>
    );
};

export default AvailableCourses;