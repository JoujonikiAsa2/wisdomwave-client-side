import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { MdOutlineAddCircleOutline, MdOutlineManageAccounts, MdDashboard, MdFormatListBulleted, MdLogout } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { FiEdit } from "react-icons/fi";
import './styles.css'
import { IoIosSend } from "react-icons/io";

const TutorLayout = () => {

    const { userSignOut, user } = useAuth()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);


    const navLinks = [
        {
            nav: "Dashboard",
            icon: MdDashboard,
            link: "/tutor/tutorDashboard",
        },
        {
            nav: "Create Profile",
            icon: MdOutlineAddCircleOutline,
            link: "/tutor/createProfile",
        },
        {
            nav: "Manage Profile",
            icon: MdOutlineManageAccounts,
            link: `/tutor/manageProfile/${user?.email}`,
        },
        {
            nav: "Tuitons",
            icon: FiEdit,
            link: "/tutor/tuitions",
        },
        {
            nav: "Tuition Requests",
            icon: CiSquareQuestion,
            link: "/tutor/tuitionRequest",
        },
        {
            nav: "Sending Requests",
            icon: IoIosSend,
            link: "/tutor/sendingRequests",
        }
    ];

    console.log(user)

    return (

        <div className="w-full">
            <div className="flex w-full">
                <div
                    className="py-10 h-full flex flex-col  border-r-1 fixed overflow-y-auto lg:overflow-y-hidden overflow-x-hidden z-50 bg-[#b8e7a1] w-[4rem] " id="sidebar"
                >

                    <div className="logo-div flex space-x-4 w-full p-2">
                        <img src={Logo} className="md:w-10 w-8 lg:w-10 " />
                        <h2 className="logo"><span className="text-[#5c802d] lato">Wisdom</span><span className="text-[#0766AD] lato">Wave</span></h2>
                    </div>

                    <div className="flex flex-col justify-start items-start space-y-2 mt-8 w-full ">
                        {navLinks.map((item, index) => (
                            <Link to={`${item.link}`} key={index}>
                                <div className="nav-links w-full mx-[0.4rem] "
                                >
                                    <div
                                        onClick={() => setActiveIndex(index)}
                                        className={
                                            "flex  w-full py-1 px-2  hover:scale-95 rounded-full justify-center items-center gap-2 " +
                                            (activeIndex === index
                                                ? "bg-[#94d476] text-white duration-500"
                                                : " text-black")
                                        }
                                    >

                                        <item.icon className="lg:text-2xl text-lg " />
                                        <span className="navlink">
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <div className="divider"></div>

                        {/* others link */}
                        <div className="flex flex-col justify-start items-start space-y-2 mt-8 w-full ">
                            <div onClick={() => {
                                userSignOut()
                                navigate("/")
                            }}>
                                <div className="nav-links w-full mx-[0.4rem]"
                                >
                                    <div
                                        className={
                                            "flex  w-full py-1 px-2  hover:scale-95 rounded-full justify-center items-center gap-2 hover:cursor-pointer"
                                        }
                                    >

                                        <MdLogout className="lg:text-2xl text-lg " />
                                        <span className="navlink">
                                            Log Out
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col" id="content">
                    <div className="w-full flex justify-end items-center h-16 fixed z-30  bg-white shadow">
                        <div className="dropdown dropdown-end pr-4">
                            <div className={`${user && "dropdown  w-10 h-10 rounded-full flex justify-center items-center bg-[#0766AD] text-white"}`} tabIndex={0} role="button">
                                {user?.name.toUpperCase() && user.name.toUpperCase().length > 0 ? (
                                    <>
                                        {user.name.toUpperCase().charAt(0)}
                                        {user.name.toUpperCase().split(" ")[1] && user.name.toUpperCase().split(" ")[1].charAt(0)}
                                    </>
                                ) : null}
                            </div>
                            <ul tabIndex={0} className="mt-4 z-[1] p-2 mr-6 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72">
                                <li><p className="capitalize">{user?.name}</p></li>
                                <li><p>{user?.email}</p></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col ml-[2.8rem] mt-[4rem] h-screen px-8 w-[95%]">
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorLayout;