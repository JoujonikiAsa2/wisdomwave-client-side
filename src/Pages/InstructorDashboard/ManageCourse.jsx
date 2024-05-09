
import { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseCard from './CourseCard';
import { MdDelete, MdDeleteForever, MdDeleteOutline, MdEdit } from 'react-icons/md';
import { FiDelete } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ManageCourse = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [courses, setCourses] = useState()
    useEffect(() => {
        axiosPublic.get(`/api/courses/email/${user?.email}`)
            .then(res => {
                // console.log(res.data.data)
                setCourses(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    })

    // handle course delete
    const handleCourseDelete = (id) => {
        axiosPublic.delete(`/api/courses/id/${id}/email/${user?.email}`)
            .then(res => {
                console.log(res.data)
                toast.success("Course deleted successfully")
                setCourses(courses.filter(course => course._id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
       <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center justify-items-center'>
                {
                    courses ? courses.map(course => <div className='flex justify-center gap-4'>
                        <CourseCard key={course._id} course={course}></CourseCard>
                        <div className='h-full flex flex-col gap-4'>
                            <div className='w-8 bg-red-700 flex justify-center items-center rounded cursor-pointer' onClick={() => { handleCourseDelete(course._id) }}>
                                <MdDeleteOutline className='text-2xl text-white'></MdDeleteOutline>
                            </div>
                            <Link to={`/instructor/updateCourse/${course._id}`}>
                                <div className='w-8 bg-slate-700 flex justify-center items-center rounded cursor-pointer'>
                                    <MdEdit className=' text-2xl text-white'></MdEdit>
                                </div>
                            </Link>
                        </div>
                    </div>) : null
                }
            </div>
       </>
    );
};

export default ManageCourse;