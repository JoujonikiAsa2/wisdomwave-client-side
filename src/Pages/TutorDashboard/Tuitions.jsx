import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import './style.css'
import ContactStudent from './ContactStudent';
import { Toaster } from 'react-hot-toast';

const Tuitions = () => {
    const axiosPublic = useAxiosPublic();
    const [filters, setFilters] = useState([{ district: '' }]);
    const [districts, setDistricts] = useState([]);
    const [district_name, setDistrict_name] = useState('');
    const [allTuitions, setAllTuitions] = useState([]); // All tuitions state
    const [filteredTuitions, setFilteredTuitions] = useState([]); // Filtered tuitions state
    const [openForm, setOpenForm] = useState(false)
    const [email, setEmail] = useState()

    const { isLoading, isError } = useQuery({
        queryKey: ['allTuitions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/tuitions');
            setAllTuitions(res.data.data);
            setFilteredTuitions(res.data.data); // Initially, set filtered tuitions to all tuitions
            return res.data.data;
        }
    });

    useEffect(() => {
        axiosPublic.get("/api/districts")
            .then(res => {
                if (res.data.status === "success") {
                    setDistricts(res.data.data);
                }
            })
            .catch(err => console.log(err.message));
    }, []);

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setDistrict_name(selectedDistrict);
        if (selectedDistrict === '') {
            // If 'All' is selected, show all tuitions
            setFilteredTuitions(allTuitions);
        } else {
            // Filter tuitions based on the selected district
            const filteredData = allTuitions.filter(tu => tu.district === selectedDistrict);
            setFilteredTuitions(filteredData);
        }
    };
    const handleClassChange = (e) => {
        const classNo = e.target.value;
        if (classNo === '') {
            // If 'All' is selected, show all tuitions
            setFilteredTuitions(allTuitions);
        } else {
            // Filter tuitions based on the selected district
            const filteredData = allTuitions.filter(tu => tu.details.class === e.target.value);
            setFilteredTuitions(filteredData);
        }
    };

    // handle passing props at form
    const handleForm = (userEmail) => {
        setEmail(userEmail)
    }

    return (
        <>
            <Toaster position='top-center' reverseOrder={false} />
            <DashboardTitle title="Tuitions" subTitle="Find all tuitions here" />
            <div className='flex flex-col md:flex-row lg:flex-row gap-2 w-full z-30 mb-9'>
                <div className=''>
                    <label htmlFor="district">Filter by location:</label>
                    <select id="district" name="district_id" onChange={handleDistrictChange} className='focus:outline-none border rounded p-2 m-2 capitalize round'>
                        <option value="">All</option>
                        {
                            districts.map(district => (
                                <option key={district.district_id} value={district.name}>{district.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className=''>
                    <label htmlFor="district">Filter by class: </label>
                    <select id="district" name="district_id" onChange={handleClassChange} className='w-32 focus:outline-none border rounded p-2 m-2 capitalize round'>
                        <option value="">All</option>
                        {
                            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((classNo, index) => (
                                <option key={index} value={classNo}>Class {classNo}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 justify-center justify-items-center items-center lg:ml-[1.3rem]'>
                {
                    filteredTuitions.length > 0 ? filteredTuitions.map(tuition =>
                        <div class="tuition-card text-sm w-[90%] md:w-[40vw] lg:w-[28vw] h-[320px] lg:h-[310px]">
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
                            <div className='flex justify-center mt-6'>
                                <button className='btn btn-sm border shadow-2xl rounded-3xl bg-[#29ADB2] text-white hover-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] hover:text-white text-black lg:w-1/2 md:w-1/3 w-[80%] focus:outline-none capitalize font-thin' onClick={() => {
                                    document.getElementById('my_modal_3').showModal()
                                    handleForm(tuition?.userEmail)
                                }}>Send Request</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <ContactStudent email={email}></ContactStudent>
                                    </div>
                                </dialog>
                            </div>
                        </div>) :
                        <div className='w-full h-[400px] justify-center items-center col-span-3'>
                            <h2 className="text-lg text-center ">No Tuitions Found</h2>
                        </div>
                }

            </div>

        </>
    );
};

export default Tuitions;
