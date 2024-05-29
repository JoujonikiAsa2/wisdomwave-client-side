import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../SharedComponents/Loader/Loader';

const ViewQuiz = () => {
    const { user } = useAuth();
    const [task, setTask] = useState([]);
    const { id, title } = useParams();
    const [takenQuiz, setTakenQuiz] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const patternTitle = title.toLowerCase();
    const axiosPublic = useAxiosPublic();
    const email = user?.email;

    useEffect(() => {
        axiosPublic.get(`/api/quiz/${email}/${patternTitle}`)
            .then(res => {
                setTakenQuiz(res.data.data);
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [user?.email, patternTitle, axiosPublic]);

    useEffect(() => {
        axiosPublic.get(`/api/assignments/${id}/${patternTitle}`)
            .then(res => {
                setTask(res.data.data);
                setIsLoading(false);
                console.log(res.data.data);
            })
            .catch(err => console.log(err));
    }, [id, patternTitle, axiosPublic]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='w-full h-screen flex justify-center items-center pt-20'>
            <div className='w-2/3 flex flex-col justify-center items-center'>
                <h2 className='text-lg font-bold py-2 capitalize'>Quiz title: {task?.title}</h2>
                <form className='w-full lg:w-[500px] md:w-[400px] h-[480px] overflow-auto px-4 border mb-6'>
                    {task?.questions?.map((question, index) => (
                        <div key={question._id} className='py-2'>
                            <h2>{index + 1}. {question.question}</h2>
                            <div>
                                <div className='flex flex-col gap-2 py-2 ml-8'>
                                    <label className='flex gap-2'>
                                        <input
                                            type="radio"
                                            name={`option${index}`}
                                            value={question.option1}
                                            checked={takenQuiz?.answers?.[index] === question.option1}
                                            readOnly
                                        />
                                        {question.option1}
                                    </label>
                                    <label className='flex gap-2'>
                                        <input
                                            type="radio"
                                            name={`option${index}`}
                                            value={question.option2}
                                            checked={takenQuiz?.answers?.[index] === question.option2}
                                            readOnly
                                        />
                                        {question.option2}
                                    </label>
                                    <label className='flex gap-2'>
                                        <input
                                            type="radio"
                                            name={`option${index}`}
                                            value={question.option3}
                                            checked={takenQuiz?.answers?.[index] === question.option3}
                                            readOnly
                                        />
                                        {question.option3}
                                    </label>
                                    <label className='flex gap-2'>
                                        <input
                                            type="radio"
                                            name={`option${index}`}
                                            value={question.option4}
                                            checked={takenQuiz?.answers?.[index] === question.option4}
                                            readOnly
                                        />
                                        {question.option4}
                                    </label>
                                </div>
                                <p><span className='font-bold text-[#0766AD]'>Correct Answer is:</span> {question.answer}</p>
                            </div>
                        </div>
                    ))}
                    <div className='divider'></div>
                </form>
            </div>
        </div>
    );
};

export default ViewQuiz;
