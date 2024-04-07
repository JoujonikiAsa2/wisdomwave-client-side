import { Link, useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const PaymentSuccess = () => {
    const { course_Id } = useParams();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    console.log(course_Id);

    const { data: courseDetails = [] } = useQuery({
        queryKey: ['course', course_Id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/courses/${course_Id}`);
            return res.data.data.courseDetails;
        }
    });

    // get courseIds from localStorage
    let storedCourses = JSON.parse(localStorage.getItem('courses')) || [];

    // Check if id already stored
    if (!storedCourses.includes(course_Id)) {
        
        // Add courseIds
        storedCourses.push(course_Id);

        // Store updated array back to localStorage
        localStorage.setItem('courses', JSON.stringify(storedCourses));
    }

    return (
        <div className='text-center h-screen flex flex-col justify-center items-center'>
            <div className='card w-[70vw] sm:w-[80vw] lg:w-96 md:w-96 space-y-4 border-2 h-64 p-4 justify-center items-center'>
                <FaCheck className='text-3xl text-green-600' />
                <h3 className='text-xl font-bold'>Payment Successful</h3>
                <Link to='/myCourses' className='btn btn-sm capitalize'>See your courses</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
