import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const StudentInformation = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()

    const { data: purchasedCourses = [], refetch } = useQuery({
        queryKey: ['purchasedCourses'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/enrolledStudents/instructor/${user?.email}`)
            return res.data.data
        }
    })

    console.log(purchasedCourses)
    return (
        <div className='w-full'>
            <DashboardTitle title="Students Information" subTitle="View your student list"></DashboardTitle>
            <div className='w-full'>
                <table className='table w-[80%]'>
                    <thead>
                        <tr>
                            <th className='text-base font-bold'>Student Email</th>
                            <tr className='text-base font-bold'>Course Title</tr>
                            <th className='text-base font-bold'>Transection ID</th>
                            <th className='text-base font-bold'>Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchasedCourses.map(student => 
                                <tr>
                                    <td>{student?.userEmail}</td>
                                    <td>{student?.courseDetails.title}</td>
                                    <td>{student?.transactionId}</td>
                                    <td>{student?.courseDetails.enrollFee} TK</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentInformation;