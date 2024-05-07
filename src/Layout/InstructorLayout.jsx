import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useState } from "react";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import { TbCoinTaka } from "react-icons/tb";
import { IoHome  } from "react-icons/io5";
import { MdOutlineCreateNewFolder, MdOutlineManageAccounts, MdDashboard, MdOutlineAssignment, MdPeople } from "react-icons/md";
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
        nav: "Update Course",
        icon: FiEdit,
        link: "/instructor/updateCourse",
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

const otherLinks = [
    {
        nav: "Home",
        icon: IoHome,
        link: "/",
    }
];




const InstructorLayout = () => {
    const { userSignOut, user } = useAuth()
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);

    console.log(user)
   
    return (

        <div>
            <div className="flex ">
                <div
                    className="py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] fixed z-50" id="sidebar"
                >

                    <div className="logo-div flex space-x-4 w-full">
                        <img src={Logo} className="md:w-10 w-8 lg:w-10 ml-[0.6rem]" />
                        <h2 className="logo"><span className="text-[#5c802d] lato">Wisdom</span><span className="text-[#0766AD] lato">Wave</span></h2>
                    </div>

                    <div className="flex flex-col space-y-2 mt-12">
                        {navLinks.map((item, index) => (
                            <Link to={`${item.link}`}>
                                <div className="nav-links w-full" key={index}
                                >
                                    <div
                                        onClick={() => setActiveIndex(index)}
                                        className={
                                            "flex  w-full p-1 rounded-full justify-start items-center gap-2 " +
                                            (activeIndex === index
                                                ? "bg-[#94d476] text-white duration-500"
                                                : " text-black")
                                        }
                                    >

                                        <item.icon className="lg:text-2xl text-lg ml-[0.8rem]" />
                                        <span className="navlink">
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {
                            otherLinks.map((item) => <Link to={`${item.link}`}>
                                <div className="nav-links w-full pt-16"
                                >
                                    <div
                                        className={
                                            "flex  w-full p-2 rounded-full pt-20 gap-3"
                                        }
                                    >
                                        <item.icon className="lg:text-xl text-lg ml-[0.8rem]" />
                                        <span className="navlink ">
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>)
                        }
                    </div>
                </div>
                <div className="flex flex-col w-full fixed z-30">
                    <div className="w-full flex justify-end items-center h-16 pr-8">
                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#0766AD] text-white">
                            {user?.displayName && user.displayName.length > 0 ? (
                                <>
                                    {user.displayName.charAt(0)}
                                    {user.displayName.split(" ")[1] && user.displayName.split(" ")[1].charAt(0)}
                                </>
                            ) : null}
                        </div>
                    </div>
                    <div className="w-full  flex flex-col ml-[4rem]">
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