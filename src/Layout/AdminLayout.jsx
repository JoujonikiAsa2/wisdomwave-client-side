import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/Photos/LandingPage/logo_wave.png";
import './styles.css'
import { useState } from "react";
import { MdAnnouncement, MdDashboard, MdManageAccounts, MdOutlineManageAccounts } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoMdFolder } from "react-icons/io";
import { TbCoinTaka, TbFolderOpen } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";


const navLinks = [
    {
        nav: "Dashboard",
        icon: MdDashboard,
        link: "/admin/adminDashboard",
    },
    {
        nav: "Payment Dashboard",
        icon: TbCoinTaka,
        link: "/admin/adminDashboard"
        // link: "/admin/paymentDashboard",
    },
    {
        nav: "Manage Courses",
        icon: TbFolderOpen,
        link: "/instructor/manageCourse",
    },
    {
        nav: "Manage Users",
        icon: MdOutlineManageAccounts,
        link: "/instructor/manageCourse",
    },
    {
        nav: "Announcement ",
        icon: TfiAnnouncement,
        link: "/instructor/announcement",
    }
];

const otherLinks = [
    {
        nav: "Home",
        icon: IoHome,
        link: "/",
    }
];




const AdminLayout = () => {

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

                        {
                            otherLinks.map((item) => <Link to={`${item.link}`}>
                                <div className="nav-links w-full pt-56"
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
                <div className="w-full ml-[4rem]">
                    <div className="w-full fixes">
                        Profile
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;