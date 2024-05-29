import { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const TuitionRequest = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [tuitionRequests, setTuitionRequests] = useState([])
    console.log(user?.email)

    useEffect(() => {
        axiosPublic.get(`/api/requestedTuition/tutor/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setTuitionRequests(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email])
    return (
        <div>
            <DashboardTitle title="Tuition Requests" subTitle="View all your tuition requests"/>
            <div className='pb-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center justify-items-center gap-6'>
                {
                    tuitionRequests.length !== 0 ? tuitionRequests.map(request => <div className='card border p-4 lg:w-80 md:w-80 w-[90%] h-28 m-4 space-y-1'>
                        <p className='text-gray-500'>Student Email: <span className='text-gray-400'>{request.studentEmail}</span></p>
                        <p className='text-gray-500'>Tuition Type: <span className='text-gray-400'>{request.tutionType}</span></p>
                        {/* #0766AD */}
                        {/* <p className='text-gray-500'>Response Status: &nbsp; {request.responseStatus === 'pending' ? <span className='border rounded-md text-red-400 p-[2px]'>{request.responseStatus}</span> : <span className='border rounded-md text-[#0766AD] p-1'>{request.responseStatus}</span>}</p> */}
                    </div>) : <div className='w-full h-full col-span-3 flex justify-center items-center'>
                        <div className='w-56 h-12 flex justify-center items-center'>
                            <h2>You did not request any tuitions</h2>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default TuitionRequest;