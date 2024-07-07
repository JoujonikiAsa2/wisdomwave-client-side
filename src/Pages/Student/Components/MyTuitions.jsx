import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';

const MyTuitions = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [filteredTuitions, setFilteredTuitions] = useState([])

    useEffect(() => {

        axiosPublic.get('/api/tuitions')
            .then(res => {
                console.log(res.data.data)
                const tuitions = res.data.data.filter(tuition => tuition?.userEmail === user?.email)
                setFilteredTuitions(tuitions)
            })
            .catch(e => {
                console.log(e);
            });
    }, [filteredTuitions])

    return (
        <div className='py-32 mx-[5vw]'>
            <h2 className="text-lg text-center pb-16">My Tuitions: &nbsp; <span className="badge bg-[#0766AD] text-white p-3">{filteredTuitions.length}</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 justify-center justify-items-center items-center '>
                {
                    filteredTuitions.length > 0 ? filteredTuitions.map(tuition =>
                        <div class="tuition-card text-sm w-[90%] md:w-[40vw] lg:w-[24vw] h-[320px] lg:h-[310px]">
                            <p className='text-gray-500'><strong>Email:</strong> <span id="userEmail" className=' text-gray-500'>{tuition?.userEmail}</span></p>
                            <p className='py-2 text-gray-500'><strong>District:</strong> <span id="district" className='capitalize text-white bg-green-400 rounded p-1 '>{tuition?.district}</span></p>
                            <p className='text-gray-500'><strong>Area:</strong> <span id="area" className='capitalize text-white border bg-[#29ADB2] p-1 rounded '>{tuition?.area}</span></p>
                            <p className='text-gray-500'><strong>Group:</strong> <span id="group" className='capitalize text-gray-500'>{tuition?.group}</span></p>
                            <p className='text-gray-500'><strong>Medium:</strong> <span id="medium" className='capitalize text-gray-500'>{tuition?.medium}</span></p>
                            <p className='text-gray-500'><strong>Tutoring Days:</strong> <span id="tutoringDays" className='capitalize text-gray-500'>{tuition?.tutoringDays.join(', ')}</span></p>
                            <div class="details">
                                <p className='text-gray-500'><strong>Class:</strong> <span id="class">{tuition?.details.class}</span></p>
                                <p className='text-gray-500'><strong>Subjects:</strong> <span id="subjects" className='capitalize text-gray-500'>{tuition?.details?.subjects.join(', ')}</span></p>
                            </div>
                        </div>) :
                        <div className='w-full h-[400px] justify-center items-center col-span-3'>
                            <h2 className="text-center text-red-500 ">No Tuitions Found</h2>
                        </div>
                }

            </div>
        </div>
    );
};

export default MyTuitions;