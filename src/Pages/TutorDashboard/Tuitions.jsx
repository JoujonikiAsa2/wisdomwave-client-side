import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import TuitionCard from './TuitionCard';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import './style.css'
import ContactStudent from './ContactStudent';
import { IoClose } from 'react-icons/io5';
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
            <div className='flex flex-col md:flex-row lg:flex-row gap-4 w-full z-30 '>
                <div className='mb-6'>
                    <label htmlFor="district">Filter by :</label>
                    <select id="district" name="district_id" onChange={handleDistrictChange} className='focus:outline-none border rounded p-2 m-2 capitalize round'>
                        <option value="">All</option>
                        {
                            districts.map(district => (
                                <option key={district.district_id} value={district.name}>{district.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="district">Filter by class: </label>
                    <select id="district" name="district_id" onChange={handleClassChange} className='w-32 focus:outline-none border rounded p-2 m-2 capitalize round'>
                        <option value="">All</option>
                        {
                            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((classNo, index) => (
                                <option key={index} value={classNo}>{classNo}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className={` fixed  w-[310xpx] lg:w-[300px] md:w-[300px] h-[350px] md:h-[500px] lg:h-[500px] top-[30%] md:top-[20%] lg:top-[20%]  lg:bottom-40 left-[15%] md:left-[25%] lg:left-[35%]  flex justify-center items-center ${openForm === true ? '' : 'hidden'}`}>
                <div className={`popup-shadow  w-[280px] lg:w-[300px] md:w-[300px] h-[330px] bg-[#b3cfa6] z-40 ${openForm === true ? 'block p-4 shadow-2xl rounded-lg' : 'hidden'}`}>
                    <ContactStudent email={email} openForm={openForm} setOpenForm={setOpenForm}></ContactStudent>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10 justify-center justify-items-center items-center lg:ml-[1.3rem]'>
                {
                    filteredTuitions.length > 0 ? filteredTuitions.map(tuition => 
                    <TuitionCard 
                        key={tuition._id} 
                        tuition={tuition} 
                        setOpenForm={setOpenForm} 
                        handleForm={handleForm} 
                        openForm={openForm}>

                        </TuitionCard>) :
                        <div className='w-full h-[400px] justify-center items-center col-span-3'>
                            <h2 className="text-lg text-center ">No Tuitions Found</h2>
                        </div>
                }
               
            </div>
        </>
    );
};

export default Tuitions;
