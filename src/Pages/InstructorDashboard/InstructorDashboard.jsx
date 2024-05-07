import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseCard from './CourseCard';

const InstructorDashboard = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const [courses, setCourses] = useState()
    useEffect(() => {
        axiosPublic.get(`/api/courses/email/${user?.email}`)
        .then(res =>{
            console.log(res.data.data)
            setCourses(res.data.data)
        })
        .catch(error=>{
            console.log(error)
        })
    })
    return (
        <div className='w-[90vw] flex flex-col'>
            <div className='w-64'>
                <DashboardTitle title="Courses"></DashboardTitle>
            </div>
            <div>
                {
                    courses ? courses.map(course =><CourseCard key={course._id} course={course}></CourseCard>) : null
                }
            </div>
        </div>
    );
};

export default InstructorDashboard;