import { IoMenu, IoNotificationsCircle, IoSearch } from "react-icons/io5";
import logo from '../../assets/Photos/LandingPage/logo_wave.png'
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Profile from "./Profile";
import Notifications from "./Notifications";

const Header = () => {

    const { user, userSignOut } = useAuth()
    const [show, setShow] = useState(false)
    const [clicked, setClicked] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    const handleClicked = () => {
        setClicked(!clicked)
    }

    // Join navlinks
    const joinTypes = <>
        <nav>
            <NavLink to="/studentSignUp" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "2px solid #0766AD" : ""
                };
            }} className="dark:text-black">Student</NavLink>
        </nav>
        <nav>
            <NavLink to="/instructorSignUp" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "2px solid #0766AD" : ""
                };
            }} className="dark:text-black">Instructor</NavLink>
        </nav>
        <nav>
            <NavLink to="/tutorSignUp" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "2px solid #0766AD" : ""
                };
            }} className="dark:text-black">Tutor</NavLink>
        </nav>
    </>

    // profile links
    const profileLinks = <>
        <>
            <nav>
                <NavLink to="/createBlog" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "2px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Create Discussion</NavLink>
            </nav>
            <nav>
                <NavLink to="/mytuitions" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "2px solid #0766AD" : ""
                    };
                }} className="dark:text-black">My Tuitions</NavLink>
            </nav>
            <nav>
                <NavLink to="/notices" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "2px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Notices</NavLink>
            </nav>
            <nav>
                <NavLink to="/assignments" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "2px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Asignments</NavLink>
            </nav>
            <nav onClick={
                () => {
                    userSignOut()
                        .then(() => {
                            console.log("Go to login page")
                        })
                        .catch(error => console.log(error))
                }
            } className="hover:cursor-pointer">Log Out
            </nav>
        </>
    </>

    // student NavLink 

    const sNavLinks = <>
        <nav className="">
            <NavLink to="/" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "2px solid #0766AD" : ""
                };
            }} className="dark:text-black">Home</NavLink>
        </nav>
        <nav className="">
            <NavLink to="/blogs" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "2px solid #0766AD" : ""
                };
            }} className="dark:text-black">Discussions Forum</NavLink>
        </nav>
        {
            user && <nav className="">
                <NavLink to="/myCourse" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "2px solid #0766AD" : ""
                    };
                }} className="dark:text-black">My Courses</NavLink>
            </nav>
        }
    </>

    // login navbar
    const login = <>
        {
            !user && <nav>
                <NavLink to="/login" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "2px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Login</NavLink>
            </nav>
        }
    </>

    // join
    const join = <>
        {
            !user && <div className="dropdown dropdown-end">
                <label tabIndex={1} className="hover:cursor-pointer" onClick={handleClicked}>
                    <nav>
                        <a>Join</a>
                    </nav>
                </label>

                {/* this part will be defferent for different types of user */}

                <div tabIndex={1} className={`${clicked == false ? "hidden" : "menu menu-sm dropdown-content mt-6 z-[1] bg-base-100 p-2 shadow rounded-box w-48 text-base text-black gap-2"}`}>
                    {joinTypes}
                </div>
            </div>
        }
    </>

    return (
        <div className="flex flex-col">
            <div className="navbar bg-white shadow-xl  lora font-semibold md:px-[5vw] lg:px-[5vw] max-w-[96rem] fixed z-50 ">

                {/* this is common part for all users */}

                <div className="navbar-start gap-4">

                    {/* Logo and name of the website */}
                    <Link to="/">
                        <div className="flex justify-center items-center gap-2 lg:text-xl md:text-xl xl:text-xl 2xl:text-2xl sm:text-lg font-bold">
                            <img src={logo} alt="" className="w-6 h-6 lg:w-10 lg:h-10 md:w-10 md:h-10 " />
                            <h2><span className="text-[#5c802d]">Wisdom</span><span className="text-[#0766AD]">Wave</span></h2>
                        </div>
                    </Link>

                    {/* Middle search bar for large device*/}
                    <div className="lg:flex hidden md:hidden">
                        <div className="join">
                            <input className="input input-bordered join-item input-sm bg-[#F3F3F3]" placeholder="Search Course" />
                            <button className="btn join-item btn-sm capitalize bg-[#0766AD] text-white">Search</button>
                        </div>
                    </div>
                </div>
                <div className="navbar-end text-black">
                    <div className="lg:hidden flex md:flex justify-center items-center gap-3">

                        {/* Search bar for small device */}
                        <Link to='/searchPage'>
                            <IoSearch className="lg:hidden flex md:felx text-2xl" onClick={handleShow}></IoSearch>
                        </Link>
                        {/* Join for small and medium device */}
                        {join}

                        <div className="lg:hidden md:flex flex gap-3 justify-center items-center">
                            {
                                user &&
                                <Notifications handleClicked={handleClicked} clicked={clicked}></Notifications>
                            }

                            {/* Dropdown menu for small device */}
                            <div className="dropdown dropdown-end" >
                                <label tabIndex={3} className="" onClick={handleClicked}>
                                    <IoMenu className="text-2xl"></IoMenu>
                                </label>
                                {/* this part will be defferent for different types of user */}

                                <div tabIndex={1} className={`${clicked == false ? "hidden" : "menu menu-sm dropdown-content mt-7 z-[1] bg-gray-200 shadow rounded-box w-48 text-base text-black gap-2"}`}>
                                    <div className='p-2'>
                                        <h4 className=" text-base text-[#0766AD] font-bold capitalize">{user?.displayName}</h4>
                                        <hr className='my-2 h-1 bg-[#0766AD]' />
                                        <div className='space-y-2'>
                                            <nav>
                                                <NavLink to="/profile" style={({ isActive }) => {
                                                    return {
                                                        fontWeight: isActive ? "bold" : "",
                                                        color: isActive ? "#0766AD" : "",
                                                        borderBottom: isActive ? "2px solid #0766AD" : ""
                                                    };
                                                }} className="dark:text-black">Your Profile</NavLink>
                                            </nav>
                                            {sNavLinks}
                                            {profileLinks}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Navbar end for the large device */}
                    <div className="lg:flex hidden md:hidden justify-center items-center gap-4 text-base">

                        {/* Navlinks for large device */}
                        {sNavLinks}
                        {
                            user &&
                            <nav className="dropdown dropdown-end">
                                <div tabIndex={0} onClick={handleClicked} className="hover:cursor-pointer">
                                    <div><IoNotificationsCircle className="text-3xl text-[#0766AD]"></IoNotificationsCircle></div>
                                    <span className="absolute badge bottom-4 left-2 bg-white text-[#29ADB2] font-bold">2</span>
                                </div>
                                <div tabIndex={0} className={`${clicked == false ? "hidden" : "mt-6 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"}`}>
                                    <div className="card-body">
                                        <p>You added a new course.</p>
                                        <p>You have a assignment to submit.</p>
                                    </div>
                                </div>
                            </nav>
                        }

                        {/* Join dropdown for large device */}
                        {join}

                        {/* Login for large device */}
                        {login}
                        {/* user profile for large device*/}
                        {
                            user &&
                            <>
                                <Profile handleClicked={handleClicked} clicked={clicked} profileLinks={profileLinks}></Profile>
                            </>
                        }
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Header;