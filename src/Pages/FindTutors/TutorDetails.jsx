import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import './style.css'
import "../../Pages/Discussions/upStyle.css"
import ContactForm from './ContactForm';

const TutorDetails = () => {
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const [tutor, setTutor] = useState([])

    // extract the details of the tutor
    useEffect(() => {
        axiosPublic.get(`/api/tutor/${id}`)
            .then(res => {
                setTutor(res.data.data)
                console.log(res.data.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [id])

    console.log(tutor)
    return (
        <div className='py-20 mx-[5vw]'>
            <h2 className='text-xl pt-4 '>Tutor Profile</h2>
            <div className='flex flex-col lg:flex-row md:flex-col lg:gap-10 text-[0.75rem'>

                <div className='lg:w-[60%] md:w-full flex flex-col rounded py-4 gap-10'>

                    <div className='w-full flex lg:flex-row md:flex-row flex-col gap-4 md:gap-8 lg:gap-10' style={{ border: "0.5px solid #c9cdd4" }}>
                        <div className='flex justify-start p-4'>
                            <img src={tutor?.profile} alt="" className='lg:w-[14.4rem] lg:h-[10.5rem] md:w-[14.4rem] md:h-[10.5rem] w-[10rem] h-[9.7rem] rounded-full object-fit' />
                        </div>
                        <div className="w-full flex px-4 overflow-auto">
                            <table className="w-full my-4" >
                                <tr>
                                    <td className=''><span className='font-semibold'>Name:</span></td>
                                    <td className='capitalize'>{tutor?.name}</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Age:</span></td>
                                    <td>{tutor?.age} Years</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Current Status:</span></td>
                                    <td className='capitalize '>{tutor?.currentStatus} &nbsp; {tutor?.currentStatus === 'available' ? <span class="badge badge-xs badge-accent indicator-item"></span> : <span class="badge badge-xs badge-error indicator-item"></span>}</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Preferable Class:</span></td>
                                    <td className='capitalize'>{tutor?.preferableClass?.join(', ')}</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Preferable Subject:</span></td>
                                    <td className='capitalize'>{tutor?.preferableSubject?.join(', ')}</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Preferable Location:</span></td>
                                    <td className='capitalize'>{tutor?.preferableLocation}</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Experience:</span></td>
                                    <td className='capitalize'>{tutor?.experience} Years</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Tuition Days</span></td>
                                    <td className='capitalize'> {tutor?.tuitionDays} Days/Week</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Expected Salary:</span></td>
                                    <td className='capitalize'>{tutor?.expectedSalary} Tk/Month</td>
                                </tr>
                                <tr>
                                    <td><span className='font-semibold'>Tuition Type:</span></td>
                                    <td className='capitalize'>{tutor?.tuitionType?.join(', ')}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div className='flex gap-10 w-full overflow-x-auto' id='education'>
                        <table className='w-full'>
                            <th>Name Of Exam</th>
                            <th>Institute</th>
                            <th>Subject</th>
                            <th>CGPA</th>
                            <tr>
                                <td className='capitalize'>{tutor?.educationalQualication?.eduName}</td>
                                <td className='capitalize'>{tutor?.educationalQualication?.institute}</td>
                                <td className='capitalize'>{tutor?.educationalQualication?.subject}</td>
                                <td className='capitalize'>{tutor?.educationalQualication?.cgpa}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='lg:w-[35%] md:w-2/4 w-full rounded mt-4 p-4 ' style={{ border: "0.5px solid #c9cdd4" }}>
                    <h3 className='text-xl pb-4 text-center'>Contact Here</h3>
                    <ContactForm tutorEmail={tutor?.email}></ContactForm>
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;