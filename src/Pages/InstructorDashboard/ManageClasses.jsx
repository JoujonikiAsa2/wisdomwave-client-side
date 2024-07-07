import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { IoClose } from 'react-icons/io5';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';

const ManageClasses = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [clicked, setClicked] = useState(false);
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);

    console.log("The class id is" , classId)

    const { data: courses = [], refetch } = useQuery({
        queryKey: "courses",
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/enrolledStudents/instructor/${user?.email}`);
            return res.data.data;
        }
    });

    const createLiveClass = (e, setClassId) => {
        e.preventDefault();
        const form = e.target;
        const date = form.classDate.value;
        const title = form.title.value;
        const link = form.link.value;
        const instructorEmail = user?.email;
        console.log(date, title, link);

        axiosPublic.put(`/api/liveClasses/id/${classId}`, { date, title, instructorEmail, link })
            .then(res => {
                console.log(res.data);
                if (res.data.status === "success") {
                    toast.success('Class details added successfully');
                    refetch();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const isToday = (date) => {
        const today = new Date();
        const givenDate = new Date(date);
        return (
            today.getDate() === givenDate.getDate() &&
            today.getMonth() === givenDate.getMonth() &&
            today.getFullYear() === givenDate.getFullYear()
        );
    };

    console.log(courses)

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div>
                <DashboardTitle title="Manage Classes" subTitle="View and manage your classes"></DashboardTitle>
                <div className={`${clicked === true ? "relative w-full flex flex-col justify-center items-center " : "hidden"} relative`} >
                    <div className='absolute bottom-[18.5rem] left-64 md:left-72 lg:left-80 justify-center items-center'>
                        <button className={`${clicked === true ? "btn btn-sm bg-gray-300 te capitalize" : 'hidden'}`} onClick={() => setClicked(false)}>
                            {clicked ? <IoClose></IoClose> : ""}
                        </button>
                    </div>
                    <form action="" className={`${clicked === true ? "lg:w-1/2 md:w-2/3 w-[80%] flex flex-col justify-center items-center gap-3 border p-4" : "hidden"}`} onSubmit={(e) => createLiveClass(e, classId)}>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="duration" className='w-full'>
                                <p className='text-base text-gray-500'>Class date<span className='text-red-500'>*</span> </p>
                                <input type="date" name='classDate' required className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none  text-gray-500' />
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="duration" className='w-full'>
                                <p className='text-base text-gray-500'>Class title<span className='text-red-500'>*</span> </p>
                                <input type="text" name='title' required className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none  text-gray-500' />
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="duration" className='w-full'>
                                <p className='text-base text-gray-500'>Class link<span className='text-red-500'>*</span> </p>
                                <input type="text" name='link' required className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none  text-gray-500' />
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <input type="submit" value="Create" className='btn text-white w-full capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                        </div>
                    </form>
                </div>
                <div className='w-full flex justify-center items-center overflow-auto'>
                    <table className='table lg:w-[80%] md:w-2/3 w-[90%] my-12'>
                        <thead>
                            <tr>
                                <th className='text-base font-bold'>Course Title</th>
                                <th className='text-base font-bold '>Create Class</th>
                                <th className='text-base font-bold '>Today's Classes</th>
                            </tr>
                        </thead>
                        <tbody className='text-base'>
                            {courses.map(course => {
                                const todaysClasses = course.liveClasses.filter(liveClass => isToday(liveClass.date));
                                return (
                                    <tr key={course?.courseId}>
                                        <td>{course?.courseDetails.title}</td>
                                        <td>
                                            <div className='w-full justify-center items-center'>
                                                <button className={`${clicked === false ? "btn btn-sm text-white w-32 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2" : 'hidden'}`} onClick={() => {
                                                    setClicked(true);
                                                    setClassId(course.courseId);
                                                }}>
                                                    {clicked === false ? "Create Class" : ""}
                                                </button>
                                            </div>
                                        </td>
                                        <td className='flex gap-2 flex-wrap'>
                                            {todaysClasses.length > 0 ? (
                                                todaysClasses.map((liveClass, index) => (
                                                    <div key={index}>
                                                        <p className='pb-1'>{new Date(liveClass.date).toLocaleDateString()} - {liveClass.title}</p>
                                                        <a href={liveClass.link}>
                                                            <button className='btn btn-sm text-white capitalize bg-[#5b7f81] hover:to-[#29ADB2] my-2 w-24'>Join</button>
                                                        </a>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No class scheduled for today</p>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageClasses;