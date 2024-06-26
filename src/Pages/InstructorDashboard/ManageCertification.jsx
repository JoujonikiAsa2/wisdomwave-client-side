import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { IoClose } from 'react-icons/io5';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import Swal from 'sweetalert2';

const ManageCertification = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [classId, setClassId] = useState("");

    console.log("The class id is", classId)

    const { data: courses = [], refetch } = useQuery({
        queryKey: "courses",
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/enrolledStudents/instructor/${user?.email}`);
            return res.data.data;
        }
    });

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

    const certificateOpen = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, open it!',
            width: 300
        })
        .then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/api/certification/id/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.status === "success") {
                            Swal.fire({
                                title: "Opned!",
                                text: "Certification is opened.",
                                icon: "success",
                                width: 300
                            });
                            refetch()
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
        })

    }

    const certificationClose = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!',
            width: 300
        })
        .then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/api/certification/close/id/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.status === "success") {
                            Swal.fire({
                                title: "Closed!",
                                text: "Certification is Closed.",
                                icon: "success",
                                width: 300
                            });
                            refetch()
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
        })

    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div>
                <DashboardTitle title="Manage Classes" subTitle="View and manage your classes"></DashboardTitle>
                
                <div className='w-full flex justify-center items-center overflow-auto'>
                    <table className='table lg:w-[80%] md:w-2/3 w-[90%] my-12'>
                        <thead>
                            <tr>
                                <th className='text-base font-bold'>Course Title</th>
                                <th className='text-base font-bold '>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-base'>
                            {courses.map(course => {
                                return (
                                    <tr key={course.courseId}>
                                        <td>{course.courseDetails.title}</td>
                                        <td>
                                            <div className='w-full flex gap-4 justify-start items-center'>
                                                {
                                                    course.certificate === false ? <button
                                                        className="btn btn-sm text-white capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2"
                                                        onClick={() => certificateOpen(course.courseId)}>
                                                        Open Certification
                                                    </button> : <button
                                                            className="btn btn-sm text-black capitalize bg-[#E1F0DA]  hover:bg-[#0766AD] my-2">
                                                        Opened
                                                    </button>
                                                }
                                                { course.certificate === true ? <button
                                                 className="btn btn-sm text-white capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2"
                                                    onClick={()=>certificationClose(course.courseId)}>
                                                    Close Certification
                                                </button> : <button
                                                    className="btn btn-sm text-black capitalize bg-[#E1F0DA]  hover:bg-[#0766AD] my-2"
                                                    >
                                                    Closed
                                                </button> }
                                            </div>
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

export default ManageCertification;