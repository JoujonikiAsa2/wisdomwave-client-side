import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
const PaymentFail = () => {
    return (
        <div className='text-center h-screen flex flex-col justify-center items-center'>
            <div className='card w-[70vw] sm:w-[80vw] lg:w-96 md:w-96 space-y-4 border-2 h-64 p-4 justify-center items-center'>
                <RxCross1 className='text-3xl text-red-600' />
                <h3 className='text-xl font-bold'>Payment Failed</h3>
                <p className='text-sm'>Please try again after sometime</p>
                <Link to='/' className='btn btn-sm capitalize'>Go back to the home</Link>
            </div>
        </div>
    );
};

export default PaymentFail;