import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import { IoAdd } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
import { BiMinus } from 'react-icons/bi';
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
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    const [courseDetails, setCourseDetails] = useState(null)

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

    const [playListId, setPlayListId] = useState("")

    useEffect(() => {
        axiosPublic.get(`/api/courses/${id}`)
            .then(res => {
                console.log(res.data.data)
                setCourseDetails(res.data.data.courseDetails)
                setRequirements(res.data.data.courseDetails.requirements)
                setOutcomeFields(res.data.data.courseDetails.whatYouWillLearn)
                setOutlines(res.data.data.courseDetails.courseContents)

                const filterdSelected = res.data.data.courseDetails.languages?.map((item) => {
                    return { label: item, value: item }
                })

                setSelected(filterdSelected)
                setText(res.data.data.courseDetails.courseDescription)
                console.log(res.data.data.courseDetails.courseDescription)
                setPlayListId(res.data.data.courseDetails.playlistId)
            })
            .catch(error => {
                console.log(error)
            })
    }, [id])

    // Define options for language selection
    const options = [
        { label: "english", value: "english" },
        { label: "bengali", value: "bengali" },
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

    const handleRequirementRemoveField = (event) => {
        event.preventDefault();
        const filterd = requirements.filter((res) => res !== '')
        setRequirements([...filterd]);
    }

    const handleOutcomeRemoveField = (event) => {
        event.preventDefault();
        const filterd = outcomeFields.filter((res) => res !== '')
        setOutcomeFields([...filterd]);
    }

    const handleOutlineRemoveField = (event) => {
        event.preventDefault();
        const filterd = outlines.filter((res) => res.title !== '' && res.content !== '')
        setOutlines([...filterd]);
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

    // Help to execute all function after submit the form
    const onSubmit = async (data) => {

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
                totalLiveClasses: data.totalLiveClass !== "" ? data.totalLiveClass : courseDetails.totalLiveClasses,
                duration: data.duration !== "" ? data.duration : courseDetails.duration,
                enrollFee: data.courseFee !== "" ? data.courseFee : courseDetails.enrollFee,
                whatYouWillLearn: outcomeFields,
                courseDescription: text,
                languages: data?.languages !== "" ? [...mapSelect] : [...courseDetails.languages],
                introductoryVideo: data.introductoryVideo !== "" ? data.introductoryVideo : courseDetails.introductoryVideo,
                courseContents: outlines,
                requirements: requirements,
                enrollmentDates: {
                    enrollStart: data?.enrollStart !== "" ? data.enrollStart : courseDetails.enrollmentDates?.enrollStart,
                    enrollEnd: data?.enrollEnd !== "" ? data.enrollEnd : courseDetails.enrollmentDates?.enrollEnd,
                },
                category: data?.category !== "" ? data.category : courseDetails.category,
                classStart: data.classStart !== "" ? data.classStart : courseDetails.classStart,
                subtitle: data.courseSubTitle !== "" ? data.courseSubTitle : courseDetails.subtitle,
                totalStudents: courseDetails?.totalStudents,
                playlistId: data.playlistLink === "" ? courseDetails?.playlistId : data.playlistLink,
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
            toast.error("Course updated failed. Please try again")

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
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="category">
                                    <p className='text-base text-gray-500'>Course category<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='category'
                                        defaultValue={courseDetails?.category}
                                        {...register("category")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseTitle">
                                    <p className='text-base text-gray-500'>Course title<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseTitle'
                                        defaultValue={courseDetails?.title}
                                        {...register("courseTitle")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseSubTitle">
                                    <p className='text-base text-gray-500'>Course subtitle<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseSubTitle'
                                        defaultValue={courseDetails?.subtitle}
                                        {...register("courseSubTitle")} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="thumbnail">
                                    <p className='text-base text-gray-500'>Course thumbnail<span className='text-red-500'>*</span> </p>
                                    <div className='flex gap-4 items-end'>
                                        <img src={courseDetails?.thumbnail} alt="" className='w-32 h-20' />
                                        <input
                                            type='file'
                                            name="thumbnail"
                                            {...register("thumbnail")}
                                            className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-sm pt-[0.2rem]'
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="language">
                                    <p className='text-base text-gray-500'>Language<span className='text-red-500'>*</span> </p>
                                    <MultiSelect
                                        value={[...selected]}
                                        options={options}
                                        onChange={setSelected}
                                        labelledBy="Select"
                                    />
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] flex justify-between items-center'>
                                <div className='w-full flex flex-col gap-2 justify-center items-start'>
                                    <p className="text-base text-gray-500">Requirements</p>
                                    <div className='w-full flex flex-col gap-2'>
                                        {requirements?.map((requirement, index) => (
                                            <div key={courseDetails?.requirements.length + index} className="w-full flex flex-col gap-2 mb-2">
                                                <div className='w-full'>
                                                    <label className='flex gap-2'>
                                                        <input
                                                            type="text"
                                                            name={requirement}
                                                            placeholder={`Requirement ${index + 1}`}
                                                            defaultValue={requirement}
                                                            onChange={(event) => handleRequirementOnChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex gap-2'>
                                        <button onClick={handleRequirementAddField} className="mb-6 btn btn-circle">
                                            <IoAdd className='text-xl'></IoAdd>
                                        </button>
                                        <button className='btn btn-circle' onClick={handleRequirementRemoveField}><BiMinus className='text-xl'></BiMinus></button>
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
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="playlistLink">
                                    <p className='text-base text-gray-500'>Youtube playlist link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='playlistLink'
                                        defaultValue={playListId}
                                        // value={playList}
                                        {...register("playlistLink")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
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
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseFee">
                                    <p className='text-base text-gray-500'>Enroll fee<span className='text-red-500'>*</span> </p>
                                    <input type="number" name="courseFee"
                                        defaultValue={courseDetails?.enrollFee}
                                        {...register("courseFee")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
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
                            </div>
                            <div className='w-full lg:w-[80%]  flex justify-between items-center'>
                                <div className='w-full  flex flex-col justify-center items-start gap-2'>
                                    <div className='w-full flex flex-col gap-2'>
                                        <p className="text-base text-gray-500">Outcome</p>
                                        {outcomeFields?.map((field, index) => (
                                            <div key={index + 1} className="w-full flex flex-col gap-2">
                                                <div>
                                                    <label>

                                                        <input
                                                            type="text"
                                                            name={field}
                                                            defaultValue={field}
                                                            placeholder={`Outcome ${index + 1}`}
                                                            onChange={(event) => handleOutcomeChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />

                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex justify-center items-center gap-2 py-2'>
                                        <button onClick={handleOutcomeFieldAdd} className="btn btn-circle">
                                            <IoAdd className='text-xl'></IoAdd>
                                        </button>
                                        <button className='btn btn-circle' onClick={handleOutcomeRemoveField}><BiMinus className='text-xl'></BiMinus></button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%]  flex justify-between items-center'>
                                <div className='w-full   flex flex-col justify-center items-start gap-2'>
                                    <div className='w-full  flex flex-col gap-2'>
                                        <p className="text-base text-gray-500">Outline</p>
                                        {/* shows new fields */}
                                        {outlines?.map((field, index) => (
                                            <div key={index + 1 + totalCourseContent} className="w-full flex flex-row gap-2 ">
                                                <div className='w-1/2'>
                                                    <label >
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            defaultValue={field.title}
                                                            placeholder={`Title ${index + 1}`}
                                                            onChange={(event) => handleOutlineChange(index, event)} // Use handleOutlineChange for outlines
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                                <div className='w-1/2'>
                                                    <label >
                                                        <input
                                                            type="text"
                                                            name="content"
                                                            defaultValue={field.content}
                                                            placeholder={`Content ${index + 1}`}
                                                            onChange={(event) => handleOutlineChange(index, event)} // Use handleOutlineChange for outlines
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex gap-2 py-2'>
                                        <button onClick={handleOutlineAddField} className="btn btn-circle">
                                            <IoAdd className='text-xl'></IoAdd>
                                        </button>
                                        <button className='btn btn-circle' onClick={handleOutlineRemoveField}><BiMinus className='text-xl'></BiMinus></button>
                                    </div>

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
                                        className='w-full lg:w-[80%]  bg-white'
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