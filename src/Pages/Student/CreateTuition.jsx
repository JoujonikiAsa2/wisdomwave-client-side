import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Container from '../../SharedComponents/Container/Container';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { MultiSelect } from 'react-multi-select-component';
import { IoAdd } from 'react-icons/io5';

const CreateTuition = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [subjects, setSubjects] = useState([""])
    const [selected, setSelected] = useState([]);

    const options = [
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" },
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" }
    ];

    // handle new field value 
    const handdleSubjectOnChange = (index, event) => {
        const { value } = event.target
        const newFields = [...subjects]
        newFields[index] = value
        setSubjects(newFields)
        console.log(newFields)
    }
    // handle Add field
    const handleAddField = () => {
        setSubjects([...subjects, ""])
    }


    const filteredSelectedValue = selected.map(res => { return res.value })
    // handle form submission
    const handleTuitionCreation = (e) => {
        e.preventDefault()
        const form = e.target
        const classvalue = form.class.value
        const tuitionData = {
            userEmail: user?.email,
            district: form.district.value.toLowerCase(),
            area: form.area.value,
            group: form.category.value,
            medium: form.medium.value,
            tutoringDays: filteredSelectedValue,
            salary: form.salary.value,
            details: { class: classvalue, subjects: [...subjects] }

        }

        console.log(tuitionData)

        axiosPublic.post('/api/tuitions', tuitionData)
            .then(res => {
                if(res.data.status === "success"){
                    toast.success('Tuition created successfully')
                }
            })
            .catch(err => toast.error('You can create only one tuition for similar class using your email. Create new tuition for another class'))
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
        // create tuition form
        <>
            <Toaster position='top-center' reverseOrder={false} />
            <div className='py-32 rounded flex justify-center items-center'>
                <form action="" onSubmit={handleTuitionCreation} className='w-full lg:w-1/2 md:w-2/3 px-6 space-y-4 py-6'>
                    <div className=' w-full flex space-x-4'>
                        <div className='w-1/2'>
                            {/* bogger name */}
                            <label htmlFor="">
                                <p className=' text-base text-gray-500'>District<span className='text-red-500'>*</span></p>
                                <input type="text" name='district' className='input input-bordered w-full focus:outline-none lowercase' required />
                            </label>

                        </div>
                        <div className='w-1/2'>
                            {/* bogger name */}
                            <label htmlFor="">
                                <p className=' text-base text-gray-500'>Area<span className='text-red-500'>*</span></p>
                                <input type="text" name='area' className='input input-bordered w-full focus:outline-none lowercase' required />
                            </label>

                        </div>
                    </div>
                    <div className=' w-full flex space-x-4'>
                        <div className='w-1/2'>
                            {/* bogger name */}
                            <label htmlFor="">
                                <p className=' text-base text-gray-500'>Group<span className='text-red-500'>*</span></p>
                                <input type="text" name='category' className='input input-bordered w-full focus:outline-none lowercase' required />
                            </label>

                        </div>
                        <div className='w-1/2'>
                            {/* bogger name */}
                            <label htmlFor="">
                                <p className=' text-base text-gray-500'>Medium<span className='text-red-500'>*</span></p>
                                <input type="text" name='medium' className='input input-bordered w-full focus:outline-none lowercase' required />
                            </label>

                        </div>
                    </div>
                    <div className=' w-full flex space-x-4'>
                        <div className='w-1/2 '>
                            <label htmlFor="">
                                <p className='text-base text-gray-500'>Tutoring Days<span className='text-red-500'>*</span> </p>
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </label>
                        </div>
                        <div className='w-1/2'>
                            {/* bogger name */}
                            <label htmlFor="">
                                <p className=' text-base text-gray-500'>Salary<span className='text-red-500'>*</span></p>
                                <input type="number" name='salary' className='input input-bordered w-full focus:outline-none lowercase' required />
                            </label>

                        </div>

                    </div>
                    <div className=' w-full flex space-x-4'>
                        <div className='w-full'>
                            {/* bogger name */}
                            <label htmlFor="">
                                <p className=' text-base text-gray-500'>Details<span className='text-red-500'>*</span></p>
                                <div className='flex flex-col gap-4'>
                                    <input type="text" name='class' className='input input-bordered w-full focus:outline-none lowercase' placeholder='Class' required />
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


                    {/* submit button */}
                    <div className='flex w-full justify-center items-center'>
                        <input type="submit" value="Publish" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                    </div>
                </form>
            </div>
        </>
    );
};


export default CreateTuition;
