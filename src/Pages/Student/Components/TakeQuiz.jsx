import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';


const TakeQuiz = () => {
    const {user} = useAuth()
    const [task, setTask] = useState([])
    const { id, title } = useParams()
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [totalScore, setTotalScore] = useState(0); // State to hold the total score

    const patternTitle = title.toLowerCase()
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get(`/api/assignments/${id}/${patternTitle}`)
            .then(res => {
                setTask(res.data.data)
                console.log(res.data.data)
            })
    }, [id])

    // console.log(task.questions)

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(selectedAnswers, task)
    //     let score = 0;
    //     // Loop through each question
    //     task.questions.forEach(question => {
    //         console.log(question.answer.toLowerCase())
    //         // Check if the selected answer matches the correct answer
    //         if (selectedAnswers[question._id] === question.answer.toLowerCase()) {

    //             score += question.point; // Increment the score if the answer is correct
    //         }
    //     });

    //     const quiz = {
    //         studentEmail: user?.email,
    //         instructorEmail: task.instructorEmail,
    //         courseId: task.courseId,
    //         score: score
    //     }
    //     axiosPublic.post('/api/quiz', quiz)
    //         .then(res => {
    //             console.log(res.data.data)
    //             setTotalScore(score)

    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    //     // Update the total score state
    //     if (score >= 6) {
    //         Swal.fire({
    //             title: `Congratulations! You got ${score}`,
    //             width: 600,
    //             padding: "3em",
    //             color: "#716add",
    //             background: "#fff url(/images/trees.png)",
    //             backdrop: `
    //             rgba(0,0,123,0.4)
    //             url("/images/nyan-cat.gif")
    //             left top
    //             no-repeat
    //         `
    //         });
    //     }
    //     else {
    //         Swal.fire({
    //             title: `Your score is ${score}`,
    //             width: 600,
    //             padding: "3em",
    //             color: "#716add",
    //             background: "#fff url(/images/trees.png)",
    //             backdrop: `
    //             rgba(0,0,123,0.4)
    //             url("/images/nyan-cat.gif")
    //             left top
    //             no-repeat
    //         `
    //         });
    //     }
    // };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(selectedAnswers, task);

        let score = 0;

        // Loop through each question
        task.questions.forEach((question) => {
            console.log(question.answer.toLowerCase());
            // Check if the selected answer matches the correct answer
            if (selectedAnswers[question._id] === question.answer.toString()) {
                score += question.point; // Increment the score if the answer is correct
            }
        });

        const quiz = {
            studentEmail: user?.email,
            instructorEmail: task.instructorEmail,
            courseId: task.courseId,
            score: score,
        };

        axiosPublic.post('/api/quiz', quiz)
            .then((res) => {
                console.log(res.data.data);
                setTotalScore(score);
            })
            .catch((err) => {
                console.log(err);
            });


        }
    const handleOptionSelect = (questionId, option) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: option.toLowerCase(),
        }));
    };

    console.log(task)
    return (
        <div className='w-full h-screen flex justify-center items-center pt-20'>
            <div className='w-2/3  flex flex-col justify-center items-center'>
                <h2 className='text-lg font-bold py-2'>Quiz title: {task.title}</h2>
                <form action="" className='w-full lg:w-[500px] md:w-[400px] h-[480px] overflow-auto px-4 border mb-6' onSubmit={handleFormSubmit}>
                    {
                        task?.questions?.map((question, index) =>
                            <>
                                <div key={question._id} className='py-2'>
                                    <h2>{index + 1}. {question.question}</h2>
                                    <div>
                                        <div className='flex flex-col gap-2 py-2 ml-8'>
                                            <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question._id, question.option1)} required />{question.option1}</label>
                                            <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question._id, question.option2)} required />{question.option2}</label>
                                            <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question._id, question.option3)} required />{question.option3}</label>
                                            <label className='flex gap-2'> <input type="radio" name={`option${index}`} onClick={() => handleOptionSelect(question._id, question.option4)} required />{question.option4}</label>
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
        </div>
    );
};

export default TakeQuiz;