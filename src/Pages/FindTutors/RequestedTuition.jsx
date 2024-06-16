import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SectionTitle from '../../SharedComponents/SectionTitle/SectionTitle';

const RequestedTuition = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [requestedTuitions, setRequestedTuitions] = useState([])
    const [tuitionRequests, setTuitionRequests] = useState([])
    console.log(user?.email)

    useEffect(() => {
        axiosPublic.get(`/api/requestedTuition/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setRequestedTuitions(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email, requestedTuitions])

    useEffect(() => {
        axiosPublic.get(`/api/student/tuitionRequest/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setTuitionRequests(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email, tuitionRequests])

    return (
        <div className='pt-20 mx-[5vw]'>
            <SectionTitle title="Requested Tuitions" subtitle="The tutors details are given here, whom you requested."></SectionTitle>
            <p>No. of requested Tuitions you send to the tutor: {requestedTuitions.length}</p>
            <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center justify-items-center gap-6'>
                {
                    requestedTuitions.length != 0 ? requestedTuitions.map(request => <div className='card border p-4 lg:w-80 md:w-80 w-[90%] h-28 m-4 space-y-1'>
                        <p className='text-gray-500'>Tutor Email: <span className='text-gray-400'>{request.tutorEmail}</span></p>
                        <p className='text-gray-500'>Tuition Type: <span className='text-gray-400'>{request.tutionType}</span></p>
                        {/* #0766AD */}
                        {/* <p className='text-gray-500'>Response Status: &nbsp; {request.responseStatus === 'pending' ? <span className='border rounded-md text-red-400 p-[2px]'>{request.responseStatus}</span> : <span className='border rounded-md text-[#0766AD] p-1'>{request.responseStatus}</span>}</p> */}
                    </div>) : <div className='w-full h-full col-span-3 flex justify-center items-center'>
                        <div className='w-56 h-12 flex justify-center items-center'>
                            <h2 >You did not request any tuitions</h2>
                        </div>
                    </div>
                }
                
            </div>
            <p className='mt-8'>No. of requested Tuitions you get from the tutor: {tuitionRequests.length}</p>
            <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center justify-items-center gap-6 mb-10'>
                {
                    tuitionRequests.length !== 0 ? tuitionRequests.map(request => <div className='card border p-4 lg:w-80 md:w-80 w-[90%] h-full m-4 space-y-1'>
                        <p className='text-gray-500'>Tutor Email: <span className='text-gray-400'>{request.tutorEmail}</span></p>
                        {/* #0766AD */}
                        <p className='text-gray-500'>Phone Number: <span className='text-gray-400'>{request.phoneNumber}</span></p>                        

                        <p className='text-gray-500'>Tutor Message: <span className='text-gray-400'>{request.message}</span></p>
                        {/* <p className='text-gray-500'>Response Status: &nbsp; {request.responseStatus === 'pending' ? <span className='border rounded-md text-red-400 p-[2px]'>{request.responseStatus}</span> : <span className='border rounded-md text-[#0766AD] p-1'>{request.responseStatus}</span>}</p> */}
                    </div>) : <div className='w-full h-full col-span-3 flex justify-center items-center'>
                        <div className='w-56 h-12 flex justify-center items-center'>
                            <h2 >You did not request any tuitions</h2>
                        </div>
                    </div>
                }
                
            </div>
        </div>
    );
};

export default RequestedTuition;