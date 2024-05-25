import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from 'react-hot-toast';
import { sendEmailVerification } from 'firebase/auth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
'../../hooks/useAxiosPublic';
const IMAGE_HOSTING_API = import.meta.env.VITE_IMAGE_HOSTINF_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_API}`
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../../Layout/styles.css'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import { IoAdd } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
const UpdateCourse = () => {

    // react hook form built in function desctructuring
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm()

    const { id } = useParams()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();

    const { data: courseDetails = [] } = useQuery({
        queryKey: ['courseDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/courses/${id}`)
            console.log(res.data.data.courseDetails)
            return res.data.data.courseDetails
        }
    })
    console.log("Course details: ", courseDetails)



    // State for handling the content field
    const [text, setText] = useState("");
    // State for handling the outline new field
    const [outlines, setOutlines] = useState([]);
    // State for handling the outcome new field
    const [outcomeFields, setOutcomeFields] = useState([]);
    // State for handling the requirements
    const [requirements, setRequirements] = useState([]);
    // State for storing selected languages
    const [selected, setSelected] = useState([]);

    // Define options for language selection
    const options = [
        { label: "English", value: "english" },
        { label: "Bengali", value: "bengali" },
        { label: "Hindi", value: "hindi" },
    ];

    // Handle adding a new outcome field
    const handleOutcomeFieldAdd = (event) => {
        event.preventDefault();
        setOutcomeFields([...outcomeFields, '']);
    };

    // Handle updating the new outcome field value
    const handleOutcomeChange = (index, event) => {
        const { value } = event.target;
        const newFields = [...outcomeFields];
        newFields[index] = value;
        setOutcomeFields(newFields);
    }

    // Handle adding a new outline field
    const handleOutlineAddField = (event) => {
        event.preventDefault();
        setOutlines([...outlines, { title: '', content: '' }]);
    };

    // Handle updating outline's new field value
    const handleOutlineChange = (index, event) => {
        const { name, value } = event.target;
        const newFields = [...outlines];
        // Check if the object at the index exists, if not, create it
        if (!newFields[index]) {
            newFields[index] = { title: '', content: '' };
        }
        newFields[index][name] = value;
        setOutlines(newFields);
    };


    // Handle adding a new requirement field
    const handleRequirementAddField = (event) => {
        event.preventDefault();
        setRequirements([...requirements, '']);
    }

    // Handle updating requirement field value
    const handleRequirementOnChange = (index, event) => {
        const { value } = event.target;
        const newRequirements = [...requirements];
        newRequirements[index] = value;
        setRequirements(newRequirements);
    }

    // Handle changing the content field
    const handleChange = (value) => {
        setText(value);
    };


    const totalCourseContent = courseDetails?.courseContents?.length
    const totalRequirement = courseDetails?.requirements?.length
    const totalOutcome = courseDetails?.whatYouWillLearn?.length
    const mapSelect = selected.map(res => { return res.value })
    console.log(mapSelect)


    // Define the modules for Quill editor toolbar
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'script': 'sub' }, { 'script': 'super' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }, { 'header': [1, 2, 3, 4, 5, 6, false] }, { 'color': [] }, { 'background': [] }, { 'align': [] }],
            ['link', 'clean']
        ]
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // Adding 1 since getMonth() returns zero-based month (0-11)
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
    };

    console.log(new Date("2023-10-01T00:00:00.000Z").toLocaleDateString())
    console.log("2023-10-01T00:00:00.000Z".slice(0, 10))



    // Help to execute all function after submit the form
    const onSubmit = async (data) => {
        // console.log(data)
        // const imageFile = { image: data?.thumbnail[0] }
        // const res = await axiosPublic.post(image_hosting_api, imageFile, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // })

        // // console.log(phone, name, res.data.data.display_url)
        // const image = res.data.data.display_url

        let image = undefined;
        if (data?.thumbnail && data.thumbnail.length > 0) {
            const imageFile = { image: data.thumbnail[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            image = res.data.data.display_url;
        }

        const courseData = {
            courseDetails: {
                thumbnail: image ? image : courseDetails.thumbnail,
                title: data.courseTitle !== "" ? data.courseTitle : courseDetails.title,
                instructor: data.yourName !== "" ? data.yourName : courseDetails.instructor,
                instructorEmail: courseDetails.instructorEmail,
                rating: courseDetails.rating,
                totalStudents: courseDetails.totalStudents,
                totalVideo: data.totalVideo !== "" ? data.totalVideo : courseDetails.totalVideo,
                totalLiveClasses: data.totalLiveClass  !== "" ? data.totalLiveClass : courseDetails.totalLiveClasses,
                duration: data.duration !== "" ? data.duration : courseDetails.duration,
                enrollFee: data.courseFee !== "" ? data.courseFee : courseDetails.enrollFee,
                whatYouWillLearn: [...courseDetails.whatYouWillLearn, ...outcomeFields],
                courseDescription: text,
                languages: data?.languages !== "" ? [...mapSelect] : [...courseDetails.languages],
                introductoryVideo: data.introductoryVideo,
                courseContents: [...courseDetails.courseContents, ...outlines],
                requirements: [...courseDetails.requirements, ...requirements],
                enrollmentDates: {
                    enrollStart: data?.enrollStart !== "" ? data.enrollStart : courseDetails.enrollmentDates?.enrollStart,
                    enrollEnd: data?.enrollEnd !== "" ? data.enrollEnd : courseDetails.enrollmentDates?.enrollEnd,
                },
                category: data?.category !== "" ? data.category : courseDetails.category,
                classStart: data.classStart !== "" ? data.classStart : courseDetails.classStart,
                subtitle: data.courseSubTitle !== "" ? data.courseSubTitle : courseDetails.subtitle,
                totalStudents: courseDetails?.totalStudents,
                playlistId: data.playlistLink.split("=")[1] !== "" ? data.playlistLink.split("=")[1] : courseDetails.playlistId,
                courseDescription: text.length > 0 ? text : courseDetails.courseDescription
            }
        }
        console.log(courseData)

        try {
            const res = await axiosPublic.patch(`/api/courses/${id}`, courseData);
            console.log(res.data);
            if (res, data) {
                toast.success("Course updated successfully")
            }
        } catch (err) {
            console.log(err);
            toast.success("Course updated failed. Please try again")

        }

    }



    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='w-full' id='Update-course'>
                <div className=' w-full'>
                    <DashboardTitle title="Update Course" subTitle="Update your course information"></DashboardTitle>
                </div>
                <div className='flex flex-wrap gap-5 justify-start items-start mb-8'>
                    <div className=''>
                        <details>
                            <summary>Check how to create playlist link</summary>
                            <ol className='list-decimal pl-8 py-2'>
                                <li>Go to you tube and create a playlist for your course</li>
                                <li>Make all video public</li>
                                <li>view the playlist</li>
                                <li>Copy the playlist url</li>
                                <li>Provide the playlist url in the form</li>
                            </ol>
                        </details>
                    </div>
                </div>
                <div className='w-full pb-8'>
                    <form action="" className='w-full ' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full flex flex-col justify-center items-center gap-4' >
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="yourName">
                                    <p className='text-base text-gray-500'>Yout name<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='yourName'
                                        defaultValue={courseDetails?.instructor}
                                        {...register("yourName")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' de />
                                </label>
                                <div>
                                    {errors.yourName && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="category">
                                    <p className='text-base text-gray-500'>Course category<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='category'
                                        defaultValue={courseDetails?.category}
                                        {...register("category")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.category && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseTitle">
                                    <p className='text-base text-gray-500'>Course title<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseTitle'
                                        defaultValue={courseDetails?.title}
                                        {...register("courseTitle")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.courseTitle && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseSubTitle">
                                    <p className='text-base text-gray-500'>Course subtitle<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseSubTitle'
                                        defaultValue={courseDetails?.subtitle}
                                        {...register("courseSubTitle")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.courseSubTitle && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="thumbnail"><p className='text-base text-gray-500'>Course thumbnail<span className='text-red-500'>*</span> </p>
                                    <input
                                        type='file'
                                        name="thumbnail"
                                        {...register("thumbnail")}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-sm pt-[0.2rem]'
                                    />
                                </label>
                                <div>
                                    {errors.thumbnail && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            {/* <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="objective">
                                    <p className='text-base text-gray-500'>Course objective<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='objective' {...register("objective")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.objective && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div> */}
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="language">
                                    <p className='text-base text-gray-500'>Language<span className='text-red-500'>*</span> </p>
                                    <MultiSelect
                                        options={options}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                    />
                                </label>
                                <div>
                                    {errors.language && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] flex justify-between items-center'>
                                <div className='w-full flex flex-col gap-2'>
                                    <p className='text-base text-gray-500'>Course requirements<span className='text-red-500'>*</span> </p>
                                    <div className='w-full flex flex-row gap-2 justify-center items-start'>
                                        <div className='w-full flex-col gap-2'>

                                            {courseDetails?.requirements?.map((requirement, index) => (
                                                <div key={index} className="w-full flex flex-col gap-2 mb-2">
                                                    <div className='w-full'>
                                                        <label htmlFor={`requirement${index + 1}`}>
                                                            <input
                                                                type="text"
                                                                name={`requirement${index + 1}`}
                                                                id={`requirement${index + 1}`}
                                                                defaultValue={requirement}
                                                                disabled
                                                                className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                            />

                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-row gap-2 justify-center items-start'>
                                        <div className='w-full flex-col gap-2'>

                                            {requirements?.map((requirement, index) => (
                                                <div key={index + 1 + totalRequirement} className="w-full flex flex-col gap-2 mb-2">
                                                    <div className='w-full'>
                                                        <label htmlFor={`requirement${index + 1 + totalRequirement}`}>
                                                            <input
                                                                type="text"
                                                                name={`requirement`}
                                                                id={`requirement${index + 1 + totalRequirement}`}
                                                                placeholder={`Requirement ${index + 1 + totalRequirement}`}
                                                                onChange={(event) => handleRequirementOnChange(index, event)}
                                                                className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                            />

                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={handleRequirementAddField} className="mb-6 btn btn-circle">
                                            <IoAdd className='text-xl'></IoAdd>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="introductoryVideo">
                                    <p className='text-base text-gray-500'>Introductory video link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='introductoryVideo'
                                        defaultValue={courseDetails?.introductoryVideo}
                                        {...register("introductoryVideo")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.introductoryVideo && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="playlistLink">
                                    <p className='text-base text-gray-500'>Youtube playlist link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='playlistLink'
                                        defaultValue={`https://www.youtube.com/playlist?list=${courseDetails?.playlistId}`}
                                        {...register("playlistLink")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.introductoryVideo && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="enrollStart">
                                    <p className='text-base text-gray-500'>Enrollment start<span className='text-red-500'>*</span> </p>
                                    <input
                                        type="date"
                                        name='enrollStart'
                                        value={courseDetails?.enrollmentDates?.enrollStart?.slice(0, 10)}
                                        {...register("enrollStart")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase text-gray-500'
                                    />
                                </label>
                                <div>
                                    <div>
                                        {errors.enrollStart && <span className='text-base text-red-500'>This field is required</span>}
                                    </div>
                                </div>
                            </div>

                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="enrollEnd">
                                    <p className='text-base text-gray-500'>Enrollment end<span className='text-red-500'>*</span> </p>
                                    <input
                                        type="date"
                                        name='enrollEnd'
                                        defaultValue={courseDetails?.enrollmentDates?.enrollEnd?.slice(0, 10)}
                                        {...register("enrollEnd")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase text-gray-500'
                                    />
                                </label>
                                <div>
                                    {errors.enrollEnd && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="classStart">
                                    <p className='text-base text-gray-500'>Class start<span className='text-red-500'>*</span> </p>
                                    <input
                                        type="date"
                                        name='classStart'
                                        value={courseDetails?.classStart?.slice(0, 10)}
                                        {...register("classStart")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase text-gray-500'
                                    />
                                </label>
                                <div>
                                    {errors.classStart && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="duration">
                                    <p className='text-base text-gray-500'>Course duration<span className='text-red-500'>*</span> </p>
                                    <input type="number"
                                        name='duration'
                                        defaultValue={courseDetails?.duration}
                                        {...register("duration")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase  text-gray-500' />
                                </label>
                                <div>
                                    {errors.duration && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseFee">
                                    <p className='text-base text-gray-500'>Enroll fee<span className='text-red-500'>*</span> </p>
                                    <input type="number" name="courseFee"
                                        defaultValue={courseDetails?.enrollFee}
                                        {...register("courseFee")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.courseFee && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="totalVideo"><p className='text-base text-gray-500'>Total recorded video<span className='text-red-500'>*</span> </p>
                                    <input
                                        type='number'
                                        name="totalVideo"
                                        defaultValue={courseDetails?.totalVideo}
                                        {...register("totalVideo")}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base'
                                    />
                                </label>
                                <div>
                                    {errors.totalVideo && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="totalLiveClass"><p className='text-base text-gray-500'>Total live class<span className='text-red-500'>*</span> </p>
                                    <input
                                        type='number'
                                        name="totalLiveClass"
                                        defaultValue={courseDetails?.totalLiveClasses}
                                        {...register("totalLiveClass")}
                                        className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base'
                                    />
                                </label>
                                <div>
                                    {errors.totalLiveClass && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%]  flex justify-between items-center'>
                                <div className='w-full lg:w-[60%] flex lg:flex-row flex-col justify-center items-start gap-2'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <p className="text-base text-gray-500">Outcome</p>
                                        {courseDetails?.whatYouWillLearn?.map((field, index) => (
                                            <div key={index} className="w-full flex flex-col gap-2">
                                                <div>
                                                    <label htmlFor={`outcome${index + 1}`}>

                                                        <input
                                                            type="text"
                                                            name={`outcome${index + 1}`}
                                                            id={`outcome${index + 1}`}
                                                            defaultValue={field}
                                                            disabled
                                                            onChange={(event) => handleOutcomeChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />

                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {outcomeFields?.map((field, index) => (
                                            <div key={index + 1 + totalOutcome} className="w-full flex flex-col gap-2">
                                                <div>
                                                    <label htmlFor={`outcome${index + 1 + totalOutcome}`}>

                                                        <input
                                                            type="text"
                                                            name={`outcome${index + 1 + totalOutcome}`}
                                                            id={`outcome${index + 1 + totalOutcome}`}
                                                            placeholder={`Outcome ${index + 1 + totalOutcome}`}
                                                            onChange={(event) => handleOutcomeChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />

                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleOutcomeFieldAdd} className="mt-6 btn btn-circle">
                                        <IoAdd className='text-xl'></IoAdd>
                                    </button>
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%]  flex justify-between items-center'>
                                <div className='w-full   flex lg:flex-row flex-col justify-center items-start gap-2'>
                                    <div className='w-full  flex flex-col gap-2'>
                                        <p className="text-base text-gray-500">Outline</p>
                                        {/* Loaded course contents */}
                                        <div className=''>
                                            {courseDetails?.courseContents && courseDetails?.courseContents?.map((field, index) => (
                                                <div key={index} className="w-full flex flex-row gap-2 mb-2">
                                                    <div className='w-1/2'>
                                                        <label htmlFor={`contentTitle${index + 1}`}>
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                id={`contentTitle${index + 1}`}
                                                                value={field.title}
                                                                disabled
                                                                className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <label htmlFor={`content${index + 1}`}>
                                                            <input
                                                                type="text"
                                                                name="content"
                                                                id={`content${index + 1}`}
                                                                value={field.content}
                                                                disabled
                                                                className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* shows new fields */}
                                        {outlines?.map((field, index) => (
                                            <div key={index + 1 + totalCourseContent} className="w-full flex flex-row gap-2 ">
                                                <div className='w-1/2'>
                                                    <label htmlFor={`contentTitle${index + 1 + totalCourseContent}`}>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id={`contentTitle${index + 1 + totalCourseContent}`}
                                                            value={field.title}
                                                            placeholder={`Title ${index + 1 + totalCourseContent}`}
                                                            onChange={(event) => handleOutlineChange(index, event)} // Use handleOutlineChange for outlines
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                                <div className='w-1/2'>
                                                    <label htmlFor={`content${index + 1 + totalCourseContent}`}>
                                                        <input
                                                            type="text"
                                                            name="content"
                                                            id={`content${index + 1 + totalCourseContent}`}
                                                            value={field.content}
                                                            placeholder={`Content ${index + 1 + totalCourseContent}`}
                                                            onChange={(event) => handleOutlineChange(index, event)} // Use handleOutlineChange for outlines
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleOutlineAddField} className="mt-4 btn btn-circle">
                                        <IoAdd className='text-xl'></IoAdd>
                                    </button>
                                </div>

                            </div>

                            <div className='w-full lg:w-[80%] flex justify-center'>
                                <label htmlFor="">
                                    <p className='text-base text-gray-500'>Short Description about your course<span className='text-red-500'>*</span> </p>
                                    <ReactQuill
                                        theme='snow'
                                        value={text}
                                        modules={modules}
                                        onChange={handleChange}
                                        className='w-full bg-white'
                                        required
                                    />
                                </label>
                            </div>

                        </div>
                        <div className='w-ful flex justify-center items-center py-10'>
                            <input type="submit" value="Update" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
};

export default UpdateCourse;