import { Link, useParams, } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";

const PaymentSuccess = () => {
    const { tranId } = useParams()
    
    return (
        <div className='text-center h-screen flex flex-col justify-center items-center'>
            <div className='card w-[70vw] sm:w-[80vw] lg:w-96 md:w-96 space-y-4 border-2 h-64 p-4 justify-center items-center'>
                <FaCheck className='text-3xl text-green-600' />
                <h3 className='text-xl font-bold'>Payment Successfull</h3>
                <p className='text-lg'>Your Transaction Id is: <span className='text-[#0766AD]'>{tranId}</span></p>
                <Link to='/myCourses' className='btn btn-sm capitalize'>See your course</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;