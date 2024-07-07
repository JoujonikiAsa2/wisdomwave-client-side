import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const StudentInformation = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const [studentsInfo, setStudentsInfo] = useState([])

    const {  refetch } = useQuery({
        queryKey: ['studentsInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/enrolledStudents/instructor/${user?.email}`)
            setStudentsInfo(res.data.data)
        }
    })

    const handleSearch = (e) => {
        e.preventDefault()
        const form = e.target
        const search = form.search.value
        console.log(search)

        axiosPublic.get(`/api/course/${search}`)
            .then((res) => {
                console.log(res.data.data)
                setStudentsInfo(res.data.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    
    return (
        <div className='w-full'>
            <DashboardTitle title="Students Information" subTitle="View your student list"></DashboardTitle>
            <div className="w-full flex justify-center items-center pb-8">
                <form action="" onSubmit={(e) => handleSearch(e)} className='lg:w-[40%] md:w-[50%] w-[60%] flex justify-center items-center mr-2'>
                    <div className="join w-full ">
                        <input type="text" name="search" className="input input-bordered join-item w-full input-sm bg-[#F3F3F3] focus:outline-none placeholder:text-[#cac9c9] focus:placeholder:text-[#949292] text-black"
                            placeholder="Search student by course title" />
                        <button type="submit" className=" py-[0.2rem] px-2 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] border-2 border-none text-white text-thin rounded-none rounded-r-lg text-sm">Search</button>
                    </div>
                </form>
            </div>
            <div className='w-full overflow-auto'>
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
                            studentsInfo.map(student => 
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