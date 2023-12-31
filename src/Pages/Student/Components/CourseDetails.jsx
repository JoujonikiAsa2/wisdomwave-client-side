import { useState } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { FaCheck } from 'react-icons/fa';
import ReactiveButton from 'reactive-button';

const CourseDetails = () => {
    const navigate = useNavigate()
    // get the id from params
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    const [open, setOpen] = useState(false)
    // state for add to carts button
    const [state, setState] = useState('idle');

    // state for buy now
    const [buyState, setBuyState] = useState('idle');

    // handler for add to carts
    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    };

    // handler for buy now
    const buyNowOnClickHandler = () => {
        setBuyState('loading');
        setTimeout(() => {
            navigate('/payment')
        }, 2000);
    };
    // console.log(open)

    // fetch the data when window get open
    const { data: courseDetails = [] } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/courses/${id}`)
            return res.data.data.courseDetails
        }
    })
    console.log("Course details: ", courseDetails)

    // date formating
    const start = new Date(courseDetails?.enrollmentDates?.enrollStart)
    const end = new Date(courseDetails?.enrollmentDates?.enrollEnd)
    const classStart = new Date(courseDetails?.classStart)

    // utc date to localsctring
    const locales = "en-US";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const enrollWillStart = start.toLocaleString(locales, options);
    const enrollWillEnd = end.toLocaleString(locales, options);
    const classWillStart = classStart.toLocaleString(locales, options);

    return (
        <div className='flex justify-center items-center text-lg pb-8'>
            <div className='flex flex-col lg:flex-row md:flex-row justify-center mt-20 mx-[15vw] gap-12'>

                {/* Course details column 1 */}
                <div className='flex-1'>
                    {/* course details */}
                    <h2 className='text-2xl font-bold pb-4'>Course Details</h2>
                    <img src={courseDetails?.thumbnail} alt="" className='w-[80vw] lg:w-[30rem] md:w-80 h-80 rounded' />

                    {/* primary details for course */}
                    <h3 className='text-xl font-bold pt-4'>{courseDetails?.title}</h3>
                    <div className='text-lg'>
                        <h4 className='text-lg font-normal py-4'>{courseDetails?.subtitle}</h4>
                        <p className="text-lg flex gap-3"><Rating style={{ maxWidth: 90 }} readOnly value={courseDetails?.rating}></Rating>({courseDetails?.rating})</p>
                        <p><span className=' font-bold text-blue-500'>Total student:</span> &nbsp;{courseDetails?.totalStudents}</p>
                        <p><span className=' font-bold text-blue-500'>Enrollment Start:</span> &nbsp;{enrollWillStart}</p>
                        <p><span className=' font-bold text-blue-500'>Enrollment End:</span> &nbsp;{enrollWillEnd}</p>
                        <p><span className=' font-bold text-blue-500'>Class Start:</span> &nbsp;{classWillStart}</p>
                        <p><span className=' font-bold text-blue-500'>Created By: </span> &nbsp;{courseDetails.instructor}</p>
                        <p><span className=' font-bold text-blue-500'>Language: </span>&nbsp; {courseDetails?.languages}</p>
                        <p><span className=' font-bold text-blue-500'>Price:</span> &nbsp;${courseDetails?.enrollFee}</p>
                    </div>

                    {/* course description */}
                    <div>
                        <h4 className='text-xl font-bold py-4'>Description:</h4>
                        <div className=''>
                            {courseDetails.courseDescription}
                        </div>
                    </div>
                    <div>
                        {/* What will you learn */}
                        <div>
                            <h2 className='text-xl font-bold py-4'>What You Will Learn</h2>
                            <div className=''>
                                <ul className='list-disc pl-8 py02'>
                                    {courseDetails.whatYouWillLearn ? courseDetails.whatYouWillLearn.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    )) : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Column 2 */}
                <div className='flex-1 mt-12'>
                    {/* introductory video */}
                    <iframe
                        src={`https://www.youtube.com/embed/${courseDetails?.introductoryVideo?.split("=")[1] || 'XlvsJLer_No'}`} title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                        className='rounded w-[80vw] md:w-[50vw] lg:w-[500px] h-[320px]'></iframe>

                    {/* important info included at the course */}
                    <h5 className='text-lg font-bold justify-center items-center py-4'>This Course includes:</h5>
                    <div className=' '>
                        <p>On demand video: {courseDetails?.courseContents && courseDetails.courseContents.length}</p>
                        <p className='flex justify-start items-center gap-3'>Full time access: <span><FaCheck className='text-green-500'></FaCheck></span></p>
                        <p className='flex justify-start items-center gap-3'>Certificates: <span><FaCheck className='text-green-500'></FaCheck></span></p>
                    </div>
                    {/* buttons */}
                    <div className='py-4 flex justify-start items-center gap-2'>
                        <ReactiveButton
                            buttonState={buyState}
                            idleText="Buy Now"
                            loadingText="Loading"
                            successText="Ok"
                            onClick={buyNowOnClickHandler}
                        >

                        </ReactiveButton>
                        <ReactiveButton
                            buttonState={state}
                            idleText="Add to Carts"
                            loadingText="Loading"
                            successText="Added"
                            onClick={onClickHandler}
                        />
                    </div>

                    {/* Course contents accordion*/}
                    <div>
                        <h2 className='text-xl font-bold py-4'>Course Contents</h2>
                        <Accordion >
                            {courseDetails.courseContents ? courseDetails.courseContents.map((chapter, index) => (

                                <AccordionItem key={index} className='bg-transparent m-2'>
                                    <AccordionItemHeading >
                                        <AccordionItemButton className='bg-blue-200 p-3 rounded '>
                                            {chapter.title}
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>
                                            {chapter.content}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>

                            )) : null}
                        </Accordion>
                    </div>

                    {/* requrements */}
                    <div>
                        <h4 className='text-xl font-bold pt-4 pb-2'>Requirements</h4>
                        <div className='pl-6 '>
                            {courseDetails.requirements ? courseDetails.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;