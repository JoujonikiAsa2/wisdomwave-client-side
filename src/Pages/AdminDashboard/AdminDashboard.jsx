import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import AdminCard from './AdminCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useCourses from '../../hooks/useCourses';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashboard = () => {

    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState(null)
    const { allCourses } = useCourses()


    useEffect(() => {
        axiosPublic.get("/api/users")
            .then(res => {
                setUserInfo(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    // filterd by user type
    const students = userInfo?.filter(user => user.userType === "student")
    const tutors = userInfo?.filter(user => user.userType === "tutor")
    const instructors = userInfo?.filter(user => user.userType === "instructor")
    const admins = userInfo?.filter(user => user.userType === "admin")

    // filtered by category
    const development = allCourses?.filter(course => course?.courseDetails?.category === "development")
    const business = allCourses?.filter(course => course?.courseDetails?.category === "business")
    const finance_accounting = allCourses?.filter(course => course?.courseDetails?.category === "finance_accounting")
    const it_software = allCourses?.filter(course => course?.courseDetails?.category === "it_software")
    const design = allCourses?.filter(course => course?.courseDetails?.category === "design")
    const office_productivity = allCourses?.filter(course => course?.courseDetails?.category === "office_productivity")
    const personal_development = allCourses?.filter(course => course?.courseDetails?.category === "personal_development")
    const marketing = allCourses?.filter(course => course?.courseDetails?.category === "marketing")
    const lifestyle = allCourses?.filter(course => course?.courseDetails?.category === "lifestyle")
    const photography_video = allCourses?.filter(course => course?.courseDetails?.category === "photography_video")
    const health_fitness = allCourses?.filter(course => course?.courseDetails?.category === "health_fitness")
    const music = allCourses?.filter(course => course?.courseDetails?.category === "music")
    const teaching_academics = allCourses?.filter(course => course?.courseDetails?.category === "teaching_academics")

    // date wise


    const userData = [{ name: "Student", count: students?.length }, 
        { name: "Tutor", count: tutors?.length }, 
        { name: "Instructor", count: instructors?.length },
        { name: "Admin", count: admins?.length}
    ]

    const courseData = [
        { name: "Development", count: development?.length },
        { name: "Business", count: business?.length },
        { name: "Finance & Accounting", count: finance_accounting?.length },
        { name: "IT & Software", count: it_software?.length },
        { name: "Office Productivity", count: office_productivity?.length },
        { name: "Personal Development", count: personal_development?.length },
        { name: "Design", count: design?.length },
        { name: "Marketing", count: marketing?.length },
        { name: "Lifestyle", count: lifestyle?.length },
        { name: "Photography & Video", count: photography_video?.length },
        { name: "Health & Fitness", count: health_fitness?.length },
        { name: "Music", count: music?.length },
        { name: "Teaching & Academic", count: teaching_academics?.length }
    ]

    console.log(userInfo)
    const CustomTooltip = ({ active, payload, label }) => {
        console.log(label, payload)
        if (active && payload && payload.length) {
            return (
                <div className="w-32 h-16 flex justify-center items-center bg-white rounded">
                    <p className="text-center p-1">{`${payload[0].payload.name} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <DashboardTitle title="Overview" subTitle="Here is the overview of the system"></DashboardTitle>
            <div className='flex flex-col gap-8 mb-8'>

                <div className='flex flex-wrap gap-8'>
                    <AdminCard title="Users" count={userInfo?.length} userData={userData}></AdminCard>
                    <div className='lg:w-[60%] md:w-full w-full h-[200px] p-6 rounded-lg shadow-md bg-info-gradient'>
                        <p className='text-lg font-medium'>{allCourses?.length > 1000 ? `${allCourses?.length / 1000}k` : allCourses?.length}</p>
                        <span>Courses by category</span>
                        <div className=' my-3'></div>
                        <ResponsiveContainer width="90%" height="70%" >
                            <AreaChart
                                data={courseData}
                            >
                                <Tooltip content={<CustomTooltip />}/>
                                <Area type="monotone" dataKey="count" stroke="#0766AD" fill="#0766AD" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;