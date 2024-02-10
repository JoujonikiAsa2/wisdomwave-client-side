import React from 'react';
import { IoNotificationsCircle } from 'react-icons/io5';

const Notifications = ({ handleClicked, clicked }) => {
    return (
        <div>
            <nav className="dropdown dropdown-end">
                <div tabIndex={0} onClick={handleClicked} className="hover:cursor-pointer">
                    <div><IoNotificationsCircle className="text-3xl text-blue-600"></IoNotificationsCircle></div>
                    <span className="absolute badge bottom-4 text-red-400 dark:text-blue-600 bg-[#F3F3F3]">2</span>
                </div>
                <div tabIndex={0} className={`${clicked == false ? "hidden" : "mt-8 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"}`}>
                    <div className="card-body">
                        <p>You added a new course.</p>
                        <p>You have a assignment to submit.</p>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Notifications;