import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseCard from './CourseCard';
import { useQuery } from '@tanstack/react-query';

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
        axiosPublic.get(`/api/totalEarning/${user?.email}`)
            .then(res => {
                console.log(res.data[0].totalEnrollFee)
                setEarning(res.data[0].totalEnrollFee)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email])


    console.log("Instructorer courses", courses)
    return (
        <div className='w-[90vw] flex flex-col'>

            <div className='pr-4'>
                <DashboardTitle title="Dasboard details"></DashboardTitle>
            </div>
            <div className='flex lg:flex-row md:flex-row flex-col gap-8'>

                <div className='lg:w-56 md:w-64 w-[80vw] border bg-[#29ADB2] h-32 flex flex-col gap-2 justify-center items-center text-white text-xl rounded-xl'>
                    <p>Total Students</p>
                    <span className='w-32 h-12 bg-white rounded-xl text-center text-[#29ADB2] flex justify-center items-center'>{students?.length}</span>
                </div>
                <div className='lg:w-56 md:w-64 w-[80vw] border bg-[#29ADB2] h-32 flex flex-col gap-2 justify-center items-center text-white text-xl rounded-xl'>
                    <p>Total Courses</p>
                    <span className='w-32 h-12 bg-white rounded-xl text-center text-[#29ADB2] flex justify-center items-center'>{courses?.length}</span>
                </div>
                <div className='lg:w-56 md:w-64 w-[80vw] border bg-[#29ADB2] h-32 flex flex-col gap-2 justify-center items-center text-white text-xl rounded-xl'>
                    <p>Total Earning</p>
                    <span className='w-32 h-12 bg-white rounded-xl text-center text-[#29ADB2] flex justify-center items-center'>{earning / 1000}k Taka</span>
                </div>
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