import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SectionTitle from '../../SharedComponents/SectionTitle/SectionTitle';

const RequestedTuition = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [requestedTuitions, setRequestedTuitions] = useState([])
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
    }, [user?.email])

    console.log(requestedTuitions)
    return (
        <div className='pt-20 mx-[5vw]'>
            <SectionTitle title="Requested Tuitions" subtitle="The tutors details are given here, whom you requested."></SectionTitle>
            <div className='py-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center justify-items-center gap-6'>
                {
                    requestedTuitions.map(request => <div className='card border p-4 lg:w-80 md:w-80 w-96 h-32'>
                        <p>Tutor Email: {request.tutorEmail}</p>
                        <p>Tuition Type: {request.tutionType}</p> 
                        {/* #0766AD */}
                        <p>Response Status: &nbsp; {request.responseStatus === 'pending' ? <span className='border rounded-md text-red-400 p-1'>{request.responseStatus}</span> : <span className='border rounded-md text-[#0766AD] p-1'>{request.responseStatus}</span>}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default RequestedTuition;