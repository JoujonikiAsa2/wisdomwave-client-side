import React, { useEffect, useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';

const Notifications = ({ handleClicked, clicked }) => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [count, setCount] = useState(0)
    const [announcements, setAnnouncements] = useState([])
    const [unreadAnnouncement, setUnreadAnnouncement] = useState([])

    useEffect(() => {
        axiosPublic.get(`/api/announcements/${user?.email}`)
            .then((res) => {
                console.log(res.data.data)
                setAnnouncements(res.data.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [user?.email, announcements])

    useEffect(() => {
        axiosPublic.get(`/api/announcements/isRead/email/${user?.email}`)
            .then((res) => {
                setCount(res.data.total)
                console.log(res.data.data)
                setUnreadAnnouncement(res.data.data)
            })
    }, [user?.email, unreadAnnouncement])


    const handleReadNotification = () => {
        // update the isRead status 
        axiosPublic.patch(`/api/announcements/${user?.email}`)
            .then((res) => {
                if (res.modifiedCount > 0) {
                    setCount(0)
                }
            })
        handleClicked(!clicked)
    }

    const announcementView = (announcement) => {
        Swal.fire({
            html: `
                    <div style="text-align: start; font-size: 14px;">
                        <p class=""><strong>${announcement.title}</strong> (From Instructor: <span class="text-blue-600">${announcement.instructorName}</span>)</p>
                        <p style=" line-height: 0.5;">
                            <br>${announcement.details}
                        </p>
                    </div>
                    `,
            showConfirmButton: true,
            confirmButtonText: 'Close',
            customClass: {
                confirmButton: 'btn btn-sm bg-blue-300 capitalize text-black font-thin'
            },
            buttonsStyling: false
        });
}
    console.log(announcements, unreadAnnouncement)
    return (
        <div>
            <nav className="dropdown dropdown-end mr-2 flex justify-center items-center">
                <div tabIndex={0} onClick={handleReadNotification} className="hover:cursor-pointer ">
                    <IoNotificationsOutline className="text-xl text-blue-600"></IoNotificationsOutline>
                    <div className="absolute text-sm bottom-2 left-2 text-white dark:text-white bg-blue-400 rounded-full w-6 h-6 flex justify-center items-center">{count > 0 ? count : 0}</div>
                </div>
                <div tabIndex={0} className="top-[3.2rem] z-[1] card  dropdown-content w-72 bg-base-200 shadow ">
                    <div className="w-72 p-2">
                        {
                            announcements.length > 0 ? announcements.map(announcement => <div className='px-2' key={announcement?._id} >
                                <div onClick={() => announcementView(announcement)}>
                                    <p className='hover:cursor-pointer'>{announcement?.instructorName}: {announcement?.title.slice(0, 20)}...</p>
                                </div>

                            </div>) : <div className='h-full w-full flex justify-center items-center '>No Announcements</div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Notifications;