import React from 'react';
import { Toaster } from 'react-hot-toast';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useDiscussions from '../../hooks/useDiscussions';
import Loader from '../../SharedComponents/Loader/Loader';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageDiscussions = () => {

    const { discussions, isLoading, refech} = useDiscussions()
    const axiosPublic = useAxiosPublic()

    console.log(discussions)

    if (isLoading) {
        return <Loader></Loader>
    }

    const searchDiscussion = (e) => {
        e.preventDefault()
        const searchString = e.target.search.value
        console.log(searchString)
    }

    const deleteDiscussion = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/api/discussions/${id}`)
                    .then((res) => {
                        console.log(res.data)
                        Swal.fire(
                            'Deleted!',
                            'Discussion has been deleted.',
                            'success'
                        )
                        setTimeout(() => {
                            refech()
                        }, 1000);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        })
    }

    return (
        <div className='z-10'>
            <Toaster position='top-center' reverseOrder={false} />
            <DashboardTitle title="Manage Discussions" subTitle="Manage all the available discussions as Admin " />
            <div className="w-full flex justify-center items-center pb-8">
                <form action="" onSubmit={(e) => searchDiscussion(e)} className='lg:w-[40%] md:w-[50%] w-[60%] flex justify-center items-center mr-2'>
                    <div className="join w-full ">
                        <input type="email"
                            name="search"
                            className="input input-bordered join-item w-full input-sm bg-[#F3F3F3] focus:outline-none placeholder:text-[#cac9c9] focus:placeholder:text-[#949292] text-black"
                            placeholder="Search discussion by useremail" />
                        <button type="submit" className=" py-[0.2rem] px-2 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] border-2 border-none text-white text-thin rounded-none rounded-r-lg text-sm">Search</button>
                    </div>
                </form>
            </div>
            {
                discussions.length > 0 ?
                    <div className="grid grid-cols-1 justify-center items-center justify-items-center gap-4 mx-[5vw] pb-8">
                        {discussions.map((discussion) => (
                            <div key={discussion._id} className='card lg:w-[50rem] lg:h-48 md:h-48 h-64 shadow-lg p-4 space-y-2'>
                                <div className='flex lg:flex-row md:flex-row flex-col-reverse justify-between gap-4 lg:items-center md:items-center items-start'>
                                    <div className='flex gap-2 items-center'>
                                        <img src={discussion.userProfile} alt="" className='w-8 h-8 rounded-full' />
                                        <p className='text-gray-500'>{discussion.userName}</p>
                                    </div>
                                    <p className='text-gray-400'><span>Posting Time:</span>{discussion.date.split("T")[0]}</p>
                                </div>
                                <p><span>Title:</span>{discussion.discussionTitle.slice(0, 40)}...</p>
                                <p className='text-gray-500'><span>Email:</span>{discussion.email}</p>
                                <div className='flex gap-2 justify-end text-gray-400'>
                                    <p>Likes: ({discussion.likes})</p>
                                    <p>Comments: ({discussion?.comments.length})</p>
                                </div>
                                <div className='flex justify-end gap-2 capitalize'>
                                    <Link to={`/admin/viewDiscussion/${discussion._id}`}>
                                        <button className='btn btn-xs btn-outline border-blue-300 hover:border-none hover:bg-green-300'>View</button>
                                    </Link>
                                    <button onClick={() => deleteDiscussion(discussion._id)} className='btn btn-xs btn-outline border-blue-300 hover:border-none hover:bg-red-300'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div> : <p className='text-center text-red-500'>No discussions found</p>
            }
        </div>
    );
};

export default ManageDiscussions;