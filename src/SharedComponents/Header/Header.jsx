import { IoMdArrowDropdown } from "react-icons/io";
import { IoMenu, IoSearch } from "react-icons/io5";
import logo from '../../assets/Photos/LandingPage/logo_wave.png'
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Header = () => {

    const { user, userSignOut } = useAuth()
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    // Join navlinks
    const joinTypes = <>
        <nav>
            <NavLink to="/studentSignUp" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "black",
                };
            }}>Student</NavLink>
        </nav>
        <nav>
            <NavLink to="/instructorSignUp" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "black",
                };
            }}>Instructor</NavLink>
        </nav>
        <nav>
            <NavLink to="/tutorSignUp" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "black",
                };
            }}>Tutor</NavLink>
        </nav>
    </>

    // profile links
    const profileLinks = <>
        <>
            <h4 className="text-lg text-blue-500 font-bold">{user?.displayName}</h4>
            <nav>
                <NavLink to="/profile" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                    };
                }}>Profile</NavLink>
            </nav>
            <nav onClick={
                () => {
                    userSignOut()
                        .then(() => {
                            console.log("Go to login page")
                        })
                        .catch(error => console.log(error))
                }
            }>Log Out
            </nav>
        </>
    </>

    // student NavLink 

    const sNavLinks = <>
        <nav>
            <NavLink to="/" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "black",
                };
            }}>Home</NavLink>
        </nav>
        <nav>
            <NavLink to="/blog" style={({ isActive }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "red" : "black",
                };
            }}>Blog</NavLink>
        </nav>
        {
            user && <nav>
                <NavLink to="/myCourse" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                    };
                }}>My Courses</NavLink>
            </nav>
        }
        {
            user && <nav>
                <NavLink to="/findTutors" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                    };
                }}>Find/Become a Tutor</NavLink>
            </nav>
        }
        {
            user && <nav>
                <NavLink to="/notifications" style={({ isActive }) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        color: isActive ? "red" : "black",
                    };
                }}>Notifications</NavLink>
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
                        color: isActive ? "red" : "black",
                    };
                }}>Login</NavLink>
            </nav>
        }
    </>

    // join
    const join = <>
        {
            !user && <div className="dropdown dropdown-end">
                <label tabIndex={1} className="hover:cursor-pointer">
                    <nav>
                        <a>Join</a>
                    </nav>
                </label>

                {/* this part will be defferent for different types of user */}

                <div tabIndex={1} className="menu menu-sm dropdown-content mt-6 z-[1] bg-base-100 p-2 shadow rounded-box w-48 text-base text-black gap-2">
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
                    <div className="flex justify-center items-center gap-2 lg:text-xl md:text-xl xl:text-xl 2xl:text-2xl sm:text-lg font-bold">
                        <img src={logo} alt="" className="w-6 h-6 lg:w-10 lg:h-10 md:w-10 md:h-10 " />
                        <h2><span className="text-[#000000]">Wisdom</span><span className="text-[#0645B1]">Wave</span></h2>
                    </div>

                    {/* Middle search bar for large device*/}
                    <div className="lg:flex hidden md:hidden">
                        <div className="join">
                            <input className="input input-bordered join-item input-sm  text-sm " placeholder="Search" />
                            <button className="btn join-item rounded-r-lg btn-sm capitalize text-sm bg-[#8b9dbd] text-black">Search</button>
                        </div>
                    </div>
                </div>
                <div className="navbar-end text-black">
                    <div className="lg:hidden flex md:flex justify-center items-center gap-3">

                        {/* Search bar for small device */}
                        <div className="join" onClick={handleShow}>
                            <div className={`lg:hidden ${show == true ? 'flex md:flex justify-center items-center relative' : 'hidden'}`}>
                                <input className="input input-bordered input-sm w-32" placeholder="Search" />
                                <FaSearch className="absolute right-2">Search</FaSearch>
                            </div>
                            <FaSearch className={`lg:hidden ${show == true ? 'hidden' : 'flex md:felx'}`} onClick={handleShow}></FaSearch>
                        </div>
                        {/* Join for small and medium device */}
                        {join}

                        <div className="lg:hidden md:flex flex gap-3 justify-center items-center">

                            {/* Dropdown menu for small device */}
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="">
                                    <IoMenu></IoMenu>
                                </label>

                                {/* this part will be defferent for different types of user */}

                                <div tabIndex={0} className="menu menu-sm dropdown-content mt-8 z-[1] p-2 right-12 shadow bg-base-100 rounded-box w-48 text-base text-black">
                                    {/* Blog for small and medium device */}
                                    {sNavLinks}

                                    {/* Login for small and medium device */}
                                    {login}
                                </div>
                            </div>
                            {/* profile for small device*/}
                            {
                                user &&
                                <nav>
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={1} className="hover:cursor-pointer">
                                            <div className="avatar">
                                                <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={user?.photoURL} />
                                                </div>
                                            </div>
                                        </label>

                                        {/* this part will be defferent for different types of user */}

                                        <div tabIndex={1} className="menu menu-sm dropdown-content mt-6 z-[1] bg-base-100 p-2 shadow rounded-box w-48 text-base text-black gap-2">
                                            {profileLinks}
                                        </div>
                                    </div>
                                </nav>
                            }
                        </div>
                    </div>

                    {/* Navbar end for the large device */}
                    <div className="lg:flex hidden md:hidden justify-center items-center gap-6 text-base">

                        {/* Navlinks for large device */}
                        {sNavLinks}

                        {/* Join dropdown for large device */}
                        {join}

                        {/* Login for large device */}
                        <div>
                            {login}
                        </div>
                        {/* user profile for large device*/}
                        {
                            user &&
                            <nav>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={1} className="hover:cursor-pointer">
                                        <div className="avatar">
                                            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={user?.photoURL} />
                                            </div>
                                        </div>
                                    </label>

                                    {/* this part will be defferent for different types of user */}

                                    <div tabIndex={1} className="menu menu-sm dropdown-content mt-6 z-[1] bg-base-100 p-2 shadow rounded-box w-48 text-base text-black gap-2">
                                        {profileLinks}
                                    </div>
                                </div>
                            </nav>
                        }
                    </div>

                </div>
            </div>
            <div >

            </div>
        </div>
    );
};

export default Header;