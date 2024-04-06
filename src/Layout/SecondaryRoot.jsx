import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/Photos/LandingPage/logo_wave.png'

const SecondaryRoot = () => {
    return (
        <div className='w-full justify-start items-center px-[5vw] py-6'>
            <Link
                to="/">
                <div className="flex justify-center items-center gap-2 lg:text-2xl md:text-2xl xl:text-2xl 2xl:text-2xl text-lg w-52">
                    <img src={logo} alt="" className="w-6 h-6 lg:w-10 lg:h-10 md:w-10 md:h-10 " />
                    <h2><span className="text-[#5c802d]">Wisdom</span><span className="text-[#0766AD]">Wave</span></h2>
                </div>
            </Link>
            <Outlet></Outlet>
        </div>
    );
};

export default SecondaryRoot;