import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Lottie from 'lottie-react';
import signUpAnimation from './signUp.json'
import useAuth from '../../hooks/useAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useAxiosPublic from '../../hooks/useAxiosPublic';
'../../hooks/useAxiosPublic';
const IMAGE_HOSTING_API = import.meta.env.VITE_IMAGE_HOSTINF_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_API}`


const StudentSignUp = () => {

    const axiosPublic = useAxiosPublic()
    // date picker
    const [startDate, setStartDate] = useState();
    const [passwordType, setPasswordType] = useState('password')

    //  navigate helps to navigate the login page after succefully sign up

    const navigate = useNavigate()
    const location = useLocation()

    // get this from useAuth custom hook
    const { signUp, googleLogin, userSignOut, updateUserInfo } = useAuth()

    // react hook form built in function desctructuring
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm()

    // Help to execute all function after submit the form
    const onSubmit = async (data) => {
        // console.log(data)
        const name = data.fname + " " + data.lname
        const phoneNumber = data.phone
        const imageFile = { image: data.profile[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        // console.log(phone, name, res.data.data.display_url)
        const image = res.data.data.display_url
        console.log(phoneNumber)

        const user = {
            name: name,
            email: data.email,
            phoneNumber: phoneNumber,
            userType: 'student',
            profilePicture: image,
            verified: false,
        }
        console.log(user)
        signUp(data.email, data.password)
            .then(result => {
                // console.log(result.user)

                // updating user information
                updateUserInfo(name, phoneNumber, image)
                    .then((response) => {
                        console.log("updated")
                        // console.log(response.data)
                    })
                    .catch(error => console.log(error))

                // Sending a verification link
                sendEmailVerification(result.user)
                    .then(() => {

                        setStartDate("")
                        const useRole = {
                            userType: "student"
                        }

                        localStorage.setItem('user', JSON.stringify(useRole))
                        axiosPublic.post('/api/users', user)
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        // This is alert message email verification
                        toast.success('Please check your email to verify', {
                            duration: 4000
                        })
                        reset()
                        setTimeout(() => {
                            userSignOut()
                                .then(() => {
                                    // console.log("Go to login page")
                                })
                                .catch(error => console.log(error))
                        }, 1200)
                    })
                    .catch(() => {
                        toast.error('Failed to verify', {
                            duration: 4000
                        });
                    });
            })
            .catch(error => {
                // Convert the error object to a string
                const errorMessage = error.message || 'An error occurred';

                // Display the error message using toast.error
                toast.error(errorMessage);
            })

    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                {
                    if (res.user) {
                        axiosPublic.post('/api/users', user)
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log(error)
                            })
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
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='flex flex-col justify-center items-center h-screen max-w-[96rem] mx-auto lg:my-0 my-10'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[90vw] md:w-[50rem] lg:w-[60rem] h-[500px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>
                    <div className='flex-1 flex-col justify-end'>
                        {/* side animation */}
                        <Lottie animationData={signUpAnimation} className="max-w-[400px] h-[300px]"></Lottie>
                    </div>
                    <div className='flex justify-center items-center'>
                        {/* vertical line */}
                        <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                    </div>
                    <div className='flex-1 flex flex-col justify-start  h-[400px]'>

                        {/* react hook form */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 w-full h-full'>

                            {/* User Name */}
                            <div className='flex gap-[1.5rem] md:gap-2 lg:gap-4 justify-between lg:justify-center md:justify-end items-center mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                {/* first name */}
                                <div className='w-full flex gap-3'>
                                    <div className='w-2/3'>
                                        <input
                                            type='text'
                                            name="fname"
                                            placeholder="First Name"
                                            {...register("fname", { required: true })}
                                            className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none'
                                        />
                                        <div>
                                            {errors.fname && <span className='text-xs text-red-500'>This field is required</span>}
                                        </div>
                                    </div>
                                    {/* last name */}
                                    <div className='w-1/3'>
                                        <input
                                            type='text'
                                            name="lname"
                                            placeholder="Last Name"
                                            {...register("lname", { required: true })}
                                            className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                        />
                                        <div>
                                            {errors.lname && <span className='text-xs text-red-500'>This field is required</span>}
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* profile picture */}
                            <div className='flex gap-[1.5rem] md:gap-2 lg:gap-4 justify-between lg:justify-center md:justify-end items-center mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='w-full'>
                                    <input
                                        type='file'
                                        name="profile"
                                        {...register("profile", { required: true })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none pt-[0.4rem] text-xs'
                                    />
                                    <div>
                                        {errors.profile && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>

                            </div>

                            {/* date of birth and Phone Number */}
                            <div className='flex gap-3 mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='w-2/3'>
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
                                                    className="input input-bordered border-gray-300 w-[53vw] lg:w-[116%] h-9 md:w-full focus:outline-none"
                                                />
                                                <div>
                                                    {errors.dob && <span className='text-xs text-red-500 '>This field is required</span>}
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
                                {/* phone number */}
                                <div className=''>
                                    <input
                                        type='text'
                                        name="phone"
                                        placeholder="Phone"
                                        {...register("phone", { required: true })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                    />

                                    {/* error if field will be empty */}
                                    <div>
                                        {errors.phone && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                            </div>



                            {/* email address */}
                            <div className='flex mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='w-full '>
                                    <input
                                        type='email'
                                        name="email"
                                        placeholder="Email"
                                        {...register("email",
                                            {
                                                required: true,
                                                pattern: /\S+@\S+\.\S+/
                                            })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                    />
                                    {/* error if field will be empty */}
                                    <div>
                                        {errors.email?.type == "pattern" && <span className='text-xs text-red-500'>Please use email format</span>}
                                        {errors.email && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                            </div>

                            {/* password */}
                            <div className='flex  mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='relative w-full'>
                                    <input
                                        type={passwordType}
                                        name="password"
                                        placeholder='Password'
                                        {...register("password",
                                            {
                                                required: true,
                                                // minLength: 6,
                                                // maxLength: 20,
                                                // pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}/
                                            })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none' />
                                    <div>
                                        {errors.password?.type === "required" && <span className='text-xs text-red-600'>Password is required</span>}
                                        {/* {errors.password?.type === "minLength" && <span className='text-xs text-red-600'>Password should be 6 character or longer</span>} */}
                                        {/* {errors.password?.type === "maxLength" && <span className='text-xs text-red-600'>Password should be less then 20 character</span>} */}
                                        {/* {errors.password?.type === "pattern" && <span className='text-xs text-red-600'>Must contain 1 upercase,1 lowercase, 1 number and 1 special character.</span>} */}

                                    </div>
                                    <div className='absolute top-2 right-2'>
                                        <IoMdEyeOff className={`text-xl ${passwordType == 'text' && 'hidden'}`} onClick={() => { setPasswordType('text') }} />
                                        <IoMdEye className={`text-xl ${passwordType == 'password' && 'hidden'}`} onClick={() => { setPasswordType('password') }} />
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className='py-2'>
                                <label htmlFor="">
                                    <input type="checkbox" name="terms" id=""
                                        {...register("terms", { required: true })}
                                    /> &nbsp; Accept the Therms and Conditions
                                </label>
                                <div>
                                    {errors.terms && <span className='text-xs text-red-500'>Checked this field to sign up</span>}
                                </div>
                            </div>
                            {/* submit button */}
                            <div className='flex  mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='w-full'>
                                    <input
                                        type="submit"
                                        className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                                </div>
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