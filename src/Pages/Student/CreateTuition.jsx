import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Container from '../../SharedComponents/Container/Container';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateTuition = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [text, setText] = useState("");
    const navigate = useNavigate()

    // handle form submission
    const handleTuitionCreation = (e) => {
        e.preventDefault()
        const form = e.target
        const userName = form.discussiongerName.value
        const discussionCategory = form.discussionCategory.value
        const discussionTitle = form.discussionTitle.value
        const content = text


        // discussion data object to pass database
        const discussionData = {
            userProfile: user?.photoURL,
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
                navigate('/discussions')
                
            })
            .catch((e) => {
                console.log(e.message)
            })
    }


    return (
        // create discussion form
        <Container>
            <div className='py-32 rounded flex justify-center items-center'>
                <form action="" onSubmit={handleTuitionCreation} className=' px-6 space-y-4 py-6'>
                    <div>
                        {/* bogger name */}
                        <label htmlFor="discussiongerName">
                            <p className=' text-base text-gray-500'>Your Name<span className='text-red-500'>*</span></p>
                            <input type="text" name='discussiongerName' defaultValue={user?.displayName} className='input input-bordered w-full' required />
                        </label>

                    </div>

                    {/* discussion category */}
                    <div>
                        <label htmlFor="discussionCategory">
                            <p className=' text-base text-gray-500'>Discussion Category<span className='text-red-500'>*</span></p>
                            <select name='discussionCategory' className='input input-bordered w-full ' required>
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


export default CreateTuition;
