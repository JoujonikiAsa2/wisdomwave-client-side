import React from 'react';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const Profile = ({ handleClicked, clicked, profileLinks }) => {
    const { user } = useAuth()
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={1} className="hover:cursor-pointer" onClick={handleClicked}>
                <div className="avatar">
                    <div className="w-10 h-10 rounded-full border-2 border-[#0766AD]">
                        <img src={user?.photoURL} className='w-full h-full rounded-full' alt='image'/>
                    </div>
                </div>
            </label>

            {/* this part will be defferent for different types of user */}

            <div tabIndex={1} className={`${clicked == false ? "hidden" : "menu menu-sm dropdown-content mt-6 z-[1] bg-base-100 shadow rounded-box w-48 text-base text-black gap-2"}`}>
                <div className='p-2'>
                    <h4 className=" text-base text-[#0766AD] font-bold capitalize">{user?.displayName}</h4>
                    <hr className='my-2 h-1 bg-[#0766AD]' />
                    <nav className='pb-3'>
                        <NavLink to="/profile" style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isActive ? "red" : "black",
                                borderBottom: isActive ? "2px solid red" : ""
                            };
                        }}>Your Profile</NavLink>
                    </nav>
                    <div className='space-y-2'>
                        {profileLinks}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;