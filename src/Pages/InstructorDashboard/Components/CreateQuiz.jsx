import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import DashboardTitle from '../../../SharedComponents/DashboardTitle/DashboardTitle';

const CreateQuiz = () => {
    const {id} = useParams()
    console.log(id)
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [newQuestions, setQuestion] = useState([{ question: "", option1: "", option2: "", option3: "", option4: "", answer: "", point: 0 }])
    const [marks, setMarks] = useState(0)
    const [title, setTitle] = useState("")

    const handleAddField = () => {
        const newField = [...newQuestions, { question: "", option1: "", option2: "", option3: "", option4: "", answer: "", point: 0 }]
        setQuestion(newField)

    }

    const handleOnchangeValue = (event, index) => {
        const { name, value } = event.target;
        const newFields = [...newQuestions];
        newFields[index][name] = value.toLowerCase();
        setQuestion(newFields)
        console.log([...newQuestions])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target.value
        const quizQuestions = {
            title: title.toLowerCase(),
            courseId: id,
            marks: marks,
            instructorEmail: user?.email.toLowerCase(),
            questions: newQuestions
        }
        console.log(quizQuestions)

        axiosPublic.post('/api/assignments', quizQuestions)
            .then(res => {
                toast.success("Quiz created successfully")
                form.reset()
            })
    }
    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <DashboardTitle title="Create Quiz" subTitle="Create quiz for your course"></DashboardTitle>
            <div className='w-full  flex justify-center items-center pb-10'>
                <form action="" className='w-[80%] lg:w-1/2  flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                    <div className='w-full pb-12'>
                        <div className='w-full flex justify-center'>
                            <label htmlFor="" className='w-full flex flex-col'>
                                Course Title
                                <input type="text" name='courseTitle' className='input input-bordered w-full focus:outline-none'
                                    onChange={(event) => setTitle(event.target.value)}
                                    required />
                            </label>
                        </div>
                        <div className='w-full flex justify-center'>
                            <label htmlFor="" className='w-full flex flex-col'>
                                Marks:
                                <input type="number" name='marks' className='input input-bordered w-full focus:outline-none'
                                    onChange={(event) => setMarks(event.target.value)}
                                    required />
                            </label>
                        </div>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-6' >
                        {
                            newQuestions.map((question, index) =>
                                <div className='w-full flex flex-col justify-center items-center gap-3 '>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            Question {index + 1}:
                                            <input type="text" name='question' className='input input-bordered w-full focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            Opition 1:
                                            <input type="text" name='option1' className='input input-bordered w-full focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            Opition 2:
                                            <input type="text" name='option2' className='input input-bordered w-full focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            Option 3:
                                            <input type="text" name='option3' className='input input-bordered w-full focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            option 4:
                                            <input type="text" name='option4' className='input input-bordered w-full focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            Answer:
                                            <input type="text" name='answer' className='input input-bordered w-full  focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <label htmlFor="" className='w-full flex flex-col'>
                                            Point:
                                            <input type="number" name='point' className='input input-bordered w-full  focus:outline-none'
                                                onChange={(event) => handleOnchangeValue(event, index)}
                                                required />
                                        </label>
                                    </div>
                                </div>
                            )
                        }
                        <div className='pt-3 pb-3 flex flex-col justify-center items-center'>
                            Add More
                            <button className='btn btn-circle border border-gray-400' onClick={handleAddField}><FiPlus className='text-2xl'></FiPlus></button>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Create Quiz" className='btn text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateQuiz;