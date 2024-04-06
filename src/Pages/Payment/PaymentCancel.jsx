import React from 'react';
import { FaSadTear } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const PaymentCancel = () => {
    return (
        <div className='text-center h-screen flex flex-col justify-center items-center'>
            {/* ui shows when payment cancelled */}
            <div className='card w-[70vw] sm:w-[80vw] lg:w-96 md:w-96 space-y-4 border-2 h-64 p-4 justify-center items-center'>
                <FaSadTear className='text-5xl text-yellow-400' />
                <h3 className='text-xl font-bold'>Payment canceled</h3>
                <Link to='/' className='btn btn-sm capitalize'>Go back to the home</Link>
            </div>
        </div>
    );
};

export default PaymentCancel;