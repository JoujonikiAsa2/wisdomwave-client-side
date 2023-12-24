import { IoMdArrowDropdown } from "react-icons/io";
import { IoMenu, IoSearch } from "react-icons/io5";
import logo from '../../assets/Photos/logo_wave.png'
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar bg-white shadow-xl  lora font-semibold md:px-[5vw] lg:px-[5vw] max-w-[96rem] fixed z-50 ">

            {/* this is common part for all users */}

            <div className="navbar-start">
                <div className="flex justify-center items-center gap-2 lg:text-xl md:text-xl xl:text-xl 2xl:text-2xl sm:text-lg font-bold">
                    <img src={logo} alt="" className="w-10 h-10 " />
                    <h2><span className="text-[#000000]">Wisdom</span><span className="text-[#0645B1]">Wave</span></h2>
                </div>
            </div>

            <div className="navbar-center lg:flex gap-3">
                <div className="lg:flex justify-center items-center md:hidden hidden gap-3">
                    <h5 className=" text-base text-black">Course</h5>
                    <div>
                        <IoMdArrowDropdown></IoMdArrowDropdown>
                    </div>
                </div>
                <div className="lg:flex hidden md:hidden">
                    <div className="join">
                        <input className="input input-bordered join-item input-sm  text-sm" placeholder="Search" />
                        <button className="btn join-item rounded-r-lg btn-sm capitalize text-sm bg-[#8b9dbd] text-black">Search</button>
                    </div>
                </div>
            </div>
            <div className="navbar-end text-black">
                <div className="lg:hidden flex md:flex justify-center items-center gap-3">
                    <div>
                        <IoSearch ></IoSearch>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={1} className="hover:cursor-pointer">
                            <nav>
                                <NavLink to="/login" style={({ isActive }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isActive ? "red" : "black",
                                    };
                                }}>Join</NavLink>
                            </nav>
                        </label>

                        {/* this part will be defferent for different types of user */}

                        <div tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] bg-base-100 p-2 shadow rounded-box w-48 text-base text-black">
                            <div><a><button className="btn btn-sm capitalize">Join as Student</button></a></div>
                            <div><a><button className="btn btn-sm capitalize mt-3">Join as Student</button></a></div>
                            <div><a><button className="btn btn-sm capitalize mt-3">Join as Student</button></a></div>
                        </div>
                    </div>

                    <div className="lg:hidden md:flex flex gap-3">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="">
                                <IoMenu></IoMenu>
                            </label>

                            {/* this part will be defferent for different types of user */}

                            <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 right-12 shadow bg-base-100 rounded-box w-48 text-base text-black">
                                <nav>
                                    <NavLink to="/" style={({ isActive }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                            color: isActive ? "red" : "black",
                                        };
                                    }}>Blog</NavLink>
                                </nav>
                                <nav>
                                    <NavLink to="/login" style={({ isActive }) => {
                                        return {
                                            fontWeight: isActive ? "bold" : "",
                                            color: isActive ? "red" : "black",
                                        };
                                    }}>Login</NavLink>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:flex hidden md:hidden gap-6 text-base">
                    <div className="hover:cursor-pointer"><a>Blog</a></div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={1} className="hover:cursor-pointer">
                            <nav>
                                <NavLink to="/" style={({ isActive }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isActive ? "red" : "black",
                                    };
                                }}>Join</NavLink>
                            </nav>
                        </label>

                        {/* this part will be defferent for different types of user */}

                        <div tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48 text-base text-black flex justify-center items-center">
                            <div><Link to='/studentSignUp'><button className="btn btn-sm capitalize">Join as Student</button></Link></div>
                            <div><a><button className="btn btn-sm capitalize mt-3">Join as Student</button></a></div>
                            <div><a><button className="btn btn-sm capitalize mt-3">Join as Student</button></a></div>
                        </div>
                    </div>
                    <nav>
                        <NavLink to="/login" style={({ isActive }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isActive ? "red" : "black",
                            };
                        }}>Login</NavLink>
                    </nav>
                </div>

            </div>
        </div>
    );
};

export default Header;