import { IoMenu, IoSearch } from "react-icons/io5";
import logo from '../../assets/Photos/LandingPage/logo_wave.png'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Profile from "./Profile";
import Notifications from "./Notifications";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Header = ({ handleSearch }) => {

    const axiosPublic = useAxiosPublic()
    const { user, userSignOut } = useAuth()
    const [show, setShow] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate()
    // console.log(user)

    // Handle the navbar color
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            setIsScrolled(scrollY >= 120);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Helps to show the search bar on click( Small device )
    const handleShow = () => {
        setShow(!show)
    }

    // set the clicked variable true, if any element is clicked
    const handleClicked = () => {
        setClicked(!clicked)
    }

    // handle searching
    const localHandleSearch = (e) => {
        e.preventDefault()
        const form = e.target
        const searchString = e.target.search.value
        handleSearch(searchString)
        console.log("String", searchString)
        form.reset()
    }
    // Join dropdown's navlinks
    const joinTypes = <>
        <nav>
            <NavLink to="/studentSignUp" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Student</NavLink>
        </nav>
        <nav>
            <NavLink to="/instructorSignUp" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Instructor</NavLink>
        </nav>
        <nav>
            <NavLink to="/tutorSignup" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Tutor</NavLink>
        </nav>
    </>


    // profile links for logged in user
    const profileLinks = <>
        {
            user && <>
                {user?.userType === 'student' && <nav className="">
                    <NavLink to="/allCourses" style={({ isActive }) => {
                        return {
                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">All Courses</NavLink>
                </nav>}
                {user?.userType === 'instructor' && <nav className="">
                    <NavLink to="/allCourses" style={({ isActive }) => {
                        return {
                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">All Courses</NavLink>
                </nav>}
                {user === null && <nav className="">
                    <NavLink to="/allCourses" style={({ isActive }) => {
                        return {
                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">All Courses</NavLink>
                </nav>}
                {user?.userType === 'admin' && <nav className="">
                    <NavLink to="/allCourses" style={({ isActive }) => {
                        return {
                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">All Courses</NavLink>
                </nav>}
                {user?.userType === 'student' && <nav>
                    <NavLink to="/createDiscussion" style={({ isActive }) => {
                        return {

                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">Create Discussion</NavLink>
                </nav>}

                {user?.userType === 'student' && <nav>
                    <NavLink to="/myTuitions" style={({ isActive }) => {
                        return {

                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">My Tuitions</NavLink>
                </nav>}
                {user?.userType === 'student' && <nav>
                    <NavLink to="/createTuition" style={({ isActive }) => {
                        return {

                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">Create Tuition</NavLink>
                </nav>}
                {user?.userType === 'student' && <nav>
                    <NavLink to="/requestedTuitions" style={({ isActive }) => {
                        return {

                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">Requested Tuition</NavLink>
                </nav>}

                {
                    user?.userType === "admin" && <nav>
                        <NavLink to="/tuitions" style={({ isActive }) => {
                            return {

                                color: isActive ? "#0766AD" : "",
                                borderBottom: isActive ? "1px solid #0766AD" : ""
                            };
                        }} className="dark:text-black">Tuitions</NavLink>
                    </nav>
                }
                {/* 
                <nav>
                    <NavLink to="/assignments" style={({ isActive }) => {
                        return {

                            color: isActive ? "#0766AD" : "",
                            borderBottom: isActive ? "1px solid #0766AD" : ""
                        };
                    }} className="dark:text-black">Asignments</NavLink>
                </nav> */}
                <nav onClick={
                    () => {
                        userSignOut()
                            .then(() => {
                                toast.success('Successfully Logged Out!', {
                                    duration: 1000,
                                })
                                navigate('/login')
                            })
                            .catch(error => console.log(error))
                    }
                } className="hover:cursor-pointer">Log Out
                </nav>
            </>
        }
    </>

    // student NavLinks for all user 

    const sNavLinks = <>
        <nav>
            <NavLink to="/" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    width: "3px",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Home</NavLink>
        </nav>
        {
            user?.userType === "student" && <nav>
                <NavLink to="/findTutors" style={({ isActive }) => {
                    return {

                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Find Tutors</NavLink>
            </nav>
        }
        {
            user?.userType === "admin" && <nav>
                <NavLink to="/findTutors" style={({ isActive }) => {
                    return {

                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Tutors</NavLink>
            </nav>
        }
        {user === null && <nav>
            <NavLink to="/findTutors" style={({ isActive }) => {
                return {

                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Find Tutors</NavLink>
        </nav>}
        {user?.userType === "student" && <nav className="">
            <NavLink to="/discussions" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Discussions Forum</NavLink>
        </nav>}
        {user === null && <nav className="">
            <NavLink to="/discussions" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Discussions Forum</NavLink>
        </nav>}
        {user?.userType === "admin" && <nav className="">
            <NavLink to="/discussions" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">Discussions</NavLink>
        </nav>}
        {
            user?.userType === "student" && <nav className="">
                <NavLink to="/myCourses" style={({ isActive }) => {
                    return {
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">My Courses</NavLink>
            </nav>
        }
        {
            user?.userType === "instructor" && <nav className="">
                <NavLink to="/instructor/instructorDashboard" style={({ isActive }) => {
                    return {
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Dashboard</NavLink>
            </nav>
        }
        {
            user?.userType === "tutor" && <nav className="">
                <NavLink to="/tutor/tutorDashboard" style={({ isActive }) => {
                    return {
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Dashboard</NavLink>
            </nav>
        }
        {
            user?.userType === "admin" && <nav className="">
                <NavLink to="/admin/adminDashboard" style={({ isActive }) => {
                    return {
                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Dashboard</NavLink>
            </nav>
        }
        <nav className="">
            <NavLink to="/faq" style={({ isActive }) => {
                return {
                    color: isActive ? "#0766AD" : "",
                    borderBottom: isActive ? "1px solid #0766AD" : ""
                };
            }} className="dark:text-black">FAQ</NavLink>
        </nav>

    </>

    // login navbar
    const login = <>
        {
            !user && <nav>
                <NavLink to="/login" style={({ isActive }) => {
                    return {

                        color: isActive ? "#0766AD" : "",
                        borderBottom: isActive ? "1px solid #0766AD" : ""
                    };
                }} className="dark:text-black">Login</NavLink>
            </nav>
        }
    </>

    // join
    const join = <>
        {
            !user && <div className="dropdown dropdown-end">
                <label tabIndex={4} className="hover:cursor-pointer" onClick={handleClicked}>
                    <nav>
                        <a>Join</a>
                    </nav>
                </label>

                {/* this part will be defferent for different types of user */}

                <div tabIndex={4} className={`${clicked == false ? "hidden" : " bg-base-200 menu menu-sm dropdown-content mt-6 z-[1] p-2 shadow rounded-box w-48 text-sm text-black gap-2"}`}>
                    {joinTypes}
                </div>
            </div>
        }
    </>

    return (
        <div >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className={`navbar font-semi md:px-[5vw] lg:px-[5vw] max-w-[2300px] h-20 fixed z-50 text-white ${isScrolled ? "bg-white shadow-md" : 'bg-[#FFFFFF] border-b-[1px]'}`}>

                {/* this is common part for all users */}

                <div className="navbar-start gap-4">

                    {/* Logo and name of the website */}
                    <Link to="/">
                        <div className="flex justify-center items-center gap-2 lg:text-2xl md:text-2xl xl:text-2xl 2xl:text-2xl text-lg font-">
                            <img src={logo} alt="" className="w-6 h-6 lg:w-10 lg:h-10 md:w-10 md:h-10 " />
                            <h2><span className="text-[#5c802d] lato">Wisdom</span><span className="text-[#0766AD] lato">Wave</span></h2>
                        </div>
                    </Link>

                    {/* search bar for large device*/}
                    <div className="lg:flex hidden md:hidden">
                        <form action="" onSubmit={(e) => localHandleSearch(e)}>
                            <div className="join">
                                <input type="text" name="search" className="input input-bordered join-item input-sm bg-[#F3F3F3] focus:outline-none placeholder:text-[#cac9c9] focus:placeholder:text-[#949292] text-black" placeholder="Search Course" />
                                <button type="submit" className=" py-[0.2rem] px-2 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] border-2 border-none text-white text-thin rounded-none rounded-r-lg text-sm">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="navbar-end text-black">
                    <div className="lg:hidden flex md:flex justify-center items-center gap-3">

                        {/* Search bar for small device */}
                        <Link to='/searchPage'>
                            <IoSearch className="lg:hidden flex md:flex text-xl text-blue-600" onClick={handleShow}></IoSearch>
                        </Link>

                        <div className="lg:hidden md:flex flex gap-3 justify-center items-center">
                            {
                                user &&
                                <div className="flex justify-center items-center gap-3 ">
                                    <Notifications handleClicked={handleClicked} clicked={clicked} ></Notifications>
                                </div>
                            }



                            {/* Join for small and medium device */}
                            {join}
                            {/* Dropdown menu for small device */}
                            <div className="dropdown dropdown-end" >
                                <label tabIndex={3} className="" onClick={handleClicked}>
                                    <IoMenu className="text-xl text-blue-600"></IoMenu>
                                </label>
                                {/* this part will be defferent for different types of user */}

                                <div tabIndex={3} className={`${clicked == false ? "hidden" : "menu menu-sm dropdown-content mt-7 z-[1] bg-gray-200 shadow rounded-box w-48 text-base text-black gap-2"}`}>
                                    <div className='p-2'>
                                        <h4 className=" text-base text-[#0766AD] font- capitalize">{user?.name}</h4>
                                        {
                                            user && <hr className='my-2 h-1 bg-[#0766AD]' />
                                        }
                                        <div className='space-y-2'>
                                            {/* {
                                                    user && <nav>
                                                        <NavLink to="/profile" style={({ isActive }) => {
                                                            return {

                                                                color: isActive ? "#0766AD" : "",
                                                                borderBottom: isActive ? "1px solid #0766AD" : ""
                                                            };
                                                        }} className="dark:text-black">Your Profile</NavLink>
                                                    </nav>
                                                } */}
                                            {sNavLinks}
                                            {profileLinks}
                                            {
                                                !user && <>
                                                    <p>Join</p>

                                                    {/* login for small and medium device */}
                                                    {
                                                        !user && <nav>
                                                            <NavLink to="/login" style={({ isActive }) => {
                                                                return {

                                                                    color: isActive ? "#0766AD" : "",
                                                                    borderBottom: isActive ? "1px solid #0766AD" : ""
                                                                };
                                                            }} className="dark:text-black">Login</NavLink>
                                                        </nav>
                                                    }
                                                </>
                                            }
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
                            <div className="flex justify-center items-center gap-4 ">
                                <Notifications handleClicked={handleClicked} clicked={clicked} ></Notifications>
                            </div>
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