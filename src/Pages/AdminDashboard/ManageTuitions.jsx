import React, { useEffect, useRef, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { PiSpinnerGapBold } from 'react-icons/pi';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageTuitions = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [tuitions, setTuitions] = useState([])
    const [tuition, setTuition] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const form = useRef();

    useEffect(() => {
        axiosPublic.get('/api/tuitions')
            .then(res => {
                // console.log(res.data.data)
                setTuitions(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [tuitions])

    const localHandleSearch = (event) => {
        event.preventDefault()
        const form = event.target
        const searchString = event.target.search.value
        console.log("String", searchString)

        axiosPublic.get(`/api/tuitions/${searchString}`)
            .then(res => {
                console.log(res.data.data)
                setTuitions(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
        // form.reset()
    }

    const handleForm = (email, tuition) => {

        console.log(email, tuition)
        const data = {
            class: tuition.details.class,
            subjects: tuition.details.subjects
        }
        console.log(data)
        axiosPublic.post(`/api/tuitions/${email}`, data)
            .then(res => {
                // console.log(res.data.data)
                setTuition(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpdateTuition = (e) => {
        e.preventDefault()
        const form = e.target
        const userEmail = form.email.value
        const district = form.district.value
        const area = form.area.value
        const group = form.group.value
        const medium = form.medium.value
        const salary = form.salary.value
        const tutoringDays = form.tutoring_days.value
        const details = {
            class: form.class.value,
            subjects: form.subjects.value
        }

        const checkDetails = {
            class: tuition.details.class,
            subjects: tuition.details.subjects
        }

        console.log(checkDetails)
        const data = {
            userEmail,
            district,
            area,
            group,
            medium,
            tutoringDays,
            salary,
            details,
            checkDetails
        }
        console.log(data)

        axiosSecure.patch(`/api/tuitions/${userEmail}`, data)
            .then(res => {
                // console.log(res.data.data)
                toast.success('Tuition updated successfully')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handeDeleteTuition = (code) => {


        axiosPublic.delete(`/api/tuitions/${code}`)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 'success') {
                    toast.success('Tuition deleted successfully')
                    setTuitions(tuitions.filter(tuition => tuition.code !== code))
                }
                else {
                    toast.error('Something went wrong')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }



    return (
        <div className='z-10'>
            <Toaster position='top-center' reverseOrder={false} />
            <DashboardTitle title="Manage Tuitions" subTitle="Manage Tuitions as Admin " />

            <div className="w-full flex justify-center items-center pb-8">
                <form action="" onSubmit={(e) => localHandleSearch(e)} className='lg:w-[40%] md:w-[50%] w-[60%] flex justify-center items-center mr-2'>
                    <div className="join w-full ">
                        <input type="email"
                            name="search"
                            className="input input-bordered join-item w-full input-sm bg-[#F3F3F3] focus:outline-none placeholder:text-[#cac9c9] focus:placeholder:text-[#949292] text-black"
                            placeholder="Search tuition by email" />
                        <button type="submit" className=" py-[0.2rem] px-2 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] border-2 border-none text-white text-thin rounded-none rounded-r-lg text-sm">Search</button>
                    </div>
                </form>
            </div>

            {
                tuitions.length > 0 ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  pb-8 justify-center items-center justify-items-end'>{

                    tuitions.map(tuition => <div class="relative tuition-card text-sm w-[90%] md:w-[40vw] lg:w-[25vw] h-[320px] lg:h-[310px]">
                        <p className='text-gray-500'><strong>Tuition Code:</strong> <span id="userEmail" className=' text-gray-500'>{tuition?.tuitionCode}</span></p>
                        <p className='text-gray-500'><strong>Email:</strong> <span id="userEmail" className=' text-gray-500'>{tuition?.userEmail}</span></p>
                        <p className='py-2 text-gray-500'><strong>District:</strong> <span id="district" className='capitalize text-white bg-green-400 rounded p-1 '>{tuition?.district}</span></p>
                        <p className='text-gray-500'><strong>Area:</strong> <span id="area" className='capitalize text-white border bg-[#29ADB2] p-1 rounded '>{tuition?.area}</span></p>
                        <p className='text-gray-500'><strong>Group:</strong> <span id="group" className='capitalize text-gray-500'>{tuition?.group}</span></p>
                        <p className='text-gray-500'><strong>Medium:</strong> <span id="medium" className='capitalize text-gray-500'>{tuition?.medium}</span></p>
                        <p className='text-gray-500'><strong>Tutoring Days:</strong> <span id="tutoringDays" className='capitalize text-gray-500'>{tuition?.tutoringDays.join(', ')}</span></p>
                        <p className='text-gray-500'><strong>Salary:</strong> <span id="tutoringDays" className='capitalize text-gray-500'>{tuition?.salary}</span></p>
                        <div class="details">
                            <p className='text-gray-500'><strong>Class:</strong> <span id="class">{tuition?.details.class}</span></p>
                            <p className='text-gray-500'><strong>Subjects:</strong> <span id="subjects" className='capitalize text-gray-500'>{tuition?.details?.subjects.join(', ')}</span></p>
                        </div>
                        <div className=' absolute -right-4 top-14 h-16 w-8 justify-center items-center flex flex-col gap-1 bg-slate-300 rounded-xl'>
                            <div className="lg:tooltip" data-tip="Delete Tuition" onClick={() => handeDeleteTuition(tuition?.tuitionCode)}>
                                <div className='w-6 bg-red-700 flex justify-center items-center rounded cursor-pointer'>
                                    <MdDeleteOutline className='text-xl text-white'></MdDeleteOutline>
                                </div>
                            </div>
                            <div className="lg:tooltip" data-tip="Edit Tuition" onClick={() => {
                                document.getElementById('my_modal_4').showModal()
                                handleForm(tuition?.userEmail, tuition)
                            }
                            }>
                                <div className='w-6 bg-slate-700 flex justify-center items-center rounded cursor-pointer'>
                                    <MdEdit className=' text-xl text-white'></MdEdit>
                                </div>
                            </div>
                            <dialog id="my_modal_4" className="modal">
                                <div className="modal-box lg:w-6/12 md:w-6/12 max-w-5xl">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:border-none">✕</button>
                                    </form>
                                    <div className="">
                                        <form
                                            ref={form}
                                            onSubmit={handleUpdateTuition}
                                            className=" w-full h-full flex flex-col items-center justify-center"
                                        >
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    defaultValue={tuition?.userEmail}
                                                    placeholder="Email"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="district"
                                                    defaultValue={tuition?.district}
                                                    placeholder="District"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="area"
                                                    defaultValue={tuition?.area}
                                                    placeholder="Area"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="group"
                                                    defaultValue={tuition?.group}
                                                    placeholder="Group"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="medium"
                                                    defaultValue={tuition?.medium}
                                                    placeholder="Medum"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="tutoring_days"
                                                    defaultValue={tuition?.tutoringDays}
                                                    placeholder="Tutoring Days"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="salary"
                                                    defaultValue={tuition?.salary}
                                                    placeholder="Salary"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="class"
                                                    defaultValue={tuition?.details?.class}
                                                    placeholder="Class"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="my-1 w-[80%]">
                                                <input
                                                    type="text"
                                                    name="subjects"
                                                    defaultValue={tuition?.details?.subjects}
                                                    placeholder="Subjects"
                                                    className="p-1 border border-gray-300 w-full rounded-md focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div className="mt-3 w-full justify-center items-center">
                                                {isLoading == true ? (
                                                    <button
                                                        className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-none text-white w-]80%] focus:outline-none capitalize'><PiSpinnerGapBold className='animate-spin text-2xl' ></PiSpinnerGapBold  ></button>
                                                ) : (
                                                    <div className='w-full flex justify-center items-center'>
                                                        <input
                                                            type="submit"
                                                            value="Update Tuition"
                                                            className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-none text-white w-[80%] focus:outline-none capitalize ' />
                                                    </div>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>)
                }

                </div>
                    : <div className='text-center w-full h-[50vh] flex justify-center items-center'><p className='text-xl'>No Tuitions</p></div>
            }
        </div>
    );
};

export default ManageTuitions;