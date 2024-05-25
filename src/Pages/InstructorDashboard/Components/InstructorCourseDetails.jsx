import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';
import { FaCheck } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const InstructorCourseDetails = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    // get the id from params
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()
    console.log("Id", id)

    // get the stored data from the localstorage
    const storedCourses = JSON.parse(localStorage.getItem('courses'))

    // fetch the data when window get open
    const { data: courseDetails = [] } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/instructorUpdateCourses/${id}`)
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

    // payment handling function
    const handlePayment = (id) => {

        const finalPurchase = {
            userEmail: user.email,
            courseTitle: courseDetails.title,
            courseFee: courseDetails.enrollFee,
            transactionId: null,
            paidStatus: false
        };

        console.log(finalPurchase)
        axiosPublic.post(`/api/payment/${id}`, finalPurchase)
            .then(res => {
                console.log(res.data);
                window.location.replace(res.data.url);
                console.log(res.data)
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className='flex justify-center items-center text-lgp-3 mx-0 mb-8'>
            <div className='flex flex-col justify-center gap-6'>
                <div className=' w-full'>
                    <div className='flex flex-col lg:flex-row md:flex-row gap-10 w-full'>
                        <div className='lg:w-[50vw]'>
                            {/* title */}
                            <h3 className='text-xl font-bold py-4'>{courseDetails?.title}</h3>
                            {/* introductory video */}
                            <iframe
                                src={`https://www.youtube.com/embed/${courseDetails?.introductoryVideo?.split("=")[1] || 'XlvsJLer_No'}`} title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                                className='rounded w-full h-[315px] '></iframe>


                            {/* buttons */}
                        </div>
                        <div className='lg:w-1/2 lg:mt-10'>
                            {/* important info included at the course */}
                            <h5 className='text-base font-bold justify-center items-center py-4'>This Course includes:</h5>
                            <div className='flex justify-start gap-4'>
                                <div className=' text-sm'>
                                    <p>On demand video: {courseDetails?.courseContents && courseDetails.courseContents.length}</p>
                                    <p className='flex justify-start items-center gap-3'>Full time access: <span><FaCheck className='text-green-500'></FaCheck></span></p>
                                    <p className='flex justify-start items-center gap-3'>Certificates: <span><FaCheck className='text-green-500'></FaCheck></span></p>
                                </div>
                                <div className='text-sm'>
                                    <p><span className=' font-bold text-[#29ADB2]'>Total student:</span> &nbsp;{courseDetails?.totalStudents}</p>
                                    <p><span className=' font-bold text-[#29ADB2]'>Enrollment Start:</span> &nbsp;{enrollWillStart}</p>
                                    <p><span className=' font-bold text-[#29ADB2]'>Enrollment End:</span> &nbsp;{enrollWillEnd}</p>
                                    <p><span className=' font-bold text-[#29ADB2]'>Class Start:</span> &nbsp;{classWillStart}</p>
                                    <p><span className=' font-bold text-[#29ADB2]'>Created By: </span> &nbsp;{courseDetails.instructor}</p>
                                    <p><span className=' font-bold text-[#29ADB2]'>Language: </span>&nbsp; {courseDetails?.languages}</p>
                                    <p className="text-sm flex gap-3"><Rating style={{ maxWidth: 90 }} readOnly value={courseDetails?.rating}></Rating>({courseDetails?.rating})</p>
                                    <p><span className=' font-bold text-[#29ADB2]'>Price:</span> &nbsp;{courseDetails?.enrollFee} Tk</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                            <div className='py-4 flex justify-start items-center gap-2 text-white'>
                                <Link to={`/courseDashboard/${courseDetails.playlistId}`}>
                                    <button
                                        className='btn btn-sm text-white capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] '
                                    > Go to Course
                                    </button>
                                </Link>
                            </div>

                    {/* Course contents accordion*/}
                    <div>
                        <h2 className='text-lg font-bold pb-4'>Course Ouline</h2>
                        <Accordion allowZeroExpanded>
                            {courseDetails.courseContents ? courseDetails.courseContents.map((chapter, index) => (

                                <AccordionItem key={index}>
                                    <AccordionItemHeading >
                                        <AccordionItemButton
                                            style={{
                                                fontSize: '14px',
                                                backgroundColor: '#F3F3F3',
                                                height: '50px',
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center'
                                            }}>
                                            <p>
                                                {chapter.title}
                                            </p>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel
                                        style={{
                                            fontSize: '14px'
                                        }}>
                                        {chapter.content}
                                    </AccordionItemPanel>
                                </AccordionItem>

                            )) : null}
                        </Accordion>
                    </div>
                </div>
                <div className=' w-full '>
                    {/* course description */}
                    <div>
                        <h4 className='text-lg font-bold pb-4'>Course Details</h4>
                        <div className='text-sm'>
                           <div dangerouslySetInnerHTML={{__html: courseDetails?.courseDescription}}></div>
                        </div>
                    </div>
                    <div>
                        {/* What will you learn */}
                        <div>
                            <h2 className='text-lg font-bold py-4'>What You Will Learn</h2>
                            <div className='text-sm'>
                                <ul className='list-disc pl-8 py02'>
                                    {courseDetails.whatYouWillLearn ? courseDetails.whatYouWillLearn.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    )) : null}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* requrements */}
                    <div>
                        <h4 className='text-lg font-bold pt-4 pb-2'>Requirements</h4>
                        <div className='pl-6 text-sm'>
                            {courseDetails?.requirements ? courseDetails.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                            )) : null}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InstructorCourseDetails;