import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

const Notifications = ({ handleClicked, clicked }) => {
    return (
        <div>
            <nav className="dropdown dropdown-end mr-2">
                <div tabIndex={0} onClick={handleClicked} className="hover:cursor-pointer">
                    <IoNotificationsOutline className="text-xl text-blue-600"></IoNotificationsOutline>
                    <span className="absolute text-sm bottom-2 left-5 text-red-400 dark:text-blue-600">2</span>
                </div>
                <div tabIndex={0} className={`${clicked == false ? "hidden" : "mt-8 z-[1] card card-compact dropdown-content w-72 bg-base-200 shadow"}`}>
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