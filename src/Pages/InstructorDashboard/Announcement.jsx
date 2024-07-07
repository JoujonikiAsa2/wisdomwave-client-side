import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { IoClose } from 'react-icons/io5';
import ReactQuill from 'react-quill';


const Announcement = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [clicked, setClicked] = useState(false)
    const [students, setStudents] = useState([]);
    const [text,setText] = useState("")

    console.log(students)

    useEffect(() => {
        axiosPublic.get(`/api/enrolledStudents/instructor/${user?.email}`)
            .then((res) => {
                // Extract userEmails from the response data and update state
                const userEmails = res.data.data.map(student => {return {email: student.userEmail, isRead: false}});
                setStudents(prevStudents => [...new Set([...prevStudents, ...userEmails])]);
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user?.email]);


    const { data: announcements = [], refetch } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/announcements/email/${user?.email}`)
            console.log(res.data.data)
            return res.data.data
        }
    })

    console.log(students)

    // handle announcement create
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const details = text
        console.log(title, details)

        console.log(students)


        axiosPublic.post('/api/announcements', { title, details, email: user?.email, instructorName: user?.name, studentEmails: students })
            .then(res => {
                console.log(res.data)
                if (res.data.status === "success") {
                    toast.success('Announcement created successfully')
                    refetch()
                }
            })
            .catch(err => {
                console.log(err)
            })
        form.reset()
        setText("")
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
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='w-full'>
                <div>
                    <DashboardTitle title="Announcement" subTitle="Create an announcement for your students"></DashboardTitle>
                </div>
                <div className='w-full justify-center items-center'><button className={`${clicked === false ? "btn btn-sm text-white w-56 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2" : 'hidden'}`} onClick={() => setClicked(true)}>{clicked == false ? "Create Announcement" : ""}</button></div>

                <div className={`${clicked === true ? "relative w-full flex flex-col justify-center items-center " : "hidden"} relative`} >
                    <div className='absolute  bottom-80 left-64 md:left-72 lg:left-80 justify-center items-center'><button className={`${clicked === true ? "btn btn-sm bg-gray-300 te capitalize" : 'hidden'}`} onClick={() => setClicked(false)}>{clicked ? <IoClose></IoClose> : ""}</button></div>
                    <form action="" className={`${clicked === true ? "lg:w-1/2 md:w-2/3 w-[80%] flex flex-col justify-center items-center gap-3 border p-4" : "hidden"}`} onSubmit={(e) => handleSubmit(e)}>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="duration" className='w-full'>
                                <p className='text-base text-gray-500'>Announcement Title<span className='text-red-500'>*</span> </p>
                                <input type="text" name='title' required className='input input-bordered border-gray-300 w-full  h-9 focus:outline-none  text-gray-500' />
                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <label htmlFor="duration" className='w-full'>
                                <p className='text-base text-gray-500'>Announcement Details<span className='text-red-500'>*</span> </p>
                                <ReactQuill
                                    theme='snow'
                                    value={text}
                                    modules={modules}
                                    onChange={handleChange}
                                    className=' bg-white rounded'
                                    required
                                />                            </label>
                        </div>
                        <div className='w-full lg:w-[80%] h-full'>
                            <input type="submit" value="Create" className='btn text-white w-full capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                        </div>
                    </form>

                </div>
                <div className='w-full flex justify-center items-center overflow-auto'>

                    <table className='table lg:w-1/2 md:w-2/3 w-[80%] my-12 '>
                        <thead>
                            <tr>
                                <th className='text-base font-bold '>Announcement title</th>
                                <th className='text-base font-bold '>Announcement details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                announcements.map(announcement => (
                                    <tr key={announcement._id}>
                                        <td>{announcement.title}</td>
                                        <td dangerouslySetInnerHTML={{ __html: announcement.details }}></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Announcement;