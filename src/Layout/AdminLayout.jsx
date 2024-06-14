import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import './styles.css'
import { useState } from "react";
import { MdAnnouncement, MdDashboard, MdLogout, MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoMdFolder } from "react-icons/io";
import { TbCoinTaka, TbFolderOpen } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";


const navLinks = [
    {
        nav: "Dashboard",
        icon: MdDashboard,
        link: "/admin/adminDashboard",
    },
    {
        nav: "Payment Dashboard",
        icon: TbCoinTaka,
        link: "/admin/paymentDashboard",
        // link: "/admin/paymentDashboard",
    },
    {
        nav: "Manage Courses",
        icon: TbFolderOpen,
        link: "/admin/manageCourses",
    },
    {
        nav: "Manage Users",
        icon: FaUsers,
        link: "/admin/manageUsers",
    },
    {
        nav: "Manage TutorProfiles",
        icon: FaUserEdit,
        link: "/admin/manageTutorProfiles",
    },
    {
        nav: "Manage Tutions",
        icon: CiCircleInfo,
        link: "/admin/manageTuitions",
    }
];





const AdminLayout = () => {


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
                            <Link to={`${item.link}`} key={index}>
                                <div className="nav-links w-full"
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
                                        <div className="flex  w-full py-1 px-2 rounded-full gap-3 ">
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
                                <div className="flex  w-full py-1 px-2 rounded-full justify-start items-center gap-3 cursor-pointer" onClick={() => {
                                    userSignOut()
                                    navigate("/")
                                }} >
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
                    <div className="w-full flex justify-end items-center h-16 fixed z-30  bg-white shadow">
                        <div className="dropdown dropdown-end">
                            <div className={`${user && "dropdown mr-4 w-10 h-10 rounded-full flex justify-center items-center bg-[#0766AD] text-white"}`} tabIndex={0} role="button">
                                {user?.displayName && user.displayName.length > 0 ? (
                                    <>
                                        {user.displayName.charAt(0)}
                                        {user.displayName.split(" ")[1] && user.displayName.split(" ")[1].charAt(0)}
                                    </>
                                ) : null}
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 mr-6 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li><p>{user?.displayName}</p></li>
                                <li><p>{user?.email}</p></li>
                            </ul>
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


export default AdminLayout;