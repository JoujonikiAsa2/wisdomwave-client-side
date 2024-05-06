import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TutorLayout = () => {
    return (
        <div className='w-full flex justify-start '>
            <div className='w-56 border-r-2 bg-gray-300 h-screen fixed'>
                <Link to="/tutor/tutorDashboard">
                    hello
                </Link>
            </div>
            <div className=" ml-[14rem]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default TutorLayout;