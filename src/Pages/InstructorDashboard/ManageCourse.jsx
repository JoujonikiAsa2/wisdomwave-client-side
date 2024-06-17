
import { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import CourseCard from './CourseCard';
import { MdAddTask, MdDelete, MdDeleteForever, MdDeleteOutline, MdEdit } from 'react-icons/md';
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
            <DashboardTitle title='Course Management' subTitle="Update or delete your course"></DashboardTitle>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center items-center justify-items-center'>
                {
                    courses ? courses.map(course => <div className='flex justify-center'>
                        <CourseCard key={course._id} course={course}></CourseCard>
                        <div className='h-full flex flex-col gap-2 relative right-4 top-16 bg-slate-300 p-2 rounded-xl'>
                            <div className="lg:tooltip" data-tip="Delete Course">
                                <div className='w-6 bg-red-700 flex justify-center items-center rounded cursor-pointer' onClick={() => { handleCourseDelete(course._id) }}>
                                    <MdDeleteOutline className='text-xl text-white'></MdDeleteOutline>
                                </div>
                            </div>
                            <Link to={`/instructor/updateCourse/${course._id}`}>
                                <div className="lg:tooltip" data-tip="Edit Course">
                                    <div className='w-6 bg-slate-700 flex justify-center items-center rounded cursor-pointer'>
                                        <MdEdit className=' text-xl text-white' tooltip='Edit'></MdEdit>
                                    </div>
                                </div>
                            </Link>
                            <Link to={`/instructor/createAssignments/${course._id}`}>
                                <div className="lg:tooltip" data-tip="Create Quiz">
                                    <div className='w-6 bg-slate-700 flex justify-center items-center rounded cursor-pointer'>
                                        <MdAddTask className=' text-xl text-white'></MdAddTask>
                                    </div>
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