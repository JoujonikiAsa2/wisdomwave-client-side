import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Loader from '../../SharedComponents/Loader/Loader';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const IMAGE_HOSTING_API = import.meta.env.VITE_IMAGE_HOSTINF_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_API}`


const ManageProfile = () => {

    const axiosPublic = useAxiosPublic()
    const [isLoading, setIsLoading] = useState(true)
    const {email} = useParams()
    const {user} = useAuth()
    const [userInfo, setUserInfo] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const [file, setFile] = useState(null);

    useEffect(() => {
        try {
            axiosPublic.get(`/api/user/${user?.email}`)
                .then(res => {
                    setUserDetails(res.data.data)
                    console.log(res.data.data)
                })
                .catch(error => {
                    console.error(error);
                })
        } catch (error) {
            console.error(error);
        }
    }, [user?.email, userDetails]);


    useEffect(() => {
        axiosPublic.get(`/api/tutors/${email}`)
            .then(res => {
                setUserInfo(res.data.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err.message))
    }, [email, userInfo])

    console.log(userInfo)
    if (isLoading === true) {
        return <Loader></Loader>
    }


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
    };

    const tutorPictureUpdate = async () => {
        console.log("nothing")
        const imageFile = { image: file }
        const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });
        const image = imageRes.data.data.display_url;
        console.log(image);

        axiosPublic.patch(`/api/tutors/${email}`, { profile: image })
            .then(res => {
                setUserInfo(res.data.data)
                console.log(res.data.data)
                toast.success("Profile updated successfully")
                document.getElementById('my_modal_3').close()
                window.location
            })
            .catch(err => console.log(err.message))
    };

    const handleDelete = () => {
        axiosPublic.delete(`/api/tutors/${email}`)
            .then(res => {
                toast.success('Successfully Deleted!', { duration: 1000 })
                setUserInfo(null)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <DashboardTitle title="Manage Profile" subTitle="Manage your tutor profile" />
            {
                userInfo ? <div className=''>

                    <div className='flex flex-col lg:flex-row md:flex-col justify-center items-centerlg:gap-10'>

                        <div className='lg:w-[80%] md:w-full flex flex-col rounded py-4 gap-10'>

                            <div className='w-full flex gap-4 md:gap-8 lg:gap-10'>
                                <div className='flex flex-col gap-2 p-4'>
                                    <img src={userInfo?.profile} alt="" className='w-[150px] h-[150px] border-2  object-fit' />
                                    {/* modal */}
                                    <button className="btn btn-sm w-32 capitalize text-white bg-blue-400 hover:bg-blue-500" onClick={() => document.getElementById('my_modal_3').showModal()}>Change Photo</button>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div className='w-full lg:w-[80%] h-full'>
                                                <label htmlFor="profile" className=' flex gap-2 items-end '>
                                                    <div>
                                                        <p className='text-base '>Your profile<span className='text-red-500'>*</span> </p>
                                                        <input
                                                            type='file'
                                                            name="photo"
                                                            className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-sm pt-[0.2rem]'
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                    <button className='btn btn-sm capitalize h-9 text-white bg-blue-400 hover:bg-blue-500 focus:outline-none' type='submit' onClick={tutorPictureUpdate}>Change</button>
                                                </label>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                                <div className="divider lg:divider-horizontal"></div>
                                <div className="w-full flex flex-col px-4 overflow-auto">
                                    <table className="w-full my-4" >
                                        <tr>
                                            <td className=''><span className='font-semibold'>Name:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Age:</span></td>
                                            <td className='text-gray-500'>{userInfo?.age} Years</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Current Status:</span></td>
                                            <td className='capitalize text-gray-500 flex items-center '>{userInfo?.currentStatus} &nbsp; {userInfo?.currentStatus === 'available' ? <div class=" h-[8px] w-[8px] badge-accent indicator-item rounded-full"></div> : <div class="h-[8px] w-[8px]  badge-error indicator-item rounded-full"></div>}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Preferable Class:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.preferableClass?.join(', ')}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Preferable Subject:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.preferableSubject?.join(', ')}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Preferable Location:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.preferableLocation}</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Experience:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.experience} Years</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Tuition Days</span></td>
                                            <td className='capitalize text-gray-500'> {userInfo?.tuitionDays} Days/Week</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Expected Salary:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.expectedSalary} Tk/Month</td>
                                        </tr>
                                        <tr>
                                            <td><span className='font-semibold'>Tuition Type:</span></td>
                                            <td className='capitalize text-gray-500'>{userInfo?.tuitionType?.join(', ')}</td>
                                        </tr>
                                    </table>
                                    <div className='flex gap-10 w-full overflow-x-auto' id='education'>
                                        <table className='w-full'>
                                            <th>Name Of Exam</th>
                                            <th>Institute</th>
                                            <th>Subject</th>
                                            <th>CGPA</th>
                                            <tr>
                                                <td className='capitalize text-gray-500'>{userInfo?.educationalQualication.eduName}</td>
                                                <td className='capitalize text-gray-500'>{userInfo?.educationalQualication.institute}</td>
                                                <td className='capitalize text-gray-500'>{userInfo?.educationalQualication.subject}</td>
                                                <td className='capitalize text-gray-500'>{userInfo?.educationalQualication.cgpa}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center gap-2'>
                                {userDetails?.userType === "tutor" ? <Link to={`/tutor/edit-profile/${userInfo?.email}`}>
                                    <button className='btn btn-sm capitalize text-white bg-blue-400 hover:bg-blue-500'>Edit Profile</button>
                                </Link> : <Link to={`/admin/edit-profile/${userInfo?.email}`}>
                                    <button className='btn btn-sm capitalize text-white bg-blue-400 hover:bg-blue-500'>Edit Profile</button>
                                </Link> }
                                <button onClick={handleDelete} className='btn btn-sm capitalize text-white bg-red-400 hover:bg-red-500'>Delete Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                    :
                    <div className="flex justify-center items-center h-[400px]">
                        <h2>Create a tutor profile first</h2>
                    </div>
            }
        </>
    );
};

export default ManageProfile;