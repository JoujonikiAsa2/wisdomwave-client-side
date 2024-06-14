import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

const ManageTutorProfiles = () => {

    const axiosPublic = useAxiosPublic();
    const [tutorProfiles, setTutorProfiles] = useState([]);
    const [dates, setDates] = useState({});


    useEffect(() => {
        axiosPublic.get('/api/tutors')
            .then(res => {
                setTutorProfiles(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [tutorProfiles])

    console.log(tutorProfiles)

    function calculateTimeDifference(givenDateString) {
        const givenDate = new Date(givenDateString);
        const currentDate = new Date();
        const difference = currentDate - givenDate;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const formatObject = { days, hours };
        return formatObject;
    }


    function calculateTimeDifference(givenDateString) {
        const givenDate = new Date(givenDateString);
        const currentDate = new Date();
        const difference = currentDate - givenDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

        const formatObject = { days, hours };
        return formatObject;
    }

    useEffect(() => {
        const newDates = {};
        tutorProfiles.forEach(tutor => {
            const dateDifference = calculateTimeDifference(tutor.profileCreationDate);
            newDates[tutor._id] = dateDifference;
        });
        setDates(newDates);
    }, [tutorProfiles]);
    // console.log(dates)

    console.log(dates)

    const handleDeleteTutor =  (email) => {
        try {
            axiosPublic.delete(`/api/tutors/${email}`);
            setTutorProfiles(tutorProfiles.filter(tutor => tutor.email !== email))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <DashboardTitle title="Manage Tutor Profiles" subTitle="Manage Tutor Profiles as Admin " />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center justify-items-center'>
                {tutorProfiles != null && tutorProfiles.map(tutor => (
                    <div className='w-[90%] lg:w-80  flex flex-col md:flex-col justify-start items-start md:p-4 lg:pt-4 border rounded-xl gap-4 relative p-4 pt-10 text-xs' key={tutor._id} >
                        <div className='lg:w-56 w-full flex lg:justify-start md:justify-start justify-center lg:items-start md:items-start items-center'>
                            <img src={tutor?.profile} alt="" className='w-32 h-32 rounded-full' />
                        </div>
                        <div className='lg:w-60'>
                            <p className='text-base font-bold text-[#0766AD] pb-4 capitalize'>{tutor?.name}</p>
                            <p>
                                <span className='font-semibold'>Preferable subject:</span> {tutor?.preferableSubject.map(sub => <span key={sub} className='capitalize'>{sub},&nbsp;</span>)}
                            </p>
                            <p>
                                <span className='font-semibold'>Preferable class</span>: {tutor?.preferableClass.map(cls => <span key={cls}>{cls}, &nbsp;</span>)}
                            </p>
                            <div className='absolute right-1 top-1 text-xs'>
                                {dates[tutor._id] && (
                                    <div className='p-2 rounded-md bg-[#E1F0DA]'>
                                        <p> <span className='font-semibold'>Created:</span> {dates[tutor?._id].days} days, {dates[tutor?._id].hours} hours ago</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='lg:w-[80%] firstLetterUppercase' dangerouslySetInnerHTML={{
                            __html: tutor?.about
                                .split('. ')
                                .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
                                .join('. ')

                        }}>
                        </div>
                        <div className=' absolute -right-4 top-14 h-16 w-8 justify-center items-center flex flex-col gap-2 bg-slate-300 rounded-xl'>
                            <div className="lg:tooltip" data-tip="Delete" onClick={() => handleDeleteTutor(tutor?.email)}>
                                <div className='w-6 bg-red-700 flex justify-center items-center rounded cursor-pointer'>
                                    <MdDeleteOutline className='text-xl text-white'></MdDeleteOutline>
                                </div>
                            </div>
                            <Link to={`/admin/manageProfile/${tutor?.email}`}>
                                <div className="lg:tooltip" data-tip="Edit">
                                    <div className='w-6 bg-slate-700 flex justify-center items-center rounded cursor-pointer'>
                                        <MdEdit className=' text-xl text-white' tooltip='Edit'></MdEdit>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div>

                            <Link to={`/tutorDetails/${tutor?._id}`}>
                                <button className='btn btn-xs capitalize text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-[#29ADB2] border '>See Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageTutorProfiles;