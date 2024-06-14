import React, { useEffect, useState } from 'react';
import SectionTitle from '../../SharedComponents/SectionTitle/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const FindTutors = () => {
    const axiosPublic = useAxiosPublic();
    const [tutors, setTutors] = useState([]);
    const [dates, setDates] = useState({});
    const [count, setCount] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(0);

    const numberOfPages = Math.ceil(count / itemsPerPage)

    const pages = [...Array(numberOfPages).keys()]

    useEffect(() => {
        axiosPublic.get(`/api/tutors?page=${currentPage}&size=${itemsPerPage}`)
            .then((res) => {
                console.log(res.data.data);
                setTutors(res.data.data);
                setCount(res.data.total)
            })
            .catch((e) => {
                console.log(e);
            });
    }, [currentPage, itemsPerPage]);

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

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }




    return (
        <div className='py-20 mx-[5vw]'>
            <SectionTitle title="Find tutors" subtitle="Find online and offline tutors here" />
            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-12'>
                {tutors != null && tutors.map(tutor => (
                    <div className='flex flex-col md:flex-col justify-start items-start md:p-4 lg:pt-4 border rounded-xl gap-4 relative p-4 pt-10' key={tutor._id} >
                        <div className='lg:w-60 w-full flex lg:justify-start md:justify-start justify-center lg:items-start md:items-start items-center'>
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
                            <div className='absolute right-1 top-1'>
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
                        <div>

                            <Link to={`/tutorDetails/${tutor?._id}`}>
                                <button className='btn btn-xs capitalize text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-[#29ADB2]  border '>See Profile</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`flex justify-center py-4`} >
                <div className="flex gap-2 justify-center items-center">
                    <div>
                        <button className="btn btn-sm capitalize text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2" onClick={handlePrev}>Prev</button>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        {
                            pages.map(page => <button className={`btn btn-sm btn-circle hover:bg-slate-400 ${currentPage === page && "selected border-1 bg-slate-400 text-white"}`} key={page} onClick={() => setCurrentPage(page)}>{page + 1}</button>)
                        }
                    </div>
                    <div>
                        <button className="btn btn-sm capitalize text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2" onClick={handleNext}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindTutors;
