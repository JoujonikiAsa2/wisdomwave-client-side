import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const InstructorLayout = () => {
    const { userSignOut } = useAuth()
    const navigate = useNavigate()
    return (
        <div className='w-full flex justify-start '>
            <div className='w-56 border-r-2 bg-gray-300 h-screen fixed'>
                <Link to="/instructorDashboard">
                    Dasboard
                </Link>
                <Link to="/addCourse">
                    Add Course
                </Link>
                <Link to="/courseList">
                    Course List
                </Link>
                <Link to="/courseList">
                    Course List
                </Link>
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
            </div>
            <div className=" ml-[14rem]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default InstructorLayout;