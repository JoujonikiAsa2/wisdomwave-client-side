import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import { TbCoinTaka } from "react-icons/tb";
import { IoHome, IoLogOut } from "react-icons/io5";
import { MdOutlineCreateNewFolder, MdOutlineManageAccounts, MdDashboard, MdOutlineAssignment, MdPeople, MdLogout, MdOutlineAssignmentInd } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { SiGoogleclassroom } from "react-icons/si";
import { Home } from "lucide-react";



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
        nav: "Manage Certification",
        icon: MdOutlineAssignmentInd,
        link: "/instructor/manageCertification",
    },
    {
        nav: "Announcements ",
        icon: TfiAnnouncement,
        link: "/instructor/announcements",
    },
    {
        nav: "Manage Classes",
        icon: SiGoogleclassroom,
        link: "/instructor/manageClasses",
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
            <div className="flex w-full ">
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
                            <Link to="/">
                                <div className="nav-links w-full mx-[0.4rem] "
                                >
                                    <div
                                        className={
                                            "flex  w-full py-1 px-2  hover:scale-95 rounded-full justify-center items-center gap-2 "
                                        }
                                    >

                                        <IoHome className="lg:text-2xl text-lg " />
                                        <span className="navlink">
                                            Home
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <div onClick={() => {
                                userSignOut()
                                navigate("/")
                            }}>
                                <div className="nav-links w-full mx-[0.4rem]"
                                >
                                    <div
                                        className={
                                            "flex  w-full py-1 px-2  hover:scale-95 rounded-full justify-center items-center gap-2 "
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

export default InstructorLayout;