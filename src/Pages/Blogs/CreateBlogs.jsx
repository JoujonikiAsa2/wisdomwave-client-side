import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CreateBlogs = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [text, setText] = useState("");

    // handle content field text changes
    const handleChange = (value) => {
        setText(value);
    };

    // handle form submission
    const handlePostSubmission = (e) => {
        e.preventDefault()
        const form = e.target
        const bloggerName = form.bloggerName.value
        const facebook = form.facebook.value
        const github = form.github.value
        const linkedin = form.linkedin.value
        const blogCategory = form.blogCategory.value
        const title = form.blogTitle.value
        const readingTime = form.readingTime.value
        const postContent = text


        // blog data object to pass database
        const blogData = {
            bloggerName: bloggerName,
            facebookLink: facebook,
            githubLink: github,
            linkedinLink: linkedin,
            blogCategory: blogCategory,
            blogTitle: title,
            blogContent: postContent,
            documnetReadingTime: readingTime
        }

        console.log(blogData)
        // add the the blogData to the database
        axiosPublic.post('/api/blogs', blogData)
            .then(res => {
                console.log(res.data)
                // show a alert if data added successfully
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your blog added succesfully",
                    width: "26rem",
                    showConfirmButton: false,
                    timer: 3000
                  });
                //   remove the form data when successfully added to the database
                form.reset()
                setText("")
            })
            .catch((e) => {
                console.log(e.message)
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
            ['link', 'image','clean']                    //cleaner
        ]
    };


    return (
        // create blog form
        <div className='mt-20 flex flex-col justify-center items-center mn-h-screen w-full mb-20'>
            <div className='bg-blue-200 p-4 rounded w-1/2'>
                <form action="" onSubmit={handlePostSubmission} className='space-y-4'>
                    <div>
                        {/* bogger name */}
                        <label htmlFor="bloggerName">
                            <p className=' text-base font-bold'>Blogger Name<span className='text-red-500'>*</span></p>
                            <input type="text" name='bloggerName' className='input input-bordered w-full' required />
                        </label>

                    </div>
                    {/* social media links */}
                    <div>
                        <label htmlFor="facebook">
                            <p className=' text-base font-bold'>Facebook Profile Link*</p>
                            <input type="text" name='facebook' className='input input-bordered w-full' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="linkedin">
                            <p className=' text-base font-bold'>LinkedIn Profile Link*</p>
                            <input type="text" name='linkedin' className='input input-bordered w-full' required />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="github">
                            <p className=' text-base font-bold'>GitHub Profile Link*</p>
                            <input type="text" name='github' className='input input-bordered w-full' required />
                        </label>
                    </div>

                    {/* blog category */}
                    <div>
                        <label htmlFor="blogCategory">
                            <p className=' text-base font-bold'>Blog Category<span className='text-red-500'>*</span></p>
                            <select name='blogCategory' className='input input-bordered w-full ' required>
                                <option value=""></option>
                                <option value="web development">Web Development</option>
                                <option value="programming">Programming</option>
                                <option value="language">Language</option>
                                <option value="graphic design">Graphic Design</option>
                                <option value="artificial intelligence">Artificial Intelligence</option>
                                <option value="digital marketing">Digital Marketing</option>
                                <option value="data science">Data Science</option>
                                <option value="Natural Language Processing">Natural Language Processing</option>
                                <option value="app development">App Development</option>
                                <option value="cooking">Cooking</option>
                                <option value="machine learning">Machine Learning</option>
                            </select>
                        </label>
                    </div>
                    {/* Blog Title */}
                    <div>
                        <label htmlFor="blogTitle" >
                            <p className=' text-base font-bold'>Blog Title<span className='text-red-500'>*</span></p>
                            <input type="text" name='blogTitle' className='input input-bordered w-full' required />
                        </label>
                    </div>

                    {/* Blog content */}
                    <div className='w-full'>
                        <label htmlFor="">
                            <p className=' text-base font-bold'>Blog Content<span className='text-red-500'>*</span></p>
                            <ReactQuill
                                theme='snow'
                                value={text}
                                modules={modules}
                                onChange={handleChange}
                                className='w-full bg-white rounded'
                                required
                            />
                        </label>
                    </div>

                    {/* document reading time */}
                    <div className='w-full'>
                        <label htmlFor="readingTime">
                            <p className=' text-base font-bold'>Document Reading Time<span className='text-red-500'>*</span></p>
                            <input type="number" name='readingTime' placeholder='Document Reading Time' className='input input-bordered w-full' required />
                        </label>
                    </div>

                    {/* submit button */}
                    <div className='flex justify-start items-center'>
                        <input type="submit" value="Publish" className='btn text-white capitalize bg-blue-700 my-2' />
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateBlogs;
