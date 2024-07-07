import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import '../FAQ/styles.css'

const ManageFAQ = () => {
    const [title, setTItle] = useState("")
    const [allFaqs, setAllFaqs] = useState([])
    const [text, setText] = useState("");
    const axiosSecure = useAxiosSecure()
    

    // Define the modules for Quill editor toolbar
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'script': 'sub' }, { 'script': 'super' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }, { 'header': [1, 2, 3, 4, 5, 6, false] }, { 'color': [] }, { 'background': [] }, { 'align': [] }],
            ['link', 'clean']
        ]
    };


    useEffect(() => {
        axiosSecure.get('/api/faqs')
            .then(res => {
                console.log(res.data.data)
                setAllFaqs(res.data.data)
            })
    }, [axiosSecure, allFaqs])


    const handleChange = (value) => {
        setText(value);
    };


    const addFAQ = (event) => {
        event.preventDefault()
        const form = event.target
        const faqs = {
            title,
            content: text
        }
        axiosSecure.post('/api/faqs', faqs)
            .then(res => {
                console.log(res.data)
                toast.success(res.data.message)
                form.reset()
                setText("")
            })
            .catch(err => console.log("Already exist"))

    }

    const deleteFAQ = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/api/faqs/${id}`)
                    .then((res) => {
                        console.log(res.data)
                        Swal.fire(
                            'Deleted!',
                        'FAQ has been deleted.',
                            'success'
                        )
                        const newFaqs = allFaqs.filter(faq => faq._id !== id)
                        setAllFaqs(newFaqs)
                        console.log(newFaqs)
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        })
    }

    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='mb-10'>
                <DashboardTitle title="Manage FAQ" subTitle="Manage the FAQ of WisdomWave"></DashboardTitle>
                <div className='w-full flex flex-col justify-center items-center gap-2 '>
                    <div className='lg:w-2/3 flex flex-col justify-center items-center'>
                        <div className='w-full flex lg:flex-row md:flex-col flex-col justify-center items-start gap-2'>
                            <form action="" onSubmit={addFAQ} className='w-full  flex flex-col gap-2'>
                                <h2 className='text-xl font-bold'>Add FAQ</h2>
                                    <div  className="w-full flex flex-col gap-2 ">
                                        <div className='w-full'>
                                            <label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    placeholder='Title'
                                                    onChange={(e) => setTItle(e.target.value)}
                                                    className="input input-bordered border-gray-300 w-full h-9 focus:outline-none text-base"
                                                />
                                            </label>
                                        </div>
                                        <div className='w-full'>
                                                <ReactQuill
                                                    theme='snow'
                                                    value={text}
                                                    modules={modules}
                                                    onChange={handleChange}
                                                    className="w-full focus:outline-none text-base"
                                                    required
                                                />
                                        </div>
                                    </div>
                                <input type="submit" value="Publish" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-full flex flex-col justify-center items-center gap-2 mb-10'>
                {
                    allFaqs.map((faq, index) => (
                        <div className='flex gap-2 lg:w-2/3 md:w-1/2 w-full border p-4 rounded-xl'>
                            <div className='flex flex-col gap-2'>
                                <p>{faq.title}</p>
                                <div dangerouslySetInnerHTML={{ __html: faq?.content }} className='blogDiv text-gray-500 list-decimal'></div>
                            </div>
                            <button onClick={() => deleteFAQ(faq._id)} className='btn btn-sm bg-red-400'><MdDelete className="text-xl text-white"></MdDelete></button>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default ManageFAQ;