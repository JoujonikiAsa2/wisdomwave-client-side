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
import { MultiSelect } from "react-multi-select-component";

const CreateCourse = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();

    // state for handling the content field
    const [text, setText] = useState("");

    // state for handling the outline new field
    const [outlines, setOutlines] = useState([{ title: '', content: '' }]);

    // state for handling the otcome new field
    const [outcomeFields, setOutcomeFields] = useState(['']);

    const [requirements, setRequirements] = useState([''])

    // for multi selector
    const [selected, setSelected] = useState([]);

    const options = [
        { label: "English", value: "english" },
        { label: "bengali", value: "bengali" },
        { label: "Hindi", value: "hindi" },
    ];

    const mapSelect = selected.map(res => { return res.value })
    console.log(mapSelect)


    // for Outcome
    // ADD NEW FIELD FOR OUTCOME
    const handleOutcomeFieldAdd = (event) => {
        event.preventDefault();
        setOutcomeFields([...outcomeFields, '']);
    };

    // update the new field value to the state
    const handleOutcomeChange = (index, event) => {
        const { value } = event.target;
        const newFields = [...outcomeFields];
        newFields[index] = value;
        setOutcomeFields(newFields);
    }


    // for outline
    // add new field for outline
    const handleOulineAddField = (event) => {
        event.preventDefault();
        setOutlines([...outlines, { title: '', content: '' }]);
    };

    // update outline's new field value
    const handleOulineChange = (index, event) => {
        const { name, value } = event.target;
        const newFields = [...outlines];
        newFields[index][name] = value;
        setOutlines(newFields);
    };

    // for requirements
    const handleRequirementAddField = (event) => {
        event.preventDefault();
        setRequirements([...requirements, ''])
        console.log([...requirements])
    }

    const handleRequirementOnchange = (index, event) => {
        const { value } = event.target
        const newRequirements = [...requirements]
        newRequirements[index] = value
        setRequirements(newRequirements)
    }

    const handleChange = (value) => {
        setText(value);
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)
        const imageFile = { image: data.thumbnail[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        // console.log(phone, name, res.data.data.display_url)
        const image = res.data.data.display_url

        const courseData = {
            courseDetails: {
                thumbnail: image,
                instructorEmail: data.email,
                title: data.courseTitle,
                instructor: data.yourName,
                rating: 0,
                totalStudents: 0,
                totalVideo: data.totalVideo,
                totalLiveClasses: data.totalLiveClass,
                duration: data.duration,
                enrollFee: data.courseFee,
                whatYouWillLearn: outcomeFields,
                courseDescription: text,
                languages: mapSelect,
                introductoryVideo: data.introductoryVideo,
                courseContents: outlines,
                requirements: requirements,
                enrollmentDates: {
                    enrollStart: data.enrollStart,
                    enrollEnd: data.enrollEnd
                },
                category: data.category,
                classStart: data.classStart,
                subtitle: data.courseSubTitle,
                playlistId: data.playlistLink.split("=")[1]
            }
        }
        console.log(courseData)

        try {
            const res = await axiosPublic.post('/api/courses', courseData);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
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
                <details className='pb-4'>
                    <summary>Check how to create course</summary>
                    <div className='pb-8'>
                        <h3 className='text-base font-bold'>Create Course</h3>
                        <ol className='list-decimal pl-10'>
                            <li>Click on "Create Course" button</li>
                            <li>Fill up the form</li>
                            <li>Click on "Publish Your Course" button</li>
                        </ol>
                    </div>
                </details>
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
                                    <input type="text" name='yourName' {...register("yourName", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.yourName && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="email">
                                    <p className='text-base text-gray-500'>Your email<span className='text-red-500'>*</span> </p>
                                    <input type="email" name='email'  {...register("email", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.email && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="category">
                                    <p className='text-base text-gray-500'>Course category<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='category' {...register("category", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.category && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseTitle">
                                    <p className='text-base text-gray-500'>Course title<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseTitle' {...register("courseTitle", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.courseTitle && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseSubTitle">
                                    <p className='text-base text-gray-500'>Course subtitle<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='courseSubTitle'  {...register("courseSubTitle", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
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
                                        {...register("thumbnail", { required: true })}
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
                                    <input type="text" name='objective' {...register("objective", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
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

                                            {requirements.map((requirement, index) => (
                                                <div key={index} className="w-full flex flex-col gap-2 mb-2">
                                                    <div className='w-full'>
                                                        <label htmlFor={`requirement${index}`}>
                                                            <input
                                                                type="text"
                                                                name={`requirement${index}`}
                                                                id={`requirement${index}`}
                                                                placeholder={`Requirement ${index + 1}`}
                                                                onChange={(event) => handleRequirementOnchange(index, event)}
                                                                className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                            />

                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={handleRequirementAddField} className="mb-6 btn btn-circle border border-gray-400 ">
                                            <IoAdd className='text-2xl'></IoAdd>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="introductoryVideo">
                                    <p className='text-base text-gray-500'>Introductory video link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='introductoryVideo' {...register("introductoryVideo", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.introductoryVideo && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="playlistLink">
                                    <p className='text-base text-gray-500'>Youtube playlist link<span className='text-red-500'>*</span> </p>
                                    <input type="text" name='playlistLink' {...register("playlistLink", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
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
                                        {...register("enrollStart", { required: true })}
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
                                        {...register("enrollEnd", { required: true })}
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
                                        {...register("classStart", { required: true })}
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
                                    <input type="number" name='duration' {...register("duration", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase  text-gray-500' />
                                </label>
                                <div>
                                    {errors.duration && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="courseFee">
                                    <p className='text-base text-gray-500'>Course fee<span className='text-red-500'>*</span> </p>
                                    <input type="number" name="courseFee"  {...register("courseFee", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
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
                                        {...register("totalVideo", { required: true })}
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
                                        {...register("totalLiveClass", { required: true })}
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
                                        {outcomeFields.map((field, index) => (
                                            <div key={index} className="w-full flex flex-col gap-2">
                                                <div>
                                                    <label htmlFor={`outcome${index}`}>

                                                        <input
                                                            type="text"
                                                            name={`outcome${index}`}
                                                            id={`outcome${index}`}
                                                            placeholder={`Outcome ${index + 1}`}
                                                            onChange={(event) => handleOutcomeChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />

                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleOutcomeFieldAdd} className="mt-6 btn btn-circle border border-gray-400">
                                        <IoAdd className='text-2xl'></IoAdd>
                                    </button>
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%]  flex justify-between items-center'>
                                <div className='w-full   flex lg:flex-row flex-col justify-center items-start gap-2'>
                                    <div className='w-full  flex flex-col gap-2'>
                                        <p className="text-base text-gray-500">Outline</p>
                                        {outlines.map((field, index) => (
                                            <div key={index} className="w-full flex flex-row gap-2 ">
                                                <div className='w-1/2'>
                                                    <label htmlFor={`contentTitle${index}`}>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id={`contentTitle${index}`}
                                                            value={field.title}
                                                            placeholder={`Title ${index + 1}`}
                                                            onChange={(event) => handleOulineChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                                <div className='w-1/2'>
                                                    <label htmlFor={`content${index}`}>
                                                        <input
                                                            type="text"
                                                            name="content"
                                                            id={`content${index}`}
                                                            value={field.content}
                                                            placeholder={`Content ${index + 1}`}
                                                            onChange={(event) => handleOulineChange(index, event)}
                                                            className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleOulineAddField} className="mt-4 btn btn-circle border border-gray-400">
                                        <IoAdd className='text-2xl'></IoAdd>
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
                </div >
            </div >
        </>
    );
};

export default CreateCourse;