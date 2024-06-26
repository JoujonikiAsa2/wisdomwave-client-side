import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import ReactQuill from 'react-quill';
import { IoAdd } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { PiSpinnerGapBold } from 'react-icons/pi';
const IMAGE_HOSTING_API = import.meta.env.VITE_IMAGE_HOSTINF_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_API}`


const CreateProfile = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [isLoading, setIsLoading] = useState(false)
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
        const fetchInitialData = async () => {
            try {
                const [institutesRes, subjectsRes, eduLevelsRes, districtsRes, upazilasRes] = await Promise.all([
                    axiosPublic.get("/api/institutes"),
                    axiosPublic.get("/api/subjects"),
                    axiosPublic.get("/api/educationLevels"),
                    axiosPublic.get("/api/districts"),
                    axiosPublic.get("/api/upazilas")
                ]);

                console.log('Institutes Response:', institutesRes.data);
                console.log('Subjects Response:', subjectsRes.data);
                console.log('Education Levels Response:', eduLevelsRes.data);
                console.log('Districts Response:', districtsRes.data);
                console.log('Upazilas Response:', upazilasRes.data);

                if (institutesRes?.data) {
                    setInstitutes(...institutesRes.data);
                } else {
                    console.error('Institutes data is undefined or invalid');
                }

                if (subjectsRes?.data) {
                    setAcademicLevels(...subjectsRes.data);
                } else {
                    console.error('Subjects data is undefined or invalid');
                }

                if (eduLevelsRes?.data) {
                    setEduLevels(...eduLevelsRes.data);
                } else {
                    console.error('Education levels data is undefined or invalid');
                }

                if (districtsRes?.data?.status === "success") {
                    setDistricts(districtsRes.data.data);
                    const newLocationOptions = districtsRes.data.data.map(district => ({
                        label: district.name,
                        value: district.name,
                        id: district.district_id
                    }));
                    setLocationOptions(newLocationOptions);
                } else {
                    console.error('Districts data is undefined or invalid');
                }

                if (upazilasRes?.data?.status === "success") {
                    setUpazilas(upazilasRes.data.data);
                    const newSubLocationOptions = upazilasRes.data.data.map(upazila => ({
                        label: upazila.name,
                        value: upazila.name
                    }));
                    setSubLocationOptions(newSubLocationOptions);
                } else {
                    console.error('Upazilas data is undefined or invalid');
                }
            } catch (err) {
                console.error('Error fetching initial data:', err.message);
            }
        };

        fetchInitialData();
    }, []);




    const filteredSelectedValue = selected.length > 0 && selected?.map(res => { return res.value })
    const filteredSubLocationValue = subSelected.length > 0 && subSelected?.map(res => { return res.value })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        try {

            const imageFile = { image: data.profile[0] }
            const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });
            const image = imageRes.data.data.display_url;

            // Prepare tutor profile data
            const tutorProfile = {
                tutorId: Math.floor(Math.random() * 10000) + data.yourName.slice(0, 2),
                name: data.yourName,
                age: data.age,
                currentStatus: data.status,
                profile: image,
                educationalQualication: {
                    eduName: data.eduLevel,
                    subject: data.academicLevel,
                    institute: data.institute,
                    cgpa: data.cgpa
                },
                medium: data.medium,
                preferableLocation: filteredSelectedValue,
                subLocation: filteredSubLocationValue,
                preferableClass: preferableClasses,
                preferableSubject: subjects,
                experience: data.experiences,
                expectedSalary: data.salary,
                profileCreationDate: new Date(),
                about: text,
                tuitionType: data.type,
                tuitionDays: data.tutoringDays,
                email: data.email
            };

            setIsLoading(true);
            // Create tutor profile
            const profileRes = await axiosPublic.post(`/api/tutors/${user?.email}`, tutorProfile);

            if (profileRes.data.status === "success") {
                toast.success('Profile created successfully');
                reset();
                setText("")
                setSelected("")
                setSubSelected("")
            }
            else if (profileRes.data.status === "fail"){
                toast.error(profileRes.data.message);
            } else {
                toast.error(profileRes.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("An error occurred while creating the profile.");
        } finally {
            setIsLoading(false);
        }
    };


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

    // handle new field value for class
    const handdleClassOnChange = (index, event) => {
        const { value } = event.target
        const newFields = [...preferableClasses]
        newFields[index] = value
        setPreferableClasses(newFields)
        // console.log(newFields)
    }
    // handle Add field for class
    const handleAddClassField = () => {
        setPreferableClasses([...preferableClasses, ""])
    }

    // handle new field value  for new subject field
    const handdleSubjectOnChange = (index, event) => {
        const { value } = event.target
        const newFields = [...subjects]
        newFields[index] = value
        setSubjects(newFields)
        // console.log(newFields)
    }
    // handle Add field
    const handleAddField = () => {
        setSubjects([...subjects, ""])
    }



    return (
        <>
            <Toaster position='top-center' reverseOrder={false} />
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
                                        <select className='capitalize input input-bordered border-gray-300 w-full  h-10 focus:outline-none round' {...register("eduLevel", { required: true })}>
                                            <option value="">Select</option>
                                            {
                                                eduLevels?.eduLevels.map(eduLevel => <option value={eduLevel} >{eduLevel}</option>)
                                            }
                                        </select>
                                    </label>
                                    <label htmlFor="">
                                        <p className='py-2'>Subject</p>
                                        <select className='capitalize input input-bordered border-gray-300 w-full  h-10 focus:outline-none round' {...register("academicLevel", { required: true })}>
                                            <option value="">Select</option>
                                            {
                                                academicLevels?.subjects.map(sub => <option value={sub} >{sub}</option>)
                                            }
                                        </select>
                                    </label>
                                    <label htmlFor="">
                                        <p className='py-2'>Institute</p>
                                        <select className='capitalize input input-bordered border-gray-300 w-full  h-10 focus:outline-none round' {...register("institute", { required: true })}>
                                            <option value="">Select</option>
                                            {
                                                institutes?.institutes.map(institute => <option value={institute} >{institute}</option>)
                                            }
                                        </select>
                                    </label>
                                    <label htmlFor="">
                                        <p className='py-2'>CGPA</p>
                                        <input type="text" name='cgpa' className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' {...register("cgpa", { required: true })} />
                                    </label>
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="currentStatus">
                                    <p className='text-base '>Current Status<span className='text-red-500'>*</span> </p>

                                    <div>
                                        <input type="radio" name="status" value="available" {...register("status", { required: true })} />
                                        <label> Available</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="status" value="unavailable"  {...register("status", { required: true })} />
                                        <label> Unavailable</label>
                                    </div>                            </label>
                            </div>

                            <div className=' w-full flex space-x-4 lg:w-[80%] h-full'>
                                <div className='w-full'>
                                    {/* bogger name */}
                                    <label htmlFor="">
                                        <p className=' text-base '>Preferable Class<span className='text-red-500'>*</span></p>
                                        <div className='flex flex-col gap-4'>
                                            {
                                                preferableClasses.map((pc, index) =>
                                                    <input type="text" name={pc} className='input input-bordered w-full focus:outline-none lowercase' placeholder='Class' onChange={(event) => handdleClassOnChange(index, event)} />
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
                                    <p className='text-base '>Medium<span className='text-red-500'>*</span> </p>
                                    <div>
                                        <input type="checkbox" name="medium" value="bengali" {...register("medium", { required: true })} />
                                        <label> Bengali</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="medium" value="english"  {...register("medium", { required: true })} />
                                        <label> English</label>
                                    </div>
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="">
                                    <p className='text-base '>Location<span className='text-red-500'>*</span> </p>
                                    <MultiSelect
                                        options={locationOptions}
                                        value={selected}
                                        onChange={setSelected}
                                        labelledBy="Select round"
                                        className='round capitalize'
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
                                        className='round capitalize'
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

                            <div className='w-full lg:w-[80%] h-full '>
                                <label htmlFor="">
                                    <p className='text-base '>Tuition Type<span className='text-red-500'>*</span> </p>
                                    <div>
                                        <input type="checkbox" name="type" value="online" {...register("type", { required: true })} />
                                        <label> Online</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="type" value="in-person"  {...register("type", { required: true })} />
                                        <label> In-Person</label>
                                    </div>
                                </label>
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
                            <div>
                                {isLoading == true ? (
                                    <button
                                        className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]'><PiSpinnerGapBold className='animate-spin text-2xl' ></PiSpinnerGapBold  ></button>
                                ) : (
                                    <div className='w-full'>
                                        <input type="submit" value="Create" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                                    </div>
                                )}
                            </div>
                        </div>

                    </form>
                </div >
            </div>
        </>
    );
};

export default CreateProfile;