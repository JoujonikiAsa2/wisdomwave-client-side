import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaArrowAltCircleDown, FaArrowCircleLeft, FaFacebook } from "react-icons/fa";
import Lottie from 'lottie-react';
import signUpAnimation from './signUp.json'

const StudentSignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div className='flex justify-center items-center md:min-h-screen lg:min-h-screen min-h-[1000px] max-w-[96rem] mx-auto'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[700px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>
                <div className='flex-1 flex justify-end'>
                    <div className='flex p-8'>
                        <Link to='/'><FaArrowCircleLeft className='text-2xl'></FaArrowCircleLeft></Link>
                    </div>
                    <Lottie animationData={signUpAnimation} className="max-w-[500px] h-[600px]"></Lottie>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                </div>
                <div className='flex-1 flex flex-col justify-start'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='flex gap-4'>
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
                        <div>
                            <input
                                type='file'
                                name="profile"
                                {...register("profile", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96 p-2'
                            />
                            {errors.profile && <span>This field is required</span>}
                        </div>
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

                        <div>
                            <input
                                type='password'
                                name="password"
                                placeholder='Password'
                                {...register("password", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96' />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div>
                            <input
                                type="submit"
                                className='btn bg-blue-500 hover:btn-outline input input-bordered border-black w-[80vw] md:w-96 lg:w-96 capitalize' />
                        </div>
                        <div className="">
                            <div className="divider divider-neutral py-2 w-[80vw] md:w-96 lg:w-96">OR</div>
                        </div>
                        <div className='flex justify-start gap-4'>
                            <FcGoogle className=' text-3xl md:text-3xl lg:text-4xl font-bold'></FcGoogle >
                            <FaFacebook className='text-blue-700 text-3xl md:text-3xl lg:text-4xl font-bold'></FaFacebook>
                        </div>
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