import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseCard from './CourseCard';
import { useQuery } from '@tanstack/react-query';
import Card from '../../SharedComponents/Card/Card';

const InstructorDashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [courses, setCourses] = useState([])
    const [earning, setEarning] = useState([])

    useEffect(() => {
        axiosPublic.get(`/api/courses/email/${user?.email}`)
            .then(res => {
                console.log("Instructor's courses", res.data.data)
                setCourses(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email])

    const { data: students = [], refetch } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/enrolledStudents/instructor/${user?.email}`)
            return res.data.data
        }
    })


    useEffect(() => {
        axiosPublic.get(`/api/totalEarningByInstructor/${user?.email}`)
            .then(res => {
                console.log(res.data[0].eightyTotal)
                setEarning(res.data[0].eightyTotal)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email])

    const totalEarning = earning/1000


    console.log("Instructorer courses", courses)
    return (
        <div className='w-[90vw] flex flex-col'>

            <div className='pr-4'>
                <DashboardTitle title="Overview" subTitle="Here is the small overview of your courses, student and payments"></DashboardTitle>
            </div>
            <div className='flex lg:flex-row md:flex-row flex-col gap-8'>

                <Card title="Total student" count={students?.length > 10000 ? students?.length / 1000 + "k" : students?.length }></Card>
                <Card title="Total Courses" count={courses?.length > 10000 ? courses?.length / 1000 + "k": courses?.length}></Card>
                <Card title="Total Earning" count={totalEarning.toFixed(1) + "k"}></Card>
                
            </div>
            <div className='w-64 pt-10'>
                <DashboardTitle title="Courses" subTitle={`There are total ${courses?.length} courses.`}></DashboardTitle>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center justify-items-center pb-8'>
                {
                    courses.length > 0 ? courses.map(course => <CourseCard key={course._id} course={course}></CourseCard>) : null
                }
            </div>
        </div>
    );
};

export default InstructorDashboard;