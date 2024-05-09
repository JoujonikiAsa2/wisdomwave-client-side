import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseCard from './CourseCard';

const InstructorDashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [courses, setCourses] = useState()
    useEffect(() => {
        axiosPublic.get(`/api/courses/email/${user?.email}`)
            .then(res => {
                console.log(res.data.data)
                setCourses(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    })
    return (
        <div className='w-[90vw] flex flex-col'>
            <div className='pr-4'>
                <DashboardTitle title="Instructions" subTitle="You can add courses by followinhg the Instructions"></DashboardTitle>
            </div>
            <div>
                <h3 className='text-base font-bold'>Create Course</h3>
                <ol className='list-decimal pl-10'>
                    <li>Click on "Create Course" button</li>
                    <li>Fill up the form</li>
                    <li>Click on "Publish Your Course" button</li>
                </ol>
            </div>
            <div className='w-64 pt-10'>
                <DashboardTitle title="Courses" subTitle={`There are total ${courses?.length} courses.`}></DashboardTitle>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center justify-items-center'>
                {
                    courses ? courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>) : null
                }
            </div>
        </div>
    );
};

export default InstructorDashboard;