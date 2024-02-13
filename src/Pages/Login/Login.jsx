import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaArrowCircleLeft, FaFacebook } from "react-icons/fa";
import Lottie from 'lottie-react';
import loginAnimation from './login.json'
import useAuth from '../../hooks/useAuth';
import './style.css'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { login, googleLogin } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        await login(data.email, data.password)
            .then(data => {

                // console the input field data
                console.log(data.user)
                // if the user created successfully then display the sweet alert
                {
                    if (data.user) {
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
            {/* redirect to the home page */}
            <div className='flex px-8 pt-8'>
                <Link to='/'><FaArrowCircleLeft className='text-2xl'></FaArrowCircleLeft></Link>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}

            />
            <div className='flex justify-center items-center md:min-h-screen lg:min-h-screen min-h-[900px] max-w-[96rem] mx-auto'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[500px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>

                    {/* Loign animation */}
                    <div className='flex-1 flex justify-end'>
                        <Lottie animationData={loginAnimation} className="max-w-[500px] h-[500px]"></Lottie>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                    </div>
                    <div className='flex-1 flex flex-col justify-center items-center'>
                        {/* Login Form  */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            <div>

                                {/* Email */}
                                <input
                                    type='text'
                                    name="email"
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                    className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96'
                                />
                                <div>
                                    {errors.email && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <input
                                    type='password'
                                    name="password"
                                    placeholder='Password'
                                    {...register("password", { required: true })}
                                    className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96' />
                                <div>
                                    {errors.password && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>

                            {/* Submit button */}
                            <div>
                                <input
                                    type="submit"
                                    className='btn bg-blue-500 hover:btn-outline input input-bordered border-black w-[80vw] md:w-96 lg:w-96 capitalize text-white' />
                            </div>
                        </form>
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
                                <div className='flex flex-row gap-2 justify-start'>
                                    <p className='text-base'>New at WisdomWave? <Link to="/studentSignUp"></Link></p>
                                    <div className="dropdown dropdown-right">
                                        <label tabIndex={1} className="hover:cursor-pointer">
                                            <nav>
                                                <a className='active:underline text-[#0766AD] text-base'>Join</a>
                                            </nav>
                                        </label>

                                        {/* this part will be defferent for different types of user */}

                                        <div tabIndex={1} className="dropdown-content mt-2 ml-3 z-[1] w-32 p-2 shadow text-black bg-[#F3F3F3]">
                                            <div className='flex flex-col gap-2'>
                                                <Link to="/studentSignUp"><button className="capitalize hover:underline">Student</button></Link>
                                                <Link to="/studentSignUp"><button className="capitalize hover:underline">Instructor</button></Link>
                                                <Link to="/studentSignUp"><button className=" capitalize hover:underline">Tutor</button></Link>
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