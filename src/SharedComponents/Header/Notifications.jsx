import React, { useEffect, useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const Notifications = ({ handleClicked, clicked }) => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()
    const [count, setCount] = useState(0)
    const [unreadAnnouncement, setUnreadAnnouncement] = useState([])

    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/announcements/${user?.email}`)
            // console.log(res.data)
            return res.data.data
        }
    })

    useEffect(()=>{
        axiosPublic.get(`/api/announcements/isRead/email/${user?.email}`)
        .then((res)=>{
            setCount(res.data.total)
            setUnreadAnnouncement(res.data.data)
        })
    },[user?.email])

    const handleReadNotification = () => {
        // update the isRead status 
        axiosPublic.patch(`/api/announcements/${user?.email}`)
        .then((res)=>{
            if(res.modifiedCount > 0){
                setCount(0)
            }
        })
        handleClicked(!clicked)
    }
    
    refetch()
    // console.log(announcements, unreadAnnouncement)
    return (
        <div>
            <nav className="dropdown dropdown-end mr-2 flex justify-center items-center">
                <div tabIndex={0} onClick={handleReadNotification} className="hover:cursor-pointer ">
                    <IoNotificationsOutline className="text-xl text-blue-600"></IoNotificationsOutline>
                    <div className="absolute text-sm bottom-2 left-2 text-white dark:text-white bg-blue-400 rounded-full w-6 h-6 flex justify-center items-center">{count > 0 ? count : 0}</div>
                </div>
                <div tabIndex={0} className={`${clicked == false ? "hidden" : "mt-[19rem] z-[1] card card-compact dropdown-content w-72 bg-base-200 shadow"}`}>
                    <div className="card-body">
                        {
                           announcements.map(announcement =><div className='w-full flex justify-between items-center'>
                               <p className={` text-sm font-mediumt capitalize ${count !== 0 ? 'text-blue-600' : "text-black"}`}>{announcement?.details}</p>
                            </div>) 
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Notifications;