import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaArrowCircleLeft, FaFacebook } from "react-icons/fa";
import Lottie from 'lottie-react';
import signUpAnimation from './signUp.json'
import useAuth from '../../hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarToday, MdContactPhone, MdDriveFileRenameOutline, MdEmail, MdImage, MdPassword } from "react-icons/md";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
'../../hooks/useAxiosPublic';
const IMAGE_HOSTING_API = import.meta.env.VITE_IMAGE_HOSTINF_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_API}`


const StudentSignUp = () => {

    const axiosPublic = useAxiosPublic()
    // date picker
    const [startDate, setStartDate] = useState();

    //  navigate helps to navigate the login page after succefully sign up

    const navigate = useNavigate()
    const location = useLocation()

    // get this from useAuth custom hook
    const { studentSignUp, googleLogin, userSignOut, updateUserInfo } = useAuth()

    // react hook form built in function desctructuring
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        reset
    } = useForm()

    // Help to execute all function after submit the form
    const onSubmit = async (data) => {
        console.log(data)
        const name = data.fname + " " + data.lname
        const phone = parseInt(data.phone)
        const imageFile = { image: data.profile[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        console.log(phone, name, res.data.data.display_url)
        const image = res.data.data.display_url

        studentSignUp(data.email, data.password)
            .then(result => {
                // console the input field data
                console.log(result.user)
                updateUserInfo(name, phone, image)
                    .then((res) => {
                        console.log("updated")
                        console.log(res.data)
                    })
                    .catch(error => console.log(error))
                reset()
                // if the user created successfully then display the sweet alert
                toast.success('Successfully Signed Up!', {
                    duration: 1000
                })
                setTimeout(() => {
                    userSignOut()
                        .then(() => {
                            console.log("Go to login page")
                        })
                        .catch(error => console.log(error))
                    navigate(location.state || '/login')
                }, 2000)
            })
            .catch(error => {

                // console if any error
                toast.error(error)
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
                            userSignOut()
                                .then(() => {
                                    console.log("Go to login page")
                                })
                                .catch(error => console.log(error))
                            navigate(location.state || '/login')
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
            {/* Icons and links to back on homepage */}
            <div className='flex p-8'>
                <Link to='/'><FaArrowCircleLeft className='text-2xl'></FaArrowCircleLeft></Link>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='flex flex-col justify-center items-center md:min-h-screen lg:min-h-screen min-h-[900px] max-w-[96rem] mx-auto mt-4'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[90vw] md:w-[50rem] lg:w-[60rem] h-[600px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl lg:hover:border-t-2 md:hover:shadow-2xl pt-12'>
                    <div className='flex-1 flex-col justify-end'>
                        {/* side animation */}
                        <Lottie animationData={signUpAnimation} className="max-w-[400px] h-[400px] md:h-[500px] lg:h-[800px]"></Lottie>
                    </div>
                    <div className='flex justify-center items-center'>
                        {/* vertical line */}
                        <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                    </div>
                    <div className='flex-1 flex flex-col justify-start  h-[600px]'>

                        {/* react hook form */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            <div className='flex gap-[1.5rem] md:gap-2 lg:gap-6 justify-between lg:justify-center md:justify-end items-center mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <label htmlFor="">
                                    <MdDriveFileRenameOutline className='text-blue-700'></MdDriveFileRenameOutline >
                                </label>
                                {/* first name */}
                                <div>
                                    <div>
                                        <input
                                            type='text'
                                            name="fname"
                                            placeholder="First Name"
                                            {...register("fname", { required: true })}
                                            className='input input-bordered border-blue-700 w-[45vw] md:w-[12.5rem] lg:w-[12.5rem]'
                                        />
                                        <div>
                                            {errors.fname && <span className='text-xs text-red-500'>This field is required</span>}
                                        </div>
                                    </div>

                                </div>

                                {/* last name */}
                                <div>
                                    <input
                                        type='text'
                                        name="lname"
                                        placeholder="Last Name"
                                        {...register("lname", { required: true })}
                                        className='input input-bordered border-blue-700 w-[30vw] md:w-[11rem] lg:w-[9rem]'
                                    />
                                    <div>
                                        {errors.lname && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            {/* profile picture */}
                            <div className='flex gap-4 justify-center items-center mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <label htmlFor="" className='border-2'>
                                    <MdImage className='text-blue-700'></MdImage >
                                </label>
                                <div>
                                    <input
                                        type='file'
                                        name="profile"
                                        {...register("profile", { required: true })}
                                        className='input input-bordered border-blue-700 w-[80vw] md:w-96 lg:w-[23rem] p-2'
                                    />
                                    <div>
                                        {errors.profile && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>

                            </div>

                            {/* date of birth */}
                            <div className='flex justify-center items-center gap-4 mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <label htmlFor="" className='border-2'>
                                    <MdCalendarToday className='text-blue-700'></MdCalendarToday>
                                </label>
                                <div>
                                    <Controller
                                        control={control}
                                        name="dob"
                                        render={({ field }) => (
                                            <>
                                                <DatePicker
                                                    {...field}
                                                    selected={startDate}
                                                    onChange={date => {
                                                        setStartDate(date);
                                                        field.onChange(date);
                                                    }}
                                                    placeholderText="Date of birth"
                                                    className="input input-bordered border-blue-700 w-[80vw] md:w-96 lg:w-[23rem]"
                                                />
                                                <div>
                                                    {errors.dob && <span className='text-xs text-red-500'>This field is required</span>}
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* phone number */}
                            <div className='flex gap-4 justify-center items-center mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <label htmlFor="" className='border-2'>
                                    <MdContactPhone className='text-blue-700'></MdContactPhone>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        name="phone"
                                        placeholder="Phone"
                                        {...register("phone", { required: true })}
                                        className='input input-bordered border-blue-700 w-[80vw] md:w-96 lg:w-[23rem]'
                                    />

                                    {/* error if field will be empty */}
                                    <div>
                                        {errors.phone && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                            </div>

                            {/* email address */}
                            <div className='flex gap-4 justify-center items-center mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <label htmlFor="" className='border-2'>
                                    <MdEmail className='text-blue-700'></MdEmail>
                                </label>
                                <div>
                                    <input
                                        type='text'
                                        name="email"
                                        placeholder="Email"
                                        {...register("email",
                                            {
                                                required: true,
                                                pattern: /\S+@\S+\.\S+/
                                            })}
                                        className='input input-bordered border-blue-700 w-[80vw] md:w-96 lg:w-[23rem]'
                                    />
                                    {/* error if field will be empty */}
                                    <div>
                                        {errors.email?.type == "pattern" && <span className='text-xs text-red-500'>Please use email format</span>}
                                    </div>
                                </div>
                            </div>

                            {/* password */}
                            <div className='flex gap-4 justify-center items-center  mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <label htmlFor="" className='border-2'>
                                    <MdPassword className='text-blue-700'></MdPassword>
                                </label>
                                <div>
                                    <input
                                        type='password'
                                        name="password"
                                        placeholder='Password'
                                        {...register("password",
                                            {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}/
                                            })}
                                        className='input input-bordered border-blue-700 w-[80vw] md:w-96 lg:w-[23rem]' />
                                    <div>
                                        {errors.password?.type === "required" && <span className='text-xs text-red-600'>Password is required</span>}
                                        {errors.password?.type === "minLength" && <span className='text-xs text-red-600'>Password should be 6 character or longer</span>}
                                        {errors.password?.type === "maxLength" && <span className='text-xs text-red-600'>Password should be less then 20 character</span>}
                                        {errors.password?.type === "pattern" && <span className='text-xs text-red-600'>Must contain 1 upercase,1 lowercase, 1 number and 1 special character.</span>}

                                    </div>
                                </div>
                            </div>

                            {/* submit button */}
                            <div className='flex justify-end  mr-[0.5vw] lg:mr-[2.6rem] md:mr-[1.2rem]'>
                                <input
                                    type="submit"
                                    className='btn bg-blue-500 hover:btn-outline input input-bordered border-blue-700 w-[80vw] md:w-96 lg:w-[23rem] capitalize text-white' />
                            </div>
                        </form>
                        <div className='flex flex-col justify-center items-center space-y-2'>
                            {/* horizontal line */}
                            <div className="">
                                <div className="divider divider-neutral py-2 w-[80vw] md:w-96 lg:w-[23rem]">OR</div>
                            </div>

                            {/* social media login icon */}
                            <div className='flex justify-start items-center gap-2'>
                                <FcGoogle className=' text-3xl md:text-3xl lg:text-3xl font-bold hover:cursor-pointer' onClick={handleGoogleLogin}></FcGoogle >
                            </div>

                            {/* toggle to the login page */}
                            <div>
                                <p className='text-base'>Already have an account? <Link to="/login"><span className=' text-[#0766AD] active:underline'>Login here</span></Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentSignUp;