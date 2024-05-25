import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import AllCourseCard from './AllCourseCard';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useOutletContext } from "react-router-dom";

const AllCourses = () => {
    const { searchValue } = useOutletContext()
    let searchKey = searchValue
    const { allCourses } = useOutletContext()
    const [courses, setCourses] = useState([])
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [clicked, setClicked] = useState(false)

    console.log(allCourses, searchKey)

    useEffect(() => {
        axiosPublic.get('/api/courses')
            .then(res => {
                // console.log(res.data.data)
                setCourses(res.data.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])



    return (
        <div className='py-28 flex flex-col lg:flex-row gap-4 mx-[5vw]'>
            <div className='grid grid-cols-1 lg:grid-cols-2 justify-center justify-items-center items-center gap-8 w-full'>
                {
                    allCourses.length ==0 ? courses.map(course => <div className='rounded-lg w-full' key={course._id}>
                        <AllCourseCard key={course._id} course={course} btnText="Enroll Now">
                        </AllCourseCard>
                    </div >) : allCourses.map(course => <div className='rounded-lg w-full' key={course._id}>
                        <AllCourseCard key={course._id} course={course} btnText="Enroll Now">
                        </AllCourseCard>
                    </div >)
                }
            </div>
        </div>
    );
};

export default AllCourses;