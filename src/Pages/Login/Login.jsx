import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaArrowCircleLeft, FaFacebook } from "react-icons/fa";
import Lottie from 'lottie-react';
import loginAnimation from './login.json'
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        login(data.email, data.password)
            .then(data => {

                // console the input field data
                console.log(data.user)
                reset()

                // if the user created successfully then display the sweet alert
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Logged in successfully",
                    willClose: () => {

                        // Redirect to the login page after the timer expires
                        console.log('SweetAlert closed.');
                        navigate(location.state || '/');
                    }
                });
            })
            .catch(error => {

                // console if any error
                console.log(error)
            })
    }

    return (
        <>
            {/* redirect to the home page */}
            <div className='flex px-8 pt-8'>
                <Link to='/'><FaArrowCircleLeft className='text-2xl'></FaArrowCircleLeft></Link>
            </div>

            <div className='flex justify-center items-center md:min-h-screen lg:min-h-screen min-h-[900px] max-w-[96rem] mx-auto'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[500px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>

                    {/* Loign animation */}
                    <div className='flex-1 flex justify-end'>
                        <Lottie animationData={loginAnimation} className="max-w-[500px] h-[500px]"></Lottie>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                    </div>
                    <div className='flex-1 flex flex-col justify-start'>
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

                            {/* Divider */}
                            <div className="">
                                <div className="divider divider-neutral py-2 w-[80vw] md:w-96 lg:w-96">OR</div>
                            </div>

                            {/* Social media icons */}
                            <div className='flex justify-start gap-4'>
                                <FcGoogle className=' text-3xl md:text-3xl lg:text-4xl font-bold'></FcGoogle >
                                <FaFacebook className='text-blue-700 text-3xl md:text-3xl lg:text-4xl font-bold'></FaFacebook>
                            </div>

                            {/* toggle to the signUp page */}
                            <div className='flex flex-row gap-2'>
                                <p className='text-base'>New at WisdomWave? <Link to="/studentSignUp"></Link></p>
                                <div className="dropdown dropdown-top">
                                    <label tabIndex={1} className="hover:cursor-pointer">
                                        <nav>
                                            <a className='underline text-red-500 text-base'>Join</a>
                                        </nav>
                                    </label>

                                    {/* this part will be defferent for different types of user */}

                                    <div tabIndex={1} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-48 bg-blue-400 text-black">
                                        <div className='flex flex-col gap-3'>
                                            <Link to="/studentSignUp"><button className="btn btn-sm capitalize">Join as Student</button></Link>
                                            <Link to="/studentSignUp"><button className="btn btn-sm capitalize">Join as Instructor</button></Link>
                                            <Link to="/studentSignUp"><button className="btn btn-sm capitalize">Join as Tutor</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;