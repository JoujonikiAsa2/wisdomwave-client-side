import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Lottie from 'lottie-react';
import loginAnimation from './login.json'
import useAuth from '../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { PiSpinnerGapBold } from "react-icons/pi";


const Login = () => {

    console.log("console check");
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    const { login, userSignOut, isLoading } = useAuth()
    const [passwordType, setPasswordType] = useState('password')
    const userDetails = JSON.parse(localStorage.getItem('user'))
    const [click, setClick] = useState(false)
    // console.log(userDetails.userType)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        setClick(true)
        console.log(userDetails)
        await login(data.email, data.password)
            .then(res => {
                if (res.user.emailVerified == true) {
                    axiosPublic.put(`/api/user/${data.email}`)
                        .then(res => {
                            console.log(res.data);
                            toast.success('Successfully Logged In!', { duration: 1000 });
                            setClick(false)
                            setTimeout(() => {
                                if (res.data.data.userType === "student") {
                                    navigate(location.state || '/')
                                }
                                else if (res.data.data.userType === "instructor") {
                                    navigate(location.state || '/instructor/instructorDashboard')
                                }
                                else if (res.data.data.userType === "tutor") {
                                    navigate(location.state || '/tutor/tutorDashboard')
                                }
                                else if (res.data.data.userType === "admin") {
                                    navigate(location.state || '/admin/adminDashboard')
                                }
                            }, 1200);
                            reset();
                            // })
                            // .catch(error => {
                            //     console.log(error);
                            //     toast.error('Failed to update user!');
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    userSignOut()
                        .then(() => {
                            toast.error('Verify before login!', { duration: 4000 });
                        })
                        .catch(error => {
                            const errorMessage = error.message || 'An error occurred';
                            toast.error(errorMessage);
                        });
                }
            })
            .catch(error => {
                setClick(false)
                toast.error('Failed to Log In!', error);
            });

    }

    // const handleGoogleLogin = () => {
    //     googleLogin()
    //         .then(res => {
    //             {
    //                 if (res.user) {
    //                     axiosPublic.get(`/api/user/${data.email}`)
    //                         .then(res => {
    //                             console.log(res.data);
    //                             toast.success('Successfully Logged In!', { duration: 1000 });
    //                             setTimeout(() => {
    //                                 if (res.data.data.userType === "student") {
    //                                     navigate(location.state || '/')
    //                                 }
    //                                 else if (res.data.data.userType === "instructor") {
    //                                     navigate(location.state || '/instructor/instructorDashboard')
    //                                 }
    //                                 else if (res.data.data.userType === "tutor") {
    //                                     navigate(location.state || '/tutor/tutorDashboard')
    //                                 }
    //                                 else if (res.data.data.userType === "admin") {
    //                                     navigate(location.state || '/admin/adminDashboard')
    //                                 }
    //                             }, 1200);
    //                             reset();
    //                             // })
    //                             // .catch(error => {
    //                             //     console.log(error);
    //                             //     toast.error('Failed to update user!');
    //                         })
    //                         .catch(error => {
    //                             console.log(error);
    //                         })
    //                 }
    //             }
    //         })
    //         .catch(error => {

    //             // console if any error
    //             toast.error('Failed to Log In!')
    //         })
    // }

    return (
        <>

            <Toaster
                position="top-center"
                reverseOrder={false}

            />
            <div className='flex justify-center items-center  max-w-[96rem] mx-auto '>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[450px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl mt-10'>

                    {/* Loign animation */}
                    <div className='flex-1 flex justify-end '>
                        <Lottie animationData={loginAnimation} className="max-w-[500px] h-[350px]"></Lottie>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                    </div>
                    <div className='flex-1 '>
                        <div className='flex flex-col justify-start items-start'>
                            {/* Login Form  */}
                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                                <div>

                                    {/* Email */}
                                    <input
                                        type='email'
                                        name="email"
                                        placeholder="Email"
                                        {...register("email", { required: true })}
                                        className='input input-bordered border-gray-300 focus:outline-none w-[80vw] h-9 md:w-96 lg:w-96'
                                    />
                                    <div>
                                        {errors.email && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>

                                {/* Password */}
                                <div className='relative'>
                                    <input
                                        type={passwordType}
                                        name="password"
                                        placeholder='Password'
                                        {...register("password", { required: true })}
                                        className='input input-bordered border-gray-300 focus:outline-none w-[80vw] h-9 md:w-96 lg:w-96'
                                    />
                                    <div className='absolute top-2 right-2'>
                                        <IoMdEyeOff className={`text-xl ${passwordType == 'text' && 'hidden'}`} onClick={() => { setPasswordType('text') }} />
                                        <IoMdEye className={`text-xl ${passwordType == 'password' && 'hidden'}`} onClick={() => { setPasswordType('password') }} />
                                    </div>
                                    <div>
                                        {errors.password && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>

                                {/* Submit button */}
                                {/* <div className=''>
                                    <input
                                        type="submit"
                                        value={`${isLoading ? 'Loading...' : 'Login'}`}
                                        className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                                </div> */}
                                <div className="mt-3">
                                    {click == true ? (
                                        <button
                                            className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize'><PiSpinnerGapBold className='animate-spin text-2xl' ></PiSpinnerGapBold  ></button>
                                    ) : (
                                        <div className=''>
                                            <input
                                                type="submit"
                                                value="Login"
                                                className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className='flex flex-col justify-start items-start'>

                            <div className='text-end pt-3'>
                                <Link to='/forgetPassword' className='hover:underline text-[#0766AD]' >Forget Password</Link>
                            </div>
                            <div className='w-full flex justify-center items-center flex-col mt-10'>
                                <div className='flex flex-row gap-2 justify-center items-center'>
                                    <p className='text-base text-center'>New at WisdomWave? </p>
                                    <div className="dropdown dropdown-right">
                                        <label tabIndex={1} className="hover:cursor-pointer">
                                            <nav>
                                                <a className='active:underline text-[#0766AD] text-base'>Join</a>
                                            </nav>
                                        </label>

                                        {/* this part will be defferent for different types of user */}

                                        <div tabIndex={1} className="dropdown-content ml-4 z-[1] text-black bg-none shadow-lg p-3  border-gray-300 card border-t-[1px]">
                                            <div className='flex flex-col gap-2'>
                                                <Link to="/studentSignUp"><button className="capitalize hover:underline text-[#0766AD]">Student</button></Link>
                                                <Link to="/instructorSignup"><button className="capitalize hover:underline text-[#0766AD]">Instructor</button></Link>
                                                <Link to="/tutorSignup"><button className=" capitalize hover:underline text-[#0766AD]">Tutor</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;