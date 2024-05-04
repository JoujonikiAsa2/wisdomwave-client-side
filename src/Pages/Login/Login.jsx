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

const Login = () => {

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    const { login, googleLogin, userSignOut } = useAuth()
    const [passwordType, setPasswordType] = useState('password')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        // await login(data.email, data.password)
        //     .then(data => {

        //         // console the input field data
        //         console.log(data.user)
        //         // if the user created successfully then display the sweet alert
        //         {
        //             if (data.user.emailVerified == true) {
        //                 axiosPublic.put(`/api/users/${data.email}`)
        //                     .then(res => {
        //                         console.log(res.data)
        //                     })
        //                     .then(error => {
        //                         console.log(error)
        //                     })
        //                 toast.success('Successfully Logged In!', {
        //                     duration: 1000,
        //                 })
        //                 reset()
        //                 setTimeout(() => {
        //                     navigate(location.state || '/')
        //                 }, 1200)
        //             }
        //             else {
        //                 userSignOut()
        //                     .then(() => {
        //                         toast.error('Verify before login!', {
        //                             duration: 4000,
        //                         })
        //                     })
        //                     .catch(error => {
        //                         // Convert the error object to a string
        //                         const errorMessage = error.message || 'An error occurred';

        //                         // Display the error message using toast.error
        //                         toast.error(errorMessage);
        //                     })
        //             }
        //         }

        //     })
        //     .catch(error => {

        //         // console if any error
        //         toast.error('Failed to Log In!')
        //     })

        await login(data.email, data.password)
            .then(res => {
                if (res.user.emailVerified == true) {
                    axiosPublic.put(`/api/user/${data.email}`)
                        .then(res => {
                            console.log(res.data);
                            toast.success('Successfully Logged In!', { duration: 1000 });
                            reset();
                            setTimeout(() => {
                                navigate(location.state || '/');
                            }, 1200);
                        })
                        .catch(error => {
                            console.log(error);
                            toast.error('Failed to update user!');
                        });
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
                toast.error('Failed to Log In!');
            });

    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                {
                    if (res.user) {
                        toast.success('Successfully Logged In!', {
                            duration: 1000,
                        })
                        reset()
                        setTimeout(() => {
                            navigate(location.state || '/')
                        }, 1200)
                    }
                }
            })
            .catch(error => {

                // console if any error
                toast.error('Failed to Log In!')
            })
    }

    return (
        <>

            <Toaster
                position="top-center"
                reverseOrder={false}

            />
            <div className='flex justify-center items-center h-[85vh] max-w-[96rem] mx-auto'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[500px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>

                    {/* Loign animation */}
                    <div className='flex-1 flex justify-end'>
                        <Lottie animationData={loginAnimation} className="max-w-[500px] h-[400px]"></Lottie>
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
                                <div className=''>
                                    <input
                                        type="submit"
                                        className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                                </div>
                            </form>
                        </div>
                        <div className='flex flex-col justify-start items-start'>

                            <div className='text-end pt-3'>
                                <Link to='/forgetPassword' className='hover:underline text-[#0766AD]' >Forget Password</Link>
                            </div>
                            <div className='flex justify-start flex-col'>
                                {/* Divider */}
                                <div className="">
                                    <div className="divider divider-neutral w-[80vw] md:w-96 lg:w-96 py-3">OR</div>
                                </div>

                                {/* Social media icons */}
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <FcGoogle className=' text-3xl md:text-3xl lg:text-3xl font-bold hover:cursor-pointer' onClick={handleGoogleLogin}></FcGoogle >
                                    </div>
                                    {/* toggle to the signUp page */}
                                    <div className='flex flex-row gap-2 justify-center'>
                                        <p className='text-base'>New at WisdomWave? <Link to="/studentSignUp"></Link></p>
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
                                                    <Link to="/studentSignUp"><button className="capitalize hover:underline text-[#0766AD]">Instructor</button></Link>
                                                    <Link to="/studentSignUp"><button className=" capitalize hover:underline text-[#0766AD]">Tutor</button></Link>
                                                </div>
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