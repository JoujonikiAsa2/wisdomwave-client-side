import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Lottie from 'lottie-react';
import signUpAnimation from './signUp.json'
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';
import { PiSpinnerGapBold } from 'react-icons/pi';
const IMAGE_HOSTING_API = import.meta.env.VITE_IMAGE_HOSTINF_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_API}`


const TutorSignup = () => {

    const axiosPublic = useAxiosPublic()
    const [passwordType, setPasswordType] = useState('password')
    const [click, setClick] = useState(false)

    //  navigate helps to navigate the login page after succefully sign up

    const navigate = useNavigate()
    const location = useLocation()

    // get this from useAuth custom hook
    const { signUp, updateUserInfo } = useAuth()
    console.log(signUp)

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
        setClick(true)
        // console.log(data)
        const name = data.fullName
        const phoneNumber = parseInt(data.phone)
        const imageFile = { image: data.profile[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        // console.log(phone, name, res.data.data.display_url)
        const image = res.data.data.display_url
        // console.log(data)

        const tutorDetails = {
            name: data.fullName,
            profilePicture: image,
            age: data.age,
            location: data.location,
            phoneNumber: data.phone,
            email: data.email,
            userType: 'tutor',
            verified: false
        }

        console.log(tutorDetails)
        signUp(data.email, data.password)
            .then(result => {

                // console.log(result.user)

                updateUserInfo(name, phoneNumber, image)
                    .then((response) => {
                        console.log("updated")
                        // console.log(response.data)
                    })
                    .catch(error => console.log(error))

                // Sending a verification link
                sendEmailVerification(result.user)
                    .then(() => {
                        axiosPublic.post('/api/users', tutorDetails)
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        setClick(false)

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
                const errorMessage = error.message || 'An error occurred';
                setClick(true)
                toast.error(errorMessage);
            })

    }

    const randomString = Math.random().toString(36).substring(2);
    console.log(randomString)

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='flex flex-col justify-center items-center h-[80vh] max-w-[96rem] mx-auto mt-4'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[90vw] md:w-[50rem] lg:w-[60rem] h-[450px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>
                    <div className='flex-1 flex justify-center items-center h-full'>
                        <Lottie animationData={signUpAnimation} className="w-[300px] h-[300px]"></Lottie>
                    </div>
                    <div className='flex justify-center items-center'>
                        {/* vertical line */}
                        <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                    </div>
                    <div className='flex-1 flex flex-col justify-start  h-[300px]'>

                        {/* react hook form */}
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 w-full h-full'>

                            {/* User Name */}
                            <div className='flex gap-[1.5rem] md:gap-2 lg:gap-4 justify-between lg:justify-center md:justify-end items-center mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                {/* first name */}
                                <div className='w-full flex gap-3'>
                                    <div className='w-1/2'>
                                        <input
                                            type='text'
                                            name="fullName"
                                            placeholder="Full Name"
                                            {...register("fullName", { required: true })}
                                            className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                        />
                                        <div>
                                            {errors.fullName && <span className='text-xs text-red-500'>This field is required</span>}
                                        </div>
                                    </div>

                                    {/* profile picture */}
                                    <div className='w-1/2'>
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


                            </div>

                            {/* Age, Location and Phone Number */}
                            <div className='flex gap-3 mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='w-1/2'>
                                    <input
                                        type='number'
                                        name="age"
                                        placeholder="Age"
                                        {...register("age",
                                            {
                                                required: true,
                                            })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                    />
                                    <div>
                                        {errors.age && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                                <div className='w-1/2'>
                                    <input
                                        type='text'
                                        name="location"
                                        placeholder="Your Location"
                                        {...register("location", { required: true })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                    />

                                    {/* error if field will be empty */}
                                    <div>
                                        {errors.location && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>

                                {/* phone number */}

                            </div>



                            {/* email address */}
                            <div className='flex gap-3 mr-0 lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                <div className='w-1/2 '>
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

                                {/* phone number */}
                                <div className='w-1/2'>
                                    <input
                                        type='text'
                                        name="phone"
                                        placeholder="Phone"
                                        {...register("phone",
                                            {
                                                required: true,
                                            })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none'
                                    />
                                    <div>
                                        {errors.phone && <span className='text-xs text-red-500'>This field is required</span>}
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
                                        {/* {errors.password?.type === "minLength" && <span className='text-xs text-red-600'>Password should be 6 character or longer</span>}
                                        {errors.password?.type === "maxLength" && <span className='text-xs text-red-600'>Password should be less then 20 character</span>}
                                        {errors.password?.type === "pattern" && <span className='text-xs text-red-600'>Must contain 1 upercase,1 lowercase, 1 number and 1 special character.</span>} */}

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
                            <div className='flex w-full '>
                                {click == true ? (
                                    <button
                                        className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize'><PiSpinnerGapBold className='animate-spin text-2xl' ></PiSpinnerGapBold  ></button>
                                ) : (
                                    <div className='w-full mr-[0.5vw] lg:mr-[1.8rem] md:mr-[1.1rem]'>
                                        <input
                                            type="submit"
                                            value="Sign Up"
                                            className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                                    </div>
                                )}
                            </div>
                        </form>
                        <div className='flex flex-col justify-center items-center space-y-2'>
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

export default TutorSignup;