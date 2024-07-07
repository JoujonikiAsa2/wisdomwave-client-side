import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Container from '../../SharedComponents/Container/Container';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateDiscussion = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [text, setText] = useState("");
    const navigate = useNavigate()

    // handle content field text changes
    const handleChange = (value) => {
        setText(value);
    };

    // handle form submission
    const handlePostSubmission = (e) => {
        e.preventDefault()
        const form = e.target
        const userName = form.discussiongerName.value
        const discussionCategory = form.discussionCategory.value
        const discussionTitle = form.discussionTitle.value
        const content = text


        // discussion data object to pass database
        const discussionData = {
            userProfile: user?.profilePicture,
            userName: userName,
            email: user.email,
            date: new Date(),
            discussionCategory: discussionCategory,
            discussionTitle: discussionTitle,
            content: content,
            likes: 0
        }

        console.log(discussionData)
        // add the the discussionData to the database
        axiosPublic.post('/api/discussions', discussionData)
            .then(res => {
                console.log(res.data)
                // show a alert if data added successfully
                toast.success("Posted successfully")
                //   remove the form data when successfully added to the database
                form.reset()
                setText("")
                navigate('/discussions')
                
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
            ['link', 'clean']                    //cleaner
        ]
    };


    return (
        // create discussion form
        <Container>
            <div className='py-32 rounded flex justify-center items-center'>
                <form action="" onSubmit={handlePostSubmission} className=' px-6 space-y-4 py-6'>
                    <div>
                        {/* bogger name */}
                        <label htmlFor="discussiongerName">
                            <p className=' text-base text-gray-500'>Your Name<span className='text-red-500'>*</span></p>
                            <input type="text" name='discussiongerName' defaultValue={user?.name} className='input input-bordered w-full' required />
                        </label>

                    </div>

                    {/* discussion category */}
                    <div>
                        <label htmlFor="discussionCategory">
                            <p className=' text-base text-gray-500'>Discussion Category<span className='text-red-500'>*</span></p>
                            <select name='discussionCategory' className='input input-bordered w-full  round' required>
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
                    {/* discussion Title */}
                    <div>
                        <label htmlFor="discussionTitle" >
                            <p className=' text-base text-gray-500'>Discussion Topic<span className='text-red-500'>*</span></p>
                            <input type="text-base" name='discussionTitle' className='input input-bordered w-full' required />
                        </label>
                    </div>

                    {/* discussion content */}
                    <div className='w-full'>
                        <label htmlFor="">
                            <p className=' text-base text-gray-500'>Discussion Content<span className='text-red-500'>*</span></p>
                            <ReactQuill
                                theme='snow'
                                value={text}
                                placeholder="Write about your discussion"
                                modules={modules}
                                onChange={handleChange}
                                className='lg:w-[60vw] bg-white rounded'
                                required
                            />
                        </label>
                    </div>

                    {/* submit button */}
                    <div className='flex w-full justify-center items-center'>
                        <input type="submit" value="Publish" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                    </div>
                </form>
            </div>
        </Container>
    );
};


export default CreateDiscussion;
