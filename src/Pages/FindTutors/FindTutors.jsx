import React, { useEffect, useState } from 'react';
import SectionTitle from '../../SharedComponents/SectionTitle/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const FindTutors = () => {
    const axiosPublic = useAxiosPublic();
    const [tutors, setTutors] = useState([]);
    const [dates, setDates] = useState({});
    const [more, setMore] = useState(5)
    const [cls, setCls] = useState('flex')

    useEffect(() => {
        axiosPublic.get('/api/tutors')
            .then((res) => {
                console.log(res.data.data);
                setTutors(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

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
        tutors.forEach(tutor => {
            const dateDifference = calculateTimeDifference(tutor.profileCreationDate);
            newDates[tutor._id] = dateDifference;
        });
        setDates(newDates);
    }, [tutors]);
    // console.log(dates)

    console.log(calculateTimeDifference("Tue Apr 04 2024 14:12:56 GMT+0600"))
    const about = tutors.map(tutor => tutor.about.split('.').slice())
    console.log(about)

    about.forEach(a => {
        console.log(a[0].slice(0, 1).toUpperCase())
    })



    return (
        <div className='py-20 mx-[5vw]'>
            <SectionTitle title="Find tutors" subtitle="Find online and offline tutors here" />
            <div className='grid grid-cols-1 gap-12'>
                {tutors != null && tutors.slice(0, more).map(tutor => (
                    <div className='flex flex-col lg:flex-row md:flex-col justify-start items-start lg:justify-between lg:items-center md:p-4 lg:pt-4 border rounded-xl gap-4 relative p-4 pt-10' key={tutor._id} >
                        <div className='lg:w-60 w-full flex lg:justify-start md:justify-start justify-center lg:items-start md:items-start items-center'>
                            <img src={tutor?.profile} alt="" className='w-56 h-56 rounded-full' />
                        </div>
                        <div className='lg:w-60'>
                            <p className='text-base font-bold text-[#0766AD] pb-4 capitalize'>{tutor?.name}</p>
                            <p>
                                <span className='font-semibold'>Preferable subject:</span> {tutor?.preferableSubject.map(sub => <span key={sub} className='capitalize'>{sub},&nbsp;</span>)}
                            </p>
                            <p>
                                <span className='font-semibold'>Preferable class</span>: {tutor?.preferableClass.map(cls => <span key={cls}>{cls}, &nbsp;</span>)}
                            </p>
                            <div className='absolute right-1 top-1'>
                                {dates[tutor._id] && (
                                    <div className='pr-4'>
                                        <p> <span className='font-semibold'>Created:</span> {dates[tutor?._id].days} days, {dates[tutor?._id].hours} hours ago</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='lg:w-[24rem]'>
                            <p>
                                {tutor?.about
                                    .split('. ')
                                    .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
                                    .join('. ')
                                }
                            </p>
                        </div>
                        <div>

                            <Link to={`/tutorDetails/${tutor?._id}`}>
                                <button className='btn btn-xs capitalize bg-none border-[#29ADB2] text-[#0766AD] border '>See Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${cls} justify-center py-4`} >
                <button className='btn btn-xs capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white border-2 border-none' onClick={() => {
                    setMore(tutors?.length)
                    setCls('hidden')
                }}>See More</button>
            </div>
        </div>
    );
};

export default FindTutors;
