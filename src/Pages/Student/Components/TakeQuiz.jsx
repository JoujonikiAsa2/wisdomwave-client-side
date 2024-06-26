import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../SharedComponents/Loader/Loader';


const TakeQuiz = () => {
    const { user } = useAuth()
    const [task, setTask] = useState([])
    const { id, title } = useParams()
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [totalScore, setTotalScore] = useState(0); // State to hold the total score
    const [takenQuiz, setTakenQUiz] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const patternTitle = title.toLowerCase()
    const axiosPublic = useAxiosPublic()
    const email = user?.email
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        axiosPublic.get(`/api/quiz/${email}/${patternTitle}`)
            .then(res => {
                setTakenQUiz(res.data.data)
                console.log(res.data)
            })
            .catch(
                err => console.log(err)
            )
    }, [user?.email, patternTitle])

    useEffect(() => {
        axiosPublic.get(`/api/assignments/${id}/${patternTitle}`)
            .then(res => {
                setTask(res.data.data)
                setIsLoading(false)
                console.log(res.data.data)
            })
            .catch(
                err => console.log(err)
            )
    }, [id, patternTitle])

    const quizSubmit = (e) => {
        e.preventDefault();
        console.log(selectedAnswers, task);

        let score = 0;

        // Loop through each question
        task.questions.forEach((question) => {
            console.log(question.answer.toLowerCase());
            // Check if the selected answer matches the correct answer
            if (selectedAnswers[question.question] === question.answer.toString()) {
                score += question.point; // Increment the score if the answer is correct
            }
        });

        const quiz = {
            studentEmail: user?.email,
            instructorEmail: task.instructorEmail,
            courseId: task.courseId,
            score: score,
            quizTitle: patternTitle,
            questions: task.questions,
            answers: answers
        };

        axiosPublic.post('/api/quiz', quiz)
            .then((res) => {
                console.log(res.data.data);
                setTotalScore(score);
                Swal.fire({
                    title: `Your score id ${score}/${task.marks}`,
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                        `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                        `
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });


    }
    const handleOptionSelect = (question, option) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [question]: option.toLowerCase(),
        }));
        console.log(`${question}: ${option}`)
        setAnswers(prev => {
            return [...prev, option]
        })
    };

    console.log(task, takenQuiz, answers)

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-full h-screen flex justify-center items-center pt-20'>
            {!takenQuiz ?
                <div className='w-2/3  flex flex-col justify-center items-center'>
                    <h2 className='text-lg font-bold py-2 capitalize'>Quiz title: {task?.title}</h2>
                    <form action="" className='w-full lg:w-[500px] md:w-[400px] h-[480px] overflow-auto px-4 border mb-6' onSubmit={quizSubmit}>
                        {
                            task?.questions?.map((question, index) =>
                                <>
                                    <div key={question._id} className='py-2'>
                                        <h2>{index + 1}. {question.question}</h2>
                                        <div>
                                            <div className='flex flex-col gap-2 py-2 ml-8'>
                                                <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question.question, question.option1)} required />{question.option1}</label>
                                                <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question.question, question.option2)} required />{question.option2}</label>
                                                <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question.question, question.option3)} required />{question.option3}</label>
                                                <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question.question, question.option4)} required />{question.option4}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='divider'></div>
                                </>
                            )
                        }
                        <div className='w-full flex justify-center pb-2'>
                            <input type="submit" value="Submit" className='btn btn-sm text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                        </div>
                    </form>
                </div>
                :
                takenQuiz.score === task.marks ?
                    <div className='w-[90%] lg:w-[400px] md:w-[400px] h-[300px] border card flex flex-col justify-center items-center space-y-2'>
                        <div className='w-20 h-20 rounded-full border-[#29ADB2] border-2 flex justify-center items-center'><p className='text-xl font bold'>{takenQuiz?.score}/{task?.marks}</p></div>
                        <h4 className='text-xl font-bold text-[#0766AD]'>Great Job!</h4>
                        <p> You have completed the Quiz and got <span className='font-bold'>{takenQuiz?.score} marks</span></p>
                        <Link to={`/viewQuiz/${id}/${title}`}>
                            <button className='btn btn-sm text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2'>View Result</button>
                        </Link>
                    </div>
                    :
                    <div className='w-[90%] lg:w-[400px] md:w-[400px] h-[300px] border card flex flex-col justify-center items-center'>
                        <div className='w-20 h-20 rounded-full border-[#29ADB2] border-2 flex justify-center items-center'><p className='text-xl font bold'>{takenQuiz?.score}/{task?.marks}</p></div>
                        <h2 className='text-lg font-bold py-2 capitalize'>Quiz title: {task?.title}</h2>
                        <p> You have completed the Quiz and got <span className='font-bold'>{takenQuiz.score} marks</span></p>
                        <Link to={`/viewQuiz/${id}/${title}`}>
                            <button className='btn btn-sm text-white w-40 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2'>View Result</button>
                        </Link>
                    </div>
            }
        </div>
    );
};

export default TakeQuiz;