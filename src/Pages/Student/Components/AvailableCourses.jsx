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
        <div>
            {/* all courses i have enrolled */}
            <div className='flex flex-row justify-center items-center gap-12 flex-wrap mx-[5vw] pt-32'>
                {
                    courses.slice(0,1).map(course => <Course key={course._id} course={course} enrolled={enrolled}></Course>)
                }
            </div>

            {/* pagination */}
            <div className='flex flex-row justify-center items-center gap-2 py-10'>
                {/* previous button */}
                <div>
                    <button className='btn dark:bg-transparent border-blue-600 border-2'><FcPrevious></FcPrevious></button>
                </div>
                <div className='flex flex-row justify-center items-center gap-2 py-10'>

                    <button className='btn dark:bg-transparent border-blue-600 border-2'>1</button>
                </div>
                {/* next button */}
                <div>
                    <button className='btn dark:bg-transparent border-blue-600 border-2'><FcNext></FcNext></button>
                </div>
            </div>
        </div>
    );
};

export default AvailableCourses;