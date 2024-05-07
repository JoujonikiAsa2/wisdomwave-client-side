import { Link, Outlet } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { MdOutlineAddCircleOutline, MdOutlineManageAccounts, MdDashboard, MdFormatListBulleted } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { FiEdit } from "react-icons/fi";


const navLinks = [
    {
        nav: "Dashboard",
        icon: MdDashboard,
        link: "/tutor/tutorDashboard",
    },
    {
        nav: "Create Profile",
        icon: MdOutlineAddCircleOutline,
        link: "/tutor/createTutorProfile",
    },
    {
        nav: "Manage Profile",
        icon: MdOutlineManageAccounts,
        link: "/tutor/manageTutor",
    },
    {
        nav: "Tuitons",
        icon: FiEdit,
        link: "/tutor/tuitions",
    },
    {
        nav: "Tuition Request",
        icon: CiSquareQuestion,
        link: "/tutor/tuitionRequest",
    },
    {
        nav: "My tuitions",
        icon: MdFormatListBulleted,
        link: "/tutor/myTuitons/",
    }
];
const otherLinks = [
    {
        nav: "Home",
        icon: IoHome,
        link: "/",
    }
];



const TutorLayout = () => {

    const { userSignOut } = useAuth()
    const [activeIndex, setActiveIndex] = useState(0);

    return (

        <div>
            <div className="flex  fixed ">
                <div
                    className="py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] fixed" id="sidebar"
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

                        <div>
                            {
                            otherLinks.map((item) => <Link to={`${item.link}`}>
                                <div className="nav-links w-full pt-64 "
                                >
                                    <div
                                        className={
                                            "flex  w-full p-2 rounded-full gap-3"
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
                </div>
                <div className="w-full ml-[4rem]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default TutorLayout;