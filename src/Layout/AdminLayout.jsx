import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import {
    ArrowLeftRightIcon,
    BarChart3Icon,
    FilePen,
    FolderCog,
    BellPlus,
    LayoutDashboard,
    SquareCheckBig,
    SquarePlus,
    LaptopMinimal,
    AlignJustify
} from "lucide-react";
import { motion } from "framer-motion";

import RightArrowIcon from "../assets/rightArrow.svg";

const variants = {
    // todo: change expanded to 30% and nonexpanded to %6
    expanded: {
        width: "230px",
        backgroundColor: "#E1F0DA",
    },
    nonexpanded: { width: "3.5rem", backgroundColor: "#E1F0DA", },
};

const navLinks = [
    {
        nav: "Dashboard",
        icon: LayoutDashboard,
        link: "/instructor/instructorDashboard",
    },
    {
        nav: "Create Course",
        icon: SquarePlus,
        link: "/instructor/createCourse",
    },
    {
        nav: "Manage Course",
        icon: FolderCog,
        link: "/instructor/manageCourse",
    },
    {
        nav: "Update Course",
        icon: FilePen,
        link: "/instructor/updateCourse",
    },
    {
        nav: "Announcement ",
        icon: BellPlus,
        link: "/instructor/announcement",
    },
    {
        nav: "Assignment",
        icon: SquareCheckBig,
        link: "/instructor/assignment/",
    },
    {
        nav: "Manage Classes",
        icon: LaptopMinimal,
        link: "/instructor/manageClasses",
    }
];

const otherLinks = [
    {
        nav: "Home",
        icon: AlignJustify,
        link: "/",
    }
];




const AdminLayout = () => {
    const { userSignOut } = useAuth()
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    return (

        <div>
            <div className="lg:flex md:flex hidden fixed ">
                <motion.div
                    animate={isExpanded ? "expanded" : "nonexpanded"}
                    variants={variants}
                    className={
                        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] fixed" +
                        (isExpanded ? " px-4 duration-1000 fixed" : " px-2 duration-1000")
                    }
                >
                    <div
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="cursor-pointer absolute -right-4 bottom-10 rounded-full w-8 h-8 bg-[#84d45f] flex justify-center items-center"
                    >
                        <img src={RightArrowIcon} className="w-2" />
                    </div>

                    <div className="logo-div flex space-x-4 items-center">
                        <img src={Logo} className="md:w-8 w-4 lg:w-8 " />
                        <span className={!isExpanded ? "hidden" : "block text-2xl"}>WisdomWave</span>
                    </div>

                    <div className="flex flex-col space-y-2 mt-12">
                        {navLinks.map((item, index) => (
                            <Link to={`${item.link}`}>
                                <div className="nav-links w-full" key={index}
                                >
                                    <div
                                        onClick={() => setActiveIndex(index)}
                                        className={
                                            "flex space-x-3 w-full p-2 rounded " +
                                            (activeIndex === index
                                                ? "bg-[#94d476] text-white"
                                                : " text-black") +
                                            (!isExpanded ? " pl-3" : "")
                                        }
                                    >
                                        <item.icon className="md:w-6 w-4" />
                                        <span className={!isExpanded ? "hidden" : "block"}>
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {
                            otherLinks.map((item) => <Link to={`${item.link}`}>
                                <div className="nav-links w-full pt-10"
                                >
                                    <div
                                        className={
                                            "flex  w-full p-2 rounded pt-20 gap-3"
                                        }
                                    >
                                        <item.icon className="md:w-6 w-4" />
                                        <span className={!isExpanded ? "hidden" : "block"}>
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>)
                        }
                    </div>
                </motion.div>
                <div className="w-full ml-[3.5rem]">
                    <Outlet />
                </div>
            </div>
            <div className="lg:hidden md:hidden flex">
                <motion.div
                    animate={isExpanded ? "expanded" : "nonexpanded"}
                    variants={variants}
                    className={
                        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] fixed" +
                        (isExpanded ? " px-5 fixed" : " px-2 duration-500")
                    }
                >
                    <div
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="cursor-pointer absolute -right-4 bottom-10 rounded-full w-8 h-8 bg-[#84d45f] flex justify-center items-center"
                    >
                        <img src={RightArrowIcon} className="w-2" />
                    </div>

                    <div className="logo-div flex space-x-4 items-center">
                        <img src={Logo} className="md:w-8 w-4 lg:w-8 ml-2" />
                        <span className={!isExpanded ? "hidden" : "block text-2xl"}>WisdomWave</span>
                    </div>

                    <div className="flex flex-col space-y-2 mt-8">
                        {navLinks.map((item, index) => (
                            <Link to={`${item.link}`}>
                                <div className="nav-links w-full" key={index}
                                >
                                    <div
                                        onClick={() => setActiveIndex(index)}
                                        className={
                                            "flex  w-full p-2 rounded " +
                                            (activeIndex === index
                                                ? "bg-[#94d476] text-white"
                                                : " text-black") +
                                            (!isExpanded ? " pl-2" : "")
                                        }
                                    >
                                        <item.icon className="md:w-4 w-4" />
                                        <span className={!isExpanded ? "hidden" : "block"}>
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {
                            otherLinks.map((item) => <Link to={`${item.link}`}>
                                <div className="nav-links w-full pt-10"
                                >
                                    <div
                                        className={
                                            "flex  w-full p-2 rounded pt-20 gap-3"
                                        }
                                    >
                                        <item.icon className="md:w-6 w-4" />
                                        <span className={!isExpanded ? "hidden" : "block"}>
                                            {item.nav}
                                        </span>
                                    </div>
                                </div>
                            </Link>)
                        }

                    </div>
                </motion.div>
                <div className="w-full ml-[3.5rem]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;