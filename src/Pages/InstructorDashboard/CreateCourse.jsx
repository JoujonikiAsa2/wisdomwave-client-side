import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../../Layout/styles.css'
import { IoAdd } from 'react-icons/io5';
const CreateCourse = () => {
    const axiosPublic = useAxiosPublic();
    const [text, setText] = useState("");
    const [fields, setFields] = useState([{ title: '', content: '' }]);
    const [outcomeFields, seOutcomeFields] = useState(['']);

    const handleOutcomeFieldAdd = (event) => {
        event.preventDefault();
        seOutcomeFields([...outcomeFields, '']);
    };

    const handleOutcomeChange = (index, event) => {
        const { name, value } = event.target;
        const newOutcomeFields = [...outcomeFields];
        newOutcomeFields[index][name] = value;
        setOutcomeFields(newOutcomeFields);
    }

    const handleOulineAddField = (event) => {
        event.preventDefault();
        setFields([...fields, { title: '', content: '' }]);
    };

    const handleOulineChange = (index, event) => {
        const { name, value } = event.target;
        const newFields = [...fields];
        newFields[index][name] = value;
        setFields(newFields);
    };

    const handleChange = (value) => {
        setText(value);
    };

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

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'], //text style tool

            // [{ 'header': 1 }, { 'header': 2 }],               
            [{ 'list': 'ordered' }, { 'list': 'bullet' },  //listing tools
            { 'script': 'sub' }, { 'script': 'super' },   // subscript and superscript
            { 'indent': '-1' }, { 'indent': '+1' },      //indent tools      
            { 'direction': 'rtl' },                    //text direction tools
            { 'header': [1, 2, 3, 4, 5, 6, false] },   //heading tags

            { 'color': [] }, { 'background': [] },     //text color changer tools
            { 'align': [] }],                           //aligment tool
            ['link', 'clean']                    //cleaner
        ]
    };

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='w-full' id='create-course'>
                <div className=' w-full'>
                    <DashboardTitle title="Create Course" subTitle="Fillup the form to create your course"></DashboardTitle>
                </div>
                <div className='flex flex-wrap gap-5 justify-start items-start mb-8'>
                    <div className=''>
                        <h3 className='text-base font-bold'>Instructions</h3>
                        <ol className='list-decimal pl-8 py-2'>
                            <li>Go to you tube and create a playlist for your course</li>
                            <li>Make all video public</li>
                            <li>view the playlist</li>
                            <li>Copy the playlist url</li>
                            <li>Provide the playlist url in the form</li>
                        </ol>
                    </div>
                </div>
                <div className='w-full pb-8'>
                    <form action="">
                        <div className='w-full flex flex-col justify-center items-center gap-2' >
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="yourName">
                                    <p className='text-base text-gray-500'>Yout name<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='youtName' {...register("yourName", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.yourName && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="email">
                                    <p className='text-base text-gray-500'>Your email<span className='text-red-500'>*</span> </p>
                                    <input type="email" name='email'  {...register("email", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.email && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="category">
                                    <p className='text-base text-gray-500'>Course category<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='category' {...register("category", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.category && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseTitle">
                                    <p className='text-base text-gray-500'>Course title<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseTitle' {...register("courseTitle", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.courseTitle && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseSubTitle">
                                    <p className='text-base text-gray-500'>Course subtitle<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseSubTitle'  {...register("courseSubTitle", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.courseSubTitle && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="thumbnail"><p className='text-base text-gray-500'>Course thumbnail<span className='text-red-500'>*</span> </p>
                                    <input
                                        type='file'
                                        name="thumbnail"
                                        {...register("thumbnail", { required: true })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none pt-[0.4rem] text-xs'
                                    />
                                </label>
                                <div>
                                    {errors.thumbnail && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="objective">
                                    <p className='text-base text-gray-500'>Course objective<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='objective' {...register("objective", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.objective && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="language">
                                    <p className='text-base text-gray-500'>Language<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='language' {...register("language", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.language && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="technologies">
                                    <p className='text-base text-gray-500'>Technologies<span className='text-red-500'>*</span> </p>
                                    <input type="email" name="technologies"  {...register("technologies", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.technologies && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="skills">
                                    <p className='text-base text-gray-500'>Skills required <span className='text-red-500'>*</span> </p>
                                    <input type="text" name='skills' className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.skills && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="introductoryVideo">
                                    <p className='text-base text-gray-500'>Introductory video link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='introductoryVideo' {...register("introductoryVideo", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.introductoryVideo && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="playlistLink">
                                    <p className='text-base text-gray-500'>Youtube playlist link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='playlistLink' {...register("playlistLink", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.introductoryVideo && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="enrollStart">
                                    <p className='text-base text-gray-500'>Enrollment start<span className='text-red-500'>*</span> </p>
                                    <input
                                        type="date"
                                        name='enrollStart'
                                        {...register("enrollStart", { required: true })}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none text-gray-500'
                                    />
                                </label>
                                <div>
                                    <div>
                                        {errors.enrollStart && <span className='text-xs text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                            </div>

                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="enrollEnd">
                                    <p className='text-base text-gray-500'>Enrollment end<span className='text-red-500'>*</span> </p>
                                    <input
                                        type="date"
                                        name='enrollEnd'
                                        {...register("enrollEnd", { required: true })}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none text-gray-500'
                                    />
                                </label>
                                <div>
                                    {errors.enrollEnd && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="classStart">
                                    <p className='text-base text-gray-500'>Class start<span className='text-red-500'>*</span> </p>
                                    <input
                                        type="date"
                                        name='classStart'
                                        {...register("classStart", { required: true })}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none text-gray-500'
                                    />
                                </label>
                                <div>
                                    {errors.classStart && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="duration">
                                    <p className='text-base text-gray-500'>Course duration<span className='text-red-500'>*</span> </p>
                                    <input type="number" name='duration' {...register("duration", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none  text-gray-500' />
                                </label>
                                <div>
                                    {errors.duration && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseFee">
                                    <p className='text-base text-gray-500'>Course fee<span className='text-red-500'>*</span> </p>
                                    <input type="number" name="courseFee"  {...register("courseFee", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none' />
                                </label>
                                <div>
                                    {errors.courseFee && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="totalVideo"><p className='text-base text-gray-500'>Total recorded video<span className='text-red-500'>*</span> </p>
                                    <input
                                        type='number'
                                        name="totalVideo"
                                        {...register("totalVideo", { required: true })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none pt-[0.4rem] text-xs'
                                    />
                                </label>
                                <div>
                                    {errors.totalVideo && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="totleLiveClass"><p className='text-base text-gray-500'>Total live class<span className='text-red-500'>*</span> </p>
                                    <input
                                        type='number'
                                        name="totleLiveClass"
                                        {...register("totleLiveClass", { required: true })}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none pt-[0.4rem] text-xs'
                                    />
                                </label>
                                <div>
                                    {errors.totleLiveClass && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] flex justify-between items-center'>
                               <div className='w-full flex flex-col gap-2'>
                                    {
                                        outcomeFields.map((outcome, index) => <div className='w-full flex flex-col gap-2'>
                                            <label htmlFor={`contentTitle`}>
                                                <p className='text-base text-gray-500'>Outcome {index+1}<span className='text-red-500'>*</span></p>
                                                <input
                                                    type='text'
                                                    name={`outcomes`}
                                                    {...register(`outcomes`, { required: true })}
                                                    onChange={(event) => handleOutcomeChange(event, index)}
                                                    className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base'
                                                />
                                            </label>
                                            <div>
                                                {errors.outcomes && <span className='text-xs text-red-500'>This field is required</span>}
                                            </div>
                                        </div>)
                                    }
                                    <button onClick={handleOutcomeFieldAdd} className="mb-2 btn btn-circle">
                                        <IoAdd></IoAdd>
                                    </button>
                               </div>
                            </div>
                            <div className='w-full flex flex-col lg:w-[80%]  justify-between items-start'>
                                <div><p className='text-gray-500'>Course Outline  <span className='text-red-500'>*</span></p> </div>
                                <div className='w-full' id='outline'>
                                    <div className='flex flex-col gap-2'>
                                        {fields.map((field, index) => (
                                            <div key={index} className="w-full flex flex-col gap-2">
                                                <div>
                                                    <label htmlFor={`contentTitle${index}`}>
                                                        <p className="text-base text-gray-500">Title {index+1}</p>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id={`contentTitle${index}`}
                                                            value={field.title}
                                                            onChange={(event) => handleOulineChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                                <div>
                                                    <label htmlFor={`content${index}`}>
                                                        <p className="text-base text-gray-500">Content</p>
                                                        <input
                                                            type="text"
                                                            name="content"
                                                            id={`content${index}`}
                                                            value={field.content}
                                                            onChange={(event) => handleFieldChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={handleOulineAddField} className="mt-4 btn btn-circle">
                                            <IoAdd></IoAdd>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex justify-center'>
                                <label htmlFor="">
                                    <p className='text-base text-gray-500'>Short Description about your course<span className='text-red-500'>*</span> </p>
                                    <ReactQuill
                                        theme='snow'
                                        value={text}
                                        modules={modules}
                                        onChange={handleChange}
                                        className='w-[100%] bg-white'
                                        required
                                    />
                                </label>
                            </div>

                        </div>
                        <div className='w-ful flex justify-center items-center py-10'>
                            <input type="submit" value="Create" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateCourse;