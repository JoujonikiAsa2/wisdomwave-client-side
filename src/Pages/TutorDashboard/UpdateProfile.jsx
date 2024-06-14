import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import ReactQuill from 'react-quill';
import { IoAdd } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'react-multi-select-component';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { PiSpinnerGapBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

const UpdateProfile = () => {
    const { email } = useParams()
    const axiosPublic = useAxiosPublic()
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState([]);
    const [subSelected, setSubSelected] = useState([]);
    const [text, setText] = useState("");
    const [userInfo, setUserInfo] = useState(null)
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
                const [tutorInfo, institutesRes, subjectsRes, eduLevelsRes, districtsRes, upazilasRes] = await Promise.all([
                    axiosPublic.get(`/api/tutors/${email}`),
                    axiosPublic.get("/api/institutes"),
                    axiosPublic.get("/api/subjects"),
                    axiosPublic.get("/api/educationLevels"),
                    axiosPublic.get("/api/districts"),
                    axiosPublic.get("/api/upazilas")
                ]);

                console.log('Tutor Profile Response:', tutorInfo.data.data);
                console.log('Institutes Response:', institutesRes.data);
                console.log('Subjects Response:', subjectsRes.data);
                console.log('Education Levels Response:', eduLevelsRes.data);
                console.log('Districts Response:', districtsRes.data);
                console.log('Upazilas Response:', upazilasRes.data);

                if (tutorInfo?.data) {
                    setUserInfo(tutorInfo.data.data);
                    const newLocationOptions = tutorInfo.data.data.preferableLocation.map(district => ({
                        label: district,
                        value: district,
                    }))
                    const newUpazilaOptions = tutorInfo.data.data.subLocation.map(upazila => ({
                        label: upazila,
                        value: upazila,
                    }))
                    setSelected(newLocationOptions)
                    setSubSelected(newUpazilaOptions)
                    setText(tutorInfo.data.data.about)
                    setPreferableClasses(tutorInfo.data.data.preferableClass)
                    setSubjects(tutorInfo.data.data.preferableSubject)
                } else {
                    console.error('Institutes data is undefined or invalid');
                }
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


    const filteredSelectedValue = selected.map(res => { return res.value })
    const filteredSubLocationValue = subSelected.map(res => { return res.value })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        try {
            // Prepare tutor profile data
            const tutorProfile = {
                name: data.yourName === "" ? userInfo.name : data.yourName,
                age: data.age === "" ? userInfo.age : data.age,
                currentStatus: data.status === null ? userInfo.currentStatus : data.status,
                educationalQualication: {
                    eduName: data.eduLevel === "" ? userInfo.educationalQualication.eduName : data.eduLevel ,
                    subject: data.academicLevel === "" ? userInfo.educationalQualication.subject : data.academicLevel ,
                    institute: data.institute === "" ? userInfo.educationalQualication.institute : data.institute,
                    cgpa: data.cgpa === "" ? userInfo.educationalQualication.cgpa : data.cgpa
                },
                medium: data.medium === false ? userInfo.medium : data.medium,
                preferableLocation: filteredSelectedValue,
                subLocation: filteredSubLocationValue,
                preferableClass: preferableClasses,
                preferableSubject: subjects,
                experience: data.experiences === "" ? userInfo.experience : data.experiences,
                expectedSalary: data.salary === "" ? userInfo.expectedSalary : data.salary,
                profileCreationDate: new Date(),
                about: text === "" ? userInfo.about : text,
                tuitionType: data.type === false ? userInfo.tuitionType : data.type,
                tuitionDays: data.tutoringDays === "" ? userInfo.tuitionDays : data.tutoringDays,
                email: data.email === "" ? userInfo.email : data.email
            };

            setIsLoading(true);
            // Create tutor profile
            const profileRes = await axiosPublic.patch(`/api/tutors/info/${email}`, tutorProfile);

            if (profileRes.data.status === "success") {
                toast.success('Profile updated successfully');
                reset();
                setText("")
                setSelected("")
                setSubSelected("")
            }
            else if (profileRes.data.status === "fail") {
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
                <DashboardTitle title="Edit Tutor Profile" subTitle="Edit your tutor profile for better experience" />
                <div className='w-full pb-8 text-gray-500'>
                    <form action="" className='w-full ' onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full flex flex-col justify-center items-center gap-4' >
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="yourName">
                                    <p className='text-base '>Yout name<span className='text-red-500'>*</span> </p>
                                    <input type="text"
                                        name='yourName'
                                        value={userInfo?.name}
                                        defaultValue={userInfo?.name}
                                        {...register("yourName")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.yourName && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="email">
                                    <p className='text-base '>Your email<span className='text-red-500'>*</span> </p>
                                    <input type="email"
                                        name='email'
                                        defaultValue={userInfo?.email}
                                        {...register("email")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.email && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="age">
                                    <p className='text-base '>Your age<span className='text-red-500'>*</span> </p>
                                    <input type="number"
                                        name='age'
                                        defaultValue={userInfo?.age}
                                        {...register("age")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
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
                                        <select
                                            className='input input-bordered border-gray-300 w-full  h-10 focus:outline-none round lowercase'
                                            {...register("eduLevel")}>
                                            <option value={userInfo?.educationalQualication?.eduName}>{userInfo?.educationalQualication?.eduName}</option>
                                            {
                                                eduLevels?.eduLevels.map(eduLevel => <option value={eduLevel} >{eduLevel}</option>)
                                            }
                                        </select>
                                    </label>
                                    <label htmlFor="">
                                        <p className='py-2'>Subject</p>
                                        <select
                                            className=' input input-bordered border-gray-300 w-full  h-10 focus:outline-none round'
                                            {...register("academicLevel")}>
                                            <option value={userInfo?.educationalQualication?.subject}>{userInfo?.educationalQualication?.subject}</option>
                                            {
                                                academicLevels?.subjects.map(sub => <option value={sub} >{sub}</option>)
                                            }
                                        </select>
                                    </label>
                                    <label htmlFor="">
                                        <p className='py-2'>Institute</p>
                                        <select
                                            className=' input input-bordered border-gray-300 w-full  h-10 focus:outline-none round'
                                            {...register("institute")}>
                                            <option value={userInfo?.educationalQualication?.institute}>{userInfo?.educationalQualication?.institute}</option>
                                            {
                                                institutes?.institutes.map(institute => <option value={institute} >{institute}</option>)
                                            }
                                        </select>
                                    </label>
                                    <label htmlFor="">
                                        <p className='py-2'>CGPA</p>
                                        <input type="text"
                                            name='cgpa'
                                            defaultValue={userInfo?.educationalQualication?.cgpa}
                                            className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase'
                                            {...register("cgpa")} />
                                    </label>
                                </label>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="currentStatus">
                                    <p className='text-base '>Current Status<span className='text-red-500'>*</span> </p>

                                    <div>
                                        <input type="radio" name="status"
                                            value="available"
                                            {...userInfo?.currentStatus == "available" ? { checked: true } : null}
                                            {...register("status")} />
                                        <label> Available</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="status"
                                            value="unavailable"
                                            {...userInfo?.currentStatus == "unavailable" ? { checked: true } : null}
                                            {...register("status")} />
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
                                                    <input type="text"
                                                        defaultValue={pc}
                                                        name={pc}
                                                        className='input input-bordered w-full focus:outline-none lowercase' placeholder='Class' onChange={(event) => handdleClassOnChange(index, event)} />
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
                                                    <input type="text"
                                                        name='subject'
                                                        defaultValue={subject}
                                                        className='input input-bordered w-full focus:outline-none lowercase'
                                                        placeholder='Subject'
                                                        onChange={(event) => handdleSubjectOnChange(index, event)} />
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
                                        <input type="checkbox" name="medium" value="bengali"
                                            {...userInfo?.medium == "bengali" ? { checked: true } : null}
                                            {...register("medium")} />
                                        <label> Bengali</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="medium" value="english"
                                            {...userInfo?.medium == "english" ? { checked: true } : null}
                                            {...register("medium")} />
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
                                    <input type="number"
                                        name='experiences'
                                        defaultValue={userInfo?.experience}
                                        {...register("experiences")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
                                </label>
                                <div>
                                    {errors.experiences && <span className='text-base text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            <div className='w-full lg:w-[80%] h-full'>
                                <label htmlFor="tutoringDays">
                                    <p className='text-base '>Tutoring Days<span className='text-red-500'>*</span> </p>
                                    <input type="number"
                                        name='tutoringDays'
                                        defaultValue={userInfo?.tuitionDays}
                                        {...register("tutoringDays")}
                                        className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none lowercase' />
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
                                        defaultValue={userInfo?.expectedSalary}
                                        {...register("salary")}
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
                                        <input type="checkbox" name="type" value="online" {...userInfo?.tuitionType == "online" ? { checked: true } : null} {...register("type")} />
                                        <label> Online</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="type" value="in-person"  {...userInfo?.tuitionType == "in-person" ? { checked: true } : null} {...register("type")} />
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

export default UpdateProfile;