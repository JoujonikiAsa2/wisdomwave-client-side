import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import { TbCoinTaka } from "react-icons/tb";
import { IoHome, IoLogOut } from "react-icons/io5";
import { MdOutlineCreateNewFolder, MdOutlineManageAccounts, MdDashboard, MdOutlineAssignment, MdPeople, MdLogout } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";



// https://lucide.dev/icons/

const navLinks = [
    {
        nav: "Dashboard",
        icon: MdDashboard,
        link: "/instructor/instructorDashboard",
    },
    {
        nav: "Create Course",
        icon: MdOutlineCreateNewFolder,
        link: "/instructor/createCourse",
    },
    {
        nav: "Manage Courses",
        icon: MdOutlineManageAccounts,
        link: "/instructor/manageCourses",
    },
    {
        nav: "Announcements ",
        icon: TfiAnnouncement,
        link: "/instructor/announcements",
    },
    {
        nav: "Assignments",
        icon: MdOutlineAssignment,
        link: "/instructor/assignments/",
    },
    {
        nav: "Manage Classes",
        icon: SiGoogleclassroom,
        link: "/instructor/manageClasses",
    },
    {
        nav: "Payment Dashboard",
        icon: TbCoinTaka,
        link: "/instructor/paymentDashboard",
    },
    {
        nav: "Student Information",
        icon: MdPeople,
        link: "/instructor/studentInfo",
    },

];





const InstructorLayout = () => {
    const { userSignOut, user } = useAuth()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);

    console.log(user)

    return (

        <div className="w-full">
            <div className="flex w-full">
                <div
                    className="py-10 h-full flex flex-col border border-r-1 fixed overflow-y-auto lg:overflow-y-hidden overflow-x-hidden z-50 bg-gray-400 w-[3rem] " id="sidebar"
                >

                    <div className="logo-div flex space-x-4 w-full">
                        <img src={Logo} className="md:w-10 w-8 lg:w-10 " />
                        <h2 className="logo"><span className="text-[#5c802d] lato">Wisdom</span><span className="text-[#0766AD] lato">Wave</span></h2>
                    </div>

                    <div className="flex flex-col justify-start items-start space-y-2 mt-8 w-full ">
                        {navLinks.map((item, index) => (
                            <Link to={`${item.link}`}>
                                <div className="nav-links w-full" key={index}
                                >
                                    <div
                                        onClick={() => setActiveIndex(index)}
                                        className={
                                            "flex  w-full py-1 px-2 ml-[0.1rem] rounded-full justify-center items-center gap-2 " +
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
                        <div className="pt-6 flex flex-col justify-start items-start gap-2">

                            <div>
                                <Link to="/">
                                    <div className="nav-links w-full"
                                    >
                                        <div
                                            className={
                                                "flex  w-full py-1 px-2 rounded-full gap-3"
                                            }
                                        >
                                            <IoHome className="lg:text-xl text-lg" />
                                            <span className="navlink ">
                                                Home
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="nav-links w-full"
                            >
                                <div
                                    className={
                                        "flex  w-full py-1 px-2 rounded-full justify-start items-center gap-3"
                                    }
                                >
                                    <MdLogout className="lg:text-xl text-lg" />
                                    <span className="navlink ">
                                        Log Out
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col" id="content">
                    <div className="w-full flex justify-end items-center h-16 fixed z-30  bg-white">
                        <div className={`${user && "mr-4 w-10 h-10 rounded-full flex justify-center items-center bg-[#0766AD] text-white"}`}>
                            {user?.displayName && user.displayName.length > 0 ? (
                                <>
                                    {user.displayName.charAt(0)}
                                    {user.displayName.split(" ")[1] && user.displayName.split(" ")[1].charAt(0)}
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div className="w-full flex flex-col ml-[3rem] mt-[4rem] h-screen px-4">
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorLayout;