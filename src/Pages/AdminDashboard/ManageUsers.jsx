import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/api/users')
            .then(res => {
                setUsers(res.data.data)
                console.log(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    const localHandleSearch = (e) => {
        e.preventDefault()
        const searchString = e.target.search.value
        console.log("String", searchString)

        axiosPublic.get(`/api/user/${searchString}`)
            .then(res => {
                console.log(res.data.data)
                if(res.data.data !== undefined || res.data.data !== null){
                    setUsers(res.data.data)
                }
                else{
                    setUsers([])
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDelete = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            width: 300
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/api/user/${email}`)
                    .then(res => {
                        console.log(res.data.data)
                        const filteredUsers = users.filter(user => user.email !== email)
                        setUsers(filteredUsers)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            width: 300
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }

    const handleMakeAdmin = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make admin!",
            width: 300
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/api/user/${email}`)
                    .then(res => {
                        console.log(res.data.data)
                        const filteredUsers = users.filter(user => user.email !== email)
                        setUsers(filteredUsers)
                        Swal.fire({
                            title: "Added!",
                            text: "This user is an admin now.",
                            icon: "success",
                            width: 300
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });
    }

    return (
        <div>
            <DashboardTitle title="Manage Users" subTitle="Manage all users available on this platform" />
            <div className="w-full flex justify-center items-center pb-8">
                <form action="" onSubmit={(e) => localHandleSearch(e)} className='lg:w-[40%] md:w-[50%] w-[60%] flex justify-center items-center mr-2'>
                    <div className="join w-full ">
                        <input type="email" name="search" className="input input-bordered join-item w-full input-sm bg-[#F3F3F3] focus:outline-none placeholder:text-[#cac9c9] focus:placeholder:text-[#949292] text-black" 
                        placeholder="Search user by email" />
                        <button type="submit" className=" py-[0.2rem] px-2 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] border-2 border-none text-white text-thin rounded-none rounded-r-lg text-sm">Search</button>
                    </div>
                </form>
                <button onClick={() => setUsers(users)} className='btn btn-sm bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] capitalize text-white'>All</button>
            </div>
            <div className="overflow-x-auto">
                <table className='table '>
                    <thead>
                        <tr>
                            <th className='text-base'>Name</th>
                            <th className='text-base'>Email</th>
                            <th className='text-base'>Role</th>
                            <th className='text-base'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users !== null ? users.map(user => <tr>
                                <td className='capitalize'>{user?.name}</td>
                                <td >{user?.email}</td>
                                <td className='capitalize'>{user?.userType}</td>
                                <td>
                                    <div className='flex lg:flex-row flex-col gap-4'>
                                        <button className='btn btn-error btn-sm ml-3 capitalize text-white lg:h-6 h-14 ' 
                                        onClick={() => handleDelete(user?.email)}>Delete</button>
                                        {user.userType !== "admin" && <button className='btn btn-success btn-sm ml-3 capitalize text-white lg:h-6 h-14 '
                                        onClick={() => handleMakeAdmin(user?.email)}>Make admin</button> }
                                    </div>
                                </td>
                            </tr>) : <tr>
                                <td colSpan={4} className='text-center text-lg'>No users found</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ManageUsers;