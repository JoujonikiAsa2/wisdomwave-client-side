import React, { useEffect, useState } from 'react';
import useCourses from '../../hooks/useCourses';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import CourseCard from '../InstructorDashboard/CourseCard';
import { Link } from 'react-router-dom';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import CourseCardAdmin from './CourseCardAdmin';

const ManageCourses = () => {
    const { allCourses, isLoading, refetch } = useCourses()
    const [courses, setCourses] = useState([])

    useEffect(()=>{
        setCourses(allCourses)
    },[allCourses])
    const axiosPublic = useAxiosPublic()

    const localHandleSearch = (e) => {
        e.preventDefault()
        const form = e.target
        const searchString = e.target.search.value
        console.log("String", searchString)

        axiosPublic.get(`/api/courses/email/query/${searchString}`)
            .then(res => {
                console.log(res.data.data)
                setCourses(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
        <Toaster position='top-center'></Toaster>
            <DashboardTitle title="Manage Courses" subTitle="Here is the manage courses dashboard" />
            <div className="w-full flex justify-center items-center pb-8">
                <form action="" onSubmit={(e) => localHandleSearch(e)} className='lg:w-[40%] md:w-[50%] w-[60%] flex justify-center items-center mr-2'>
                    <div className="join w-full ">
                        <input type="email" name="search" className="input input-bordered join-item w-full input-sm bg-[#F3F3F3] focus:outline-none placeholder:text-[#cac9c9] focus:placeholder:text-[#949292] text-black" placeholder="Search Course by email" />
                        <button type="submit" className=" py-[0.2rem] px-2 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] border-2 border-none text-white text-thin rounded-none rounded-r-lg text-sm">Search</button>
                    </div>
                </form>
                <button onClick={() => setCourses(allCourses)} className='btn btn-sm bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] capitalize text-white'>All</button>
            </div>
            {courses.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8 justify-center items-center justify-items-center'>
                {
                    courses?.map(course => <div className='lg:w-[35vw] md:w-[40vw] w-[75vw] '>
                        <CourseCardAdmin key={course._id} course={course} ></CourseCardAdmin>
                   </div>)
                }
            </div> : <div className='flex justify-center items-center h-full'>
                <p className='text-xl'>No courses found for the given email</p>
            </div>}
        </>
    );
};

export default ManageCourses;