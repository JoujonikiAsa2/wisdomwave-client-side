import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaArrowCircleLeft, FaFacebook } from "react-icons/fa";
import Lottie from 'lottie-react';
import signUpAnimation from './signUp.json'
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const StudentSignUp = () => {

    //  navigate helps to navigate the login page after succefully sign up

    const navigate = useNavigate()
    const location = useLocation()

    // get this from useAuth custom hook
    const { studentSignUp } = useAuth()

    // react hook form built in function desctructuring
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    // Help to execute all function after submit the form
    const onSubmit = (data) => {
        console.log(data)

        studentSignUp(data.email, data.password)
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
                    title: "Signed in successfully",
                    willClose: () => {

                        // Redirect to the login page after the timer expires
                        console.log('SweetAlert closed.');
                        navigate('/login');
                    }
                });
            })
            .catch(error => {

                // console if any error
                console.log(error)
            })
    }

    return (
        <div className='flex justify-center items-center md:min-h-screen lg:min-h-screen min-h-[1000px] max-w-[96rem] mx-auto'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[700px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>
                <div className='flex-1 flex justify-end'>

                    {/* Icons and links to back on homepage */}
                    <div className='flex p-8'>
                        <Link to='/'><FaArrowCircleLeft className='text-2xl'></FaArrowCircleLeft></Link>
                    </div>

                    {/* side animation */}
                    <Lottie animationData={signUpAnimation} className="max-w-[500px] h-[600px]"></Lottie>
                </div>
                <div className='flex justify-center items-center'>
                    {/* vertical line */}
                    <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                </div>
                <div className='flex-1 flex flex-col justify-start'>

                    {/* react hook form */}
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='flex gap-4'>
                            {/* first name */}
                            <div>
                                <input
                                    type='text'
                                    name="fname"
                                    placeholder="First Name"
                                    {...register("fname", { required: true })}
                                    className='input input-bordered border-black w-[40vw] md:w-[13rem] lg:w-[13rem]'
                                />
                                {errors.fname && <span>This field is required</span>}
                            </div>

                            {/* last name */}
                            <div>
                                <input
                                    type='text'
                                    name="lname"
                                    placeholder="Last Name"
                                    {...register("lname", { required: true })}
                                    className='input input-bordered border-black w-[38vw] md:w-[10rem] lg:w-[10rem]'
                                />
                                {errors.lname && <span>This field is required</span>}
                            </div>
                        </div>

                        {/* profile picture */}
                        <div>
                            <input
                                type='file'
                                name="profile"
                                {...register("profile", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96 p-2'
                            />
                            {errors.profile && <span>This field is required</span>}
                        </div>

                        {/* date of birth */}
                        <div>
                            <input
                                type='date'
                                name="dob"
                                placeholderText="Date of Birth"
                                {...register("dob", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96'
                            />
                            {errors.phone && <span>This field is required</span>}
                        </div>

                        {/* phone number */}
                        <div>
                            <input
                                type='text'
                                name="phone"
                                placeholder="Phone"
                                {...register("phone", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96'
                            />
                            {errors.phone && <span>This field is required</span>}
                        </div>

                        {/* email address */}
                        <div>
                            <input
                                type='text'
                                name="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96'
                            />
                            {errors.email && <span>This field is required</span>}
                        </div>

                        {/* password */}
                        <div>
                            <input
                                type='password'
                                name="password"
                                placeholder='Password'
                                {...register("password", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96' />
                            {errors.password && <span>This field is required</span>}
                        </div>

                        {/* submit button */}
                        <div>
                            <input
                                type="submit"
                                className='btn bg-blue-500 hover:btn-outline input input-bordered border-black w-[80vw] md:w-96 lg:w-96 capitalize' />
                        </div>

                        {/* horizontal line */}
                        <div className="">
                            <div className="divider divider-neutral py-2 w-[80vw] md:w-96 lg:w-96">OR</div>
                        </div>

                        {/* social media login icon */}
                        <div className='flex justify-start gap-4'>
                            <FcGoogle className=' text-3xl md:text-3xl lg:text-4xl font-bold'></FcGoogle >
                            <FaFacebook className='text-blue-700 text-3xl md:text-3xl lg:text-4xl font-bold'></FaFacebook>
                        </div>

                        {/* toggle to the login page */}
                        <div>
                            <p className='text-base'>Already have an account? <Link to="/login"><span className=' text-red-400 underline'>Login here</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentSignUp;