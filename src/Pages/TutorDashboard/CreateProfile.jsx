import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import ReactQuill from 'react-quill';
import { IoAdd } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const CreateProfile = () => {
    const axiosPublic = useAxiosPublic()
    const [selected, setSelected] = useState([]);
    const [subSelected, setSubSelected] = useState([]);
    const [text, setText] = useState("");
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [institutes, setInstitutes] = useState()
    const [academicLevels, setAcademicLevels] = useState()
    const [eduLevels, setEduLevels] = useState()
    const [locationOptions, setLocationOptions] = useState([]);
    const [subLocationOptions, setSubLocationOptions] = useState([]);
    const [subjects, setSubjects] = useState([""])
    const [preferableClasses, setPreferableClasses] = useState([""])

    useEffect(() => {
        axiosPublic.get("/api/institutes")
            .then(res => {
                    setInstitutes(...res.data);
                    console.log(...res.data)
            })
            .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        axiosPublic.get("/api/subjects")
            .then(res => {
                setAcademicLevels(...res.data);
                    console.log(...res.data)
            })
            .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        axiosPublic.get("/api/educationLevels")
            .then(res => {
                setEduLevels(...res.data);
                    console.log(...res.data)
            })
            .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        axiosPublic.get("/api/districts")
            .then(res => {
                if (res.data.status === "success") {
                    setDistricts(res.data.data);
                    const newOptions = res.data.data.map(district => ({
                        label: district.name,
                        value: district.name,
                        id: district.district_id
                    }));
                    setLocationOptions(newOptions);
                }
            })
            .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        axiosPublic.get(`/api/upazilas`)
            .then(res => {
                console.log(selected)
                if (res.data.status === "success") {
                    setUpazilas(res.data.data);
                    console.log(res.data.data)
                    const newOptions = res.data.data.map(upazila => ({
                        label: upazila.name,
                        value: upazila.name

                    }));
                    setSubLocationOptions(newOptions);
                }
            })
            .catch(err => console.log(err.message));
    }, []);

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

        const imageFile = { image: data.profile[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        // console.log(phone, name, res.data.data.display_url)
        const image = res.data.data.display_url

        const courseData = {
            courseDetails: {
                profile: image,
                instructorEmail: data.email,
                title: data.currentStatus,
                instructor: data.yourName,
                rating: 0,
                totalStudents: 0,
                totalVideo: data.totalVideo,
                totalLiveClasses: data.totalLiveClass,
                duration: data.duration,
                enrollFee: data.courseFee,
                whatYouWillLearn: outcomeFields,
                courseDescription: text,
                locations: mapSelect,
                experiences: data.experiences,
                courseContents: outlines,
                requirements: requirements,
                enrollmentDates: {
                    salary: data.salary,
                    enrollEnd: data.enrollEnd
                },
                age: data.age,
                classStart: data.classStart,
                subtitle: data.courseSubTitle,
                playlistId: data.tutoringDays.split("=")[1]
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

    const handleChange = (value) => {
        setText(value);
    };

    // handle new field value  for new subject field
    const handdleSubjectOnChange = (index, event) => {
        const { value } = event.target
        const newFields = [...subjects]
        newFields[index] = value
        setSubjects(newFields)
        console.log(newFields)
    }
    // handle Add field for subject
    const handleAddField = () => {
        setSubjects([...subjects, ""])
    }
    // handle new field value for class
    const handdleClassOnChange = (index, event) => {
        const { value } = event.target
        const newFields = [...preferableClasses]
        newFields[index] = value
        setPreferableClasses(newFields)
        console.log(newFields)
    }
    // handle Add field for class
    const handleAddClassField = () => {
        setPreferableClasses([...preferableClasses, ""])
    }



    return (
        <div>
            <DashboardTitle title="Create Tutor Profile" subTitle="Create your tutor profile to get started" />
            <div className='w-full pb-8 text-gray-500'>
                <form action="" className='w-full ' onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex flex-col justify-center items-center gap-4' >
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="yourName">
                                <p className='text-base '>Yout name<span className='text-red-500'>*</span> </p>
                                <input type="text" name='yourName' {...register("yourName", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                            </label>
                            <div>
                                {errors.yourName && <span className='text-base text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="email">
                                <p className='text-base '>Your email<span className='text-red-500'>*</span> </p>
                                <input type="email" name='email'  {...register("email", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                            </label>
                            <div>
                                {errors.email && <span className='text-base text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full '>
                            <label htmlFor="profile"><p className='text-base '>Your profile<span className='text-red-500'>*</span> </p>
                                <input
                                    type='file'
                                    name="profile"
                                    {...register("profile", { required: true })}
                                    className='input input-bordered border-gray-300 w-full h-9 focus:outline-none text-sm pt-[0.2rem]'
                                />
                            </label>
                            <div>
                                {errors.profile && <span className='text-base text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="age">
                                <p className='text-base '>Your age<span className='text-red-500'>*</span> </p>
                                <input type="number" name='age' {...register("age", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                            </label>
                            <div>
                                {errors.age && <span className='text-base text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="currentStatus">
                                <p className='text-base '>Educational Background<span className='text-red-500'>*</span> </p>
                                <label htmlFor="">
                                    <p className='py-2'>Education Level</p>
                                    <select className='capitalize input input-bordered border-gray-300 w-full  h-10 focus:outline-none round'>
                                        <option value="">Select</option>
                                        {
                                            eduLevels?.eduLevels.map(eduLevel => <option value={eduLevel} >{eduLevel}</option>)
                                        }
                                    </select>
                                </label>
                                <label htmlFor="">
                                    <p className='py-2'>Subject</p>
                                    <select className='capitalize input input-bordered border-gray-300 w-full  h-10 focus:outline-none round'>
                                        <option value="">Select</option>
                                        {
                                            academicLevels?.subjects.map(sub => <option value={sub} >{sub}</option>)
                                        }
                                    </select>
                                </label>
                                <label htmlFor="">
                                    <p className='py-2'>Institute</p>
                                    <select className='capitalize input input-bordered border-gray-300 w-full  h-10 focus:outline-none round'>
                                        <option value="">Select</option>
                                        {
                                            institutes?.institutes.map(institute => <option value={institute} >{institute}</option>)
                                        }
                                    </select>
                                </label>
                                <label htmlFor="">
                                    <p className='py-2'>CGPA</p>
                                    <input type="number" name='cgpa' className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="currentStatus">
                                <p className='text-base '>Current Status<span className='text-red-500'>*</span> </p>

                                <div>
                                    <input type="radio" name="status" value="available" required />
                                    <label> Available</label>
                                </div>
                                <div>
                                    <input type="radio" name="status" value="unavailable" required />
                                    <label> Unavailable</label>
                                </div>                            </label>
                        </div>
                        
                        <div className=' w-full flex space-x-4 lg:w-[80%] h-full'>
                            <div className='w-full'>
                                {/* bogger name */}
                                <label htmlFor="">
                                    <p className=' text-base '>Preferable Class<span className='text-red-500'>*</span></p>
                                    <div className='flex flex-col gap-4'>
                                        <input type="text" name='class' className='input input-bordered w-full focus:outline-none lowercase' placeholder='Class' required />
                                        {
                                            preferableClasses.map((pc, index) =>
                                                <input type="text" name='subject' className='input input-bordered w-full focus:outline-none lowercase' placeholder='Class' onChange={(event) => handdleClassOnChange(index, event)} />
                                            )
                                        }
                                    </div>
                                    <div className='mt-2'>
                                        <button onClick={handleAddClassField} className="mb-6 btn btn-circle border border-gray-400 ">
                                            <IoAdd className='text-2xl'></IoAdd>
                                        </button>
                                    </div>
                                </label>

                            </div>
                        </div>
                        <div className=' w-full flex space-x-4 lg:w-[80%] h-full'>
                            <div className='w-full'>
                                {/* bogger name */}
                                <label htmlFor="">
                                    <p className=' text-base '>Preferable Subject<span className='text-red-500'>*</span></p>
                                    <div className='flex flex-col gap-4'>
                                        <input type="text" name='class' className='input input-bordered w-full focus:outline-none lowercase' placeholder='Subject' required />
                                        {
                                            subjects.map((subject, index) =>
                                                <input type="text" name='subject' className='input input-bordered w-full focus:outline-none lowercase' placeholder='Subject' onChange={(event) => handdleSubjectOnChange(index, event)} />
                                            )
                                        }
                                    </div>
                                    <div className='mt-2'>
                                        <button onClick={handleAddField} className="mb-6 btn btn-circle border border-gray-400 ">
                                            <IoAdd className='text-2xl'></IoAdd>
                                        </button>
                                    </div>
                                </label>

                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full '>
                            <label htmlFor="">
                                <p className='text-base '>Location<span className='text-red-500'>*</span> </p>
                                <MultiSelect
                                    options={locationOptions}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                    className='capitalize round'
                                />
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full '>
                            <label htmlFor="">
                                <p className='text-base '>Sub Location<span className='text-red-500'>*</span> </p>
                                <MultiSelect
                                    options={subLocationOptions}
                                    value={subSelected}
                                    onChange={setSubSelected}
                                    labelledBy="Select round"
                                />
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="experiences">
                                <p className='text-base '>Experiences<span className='text-red-500'>*</span> </p>
                                <input type="number" name='experiences' {...register("experiences", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                            </label>
                            <div>
                                {errors.experiences && <span className='text-base text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="tutoringDays">
                                <p className='text-base '>Tutoring Days<span className='text-red-500'>*</span> </p>
                                <input type="number" name='tutoringDays' {...register("tutoringDays", { required: true })} className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                            </label>
                            <div>
                                {errors.tutoringDays && <span className='text-base text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="salary">
                                <p className='text-base '>Expected Salary<span className='text-red-500'>*</span> </p>
                                <input
                                    type="number"
                                    name='salary'
                                    {...register("salary", { required: true })}
                                    className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase '
                                />
                            </label>
                            <div>
                                <div>
                                    {errors.salary && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                        </div>

                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="type">
                                <p className='text-base '>Tuition Type<span className='text-red-500'>*</span> </p>

                                <div>
                                    <input type="radio" name="type" value="online" required />
                                    <label> Online</label>
                                </div>
                                <div>
                                    <input type="radio" name="type" value="in-person" required />
                                    <label> In-Person</label>
                                </div>                            </label>
                        </div>

                        <div className='w-full lg:w-[80%] flex justify-center lg:ml-48'>
                            <label htmlFor="">
                                <p className='text-base '>Short Description about yourself<span className='text-red-500'>*</span> </p>
                                <ReactQuill
                                    theme='snow'
                                    value={text}
                                    modules={modules}
                                    onChange={handleChange}
                                    className='w-full lg:w-[80%]  bg-white'
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
        </div>
    );
};

export default CreateProfile;