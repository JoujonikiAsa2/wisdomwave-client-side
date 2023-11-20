import { IoMdArrowDropdown } from "react-icons/io";
import { IoMenu,IoSearch  } from "react-icons/io5";


const Header = () => {
    return (
        <div className="navbar bg-white  lora font-semibold md:px-[5vw] lg:px-[5vw]">

            {/* this is common part for all users */}

            <div className="navbar-start">
                <div className="lg:text-2xl md:text-2xl xl:text-2xl 2xl:text-4xl sm:text-xl font-bold">
                    <h2><span className="text-[#21B573]">Wisdom</span><span className="text-[#0645B1]">Wave</span></h2>
                </div>
            </div>

            <div className="navbar-center lg:flex gap-3">
                <div className="lg:flex md:hidden hidden gap-3">
                    <h5 className=" text-lg">Course</h5>
                    <div>
                        <IoMdArrowDropdown></IoMdArrowDropdown>
                    </div>
                </div>
                <div className="lg:flex hidden md:hidden">
                    <div className="join">
                        <input className="input input-bordered join-item input-sm  text-lg" placeholder="Search" />
                        <button className="btn join-item rounded-r-lg btn-sm capitalize text-sm bg-[#8b9dbd] text-white">Search</button>
                    </div>
                </div>
            </div>
            <div className="navbar-end">
                <div className="lg:hidden flex md:flex">
                    <IoSearch ></IoSearch>
                </div>
                <div className="lg:hidden md:flex flex gap-3">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <IoMenu></IoMenu>
                        </label>

                        {/* this part will be defferent for different types of user */}

                        <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 right-12 shadow bg-base-100 rounded-box w-52 text-base">
                            <div><a>Blog</a></div>
                            <div className="w-24">
                                <select defaultValue="Join" className=" select-text">
                                    <option value="">Join</option>
                                    <option value="Student">Join as Student</option>
                                    <option value="Instructor">Join as Instructor</option>
                                    <option value="Tutor">Join as Tutor</option>
                                </select>
                            </div>
                            <div><a>Login</a></div>
                        </div>
                    </div>
                </div>
                <div className="lg:flex hidden md:hidden navbar-end gap-6 text-lg">
                    <div><a>Blog</a></div>
                    <div>
                        <select>
                            <option value="" className="text-center">Join</option>
                            <option value="Student">Join as Student</option>
                            <option value="Instructor">Join as Instructor</option>
                            <option value="Tutor">Join as Tutor</option>
                        </select>
                    </div>
                    <div><a>Login</a></div>
                </div>

            </div>
        </div>
    );
};

export default Header;