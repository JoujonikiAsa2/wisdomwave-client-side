import React from 'react';
import './style.css'
import ContactForm from '../FindTutors/ContactForm';
const TuitionCard = ({ tuition, setOpenForm, handleForm }) => {
    const localHandle = (email) =>{
        handleForm(email)
        setOpenForm(true)
    }
    return (
        <div class="tuition-card text-sm w-[90%] md:w-[40vw] lg:w-[28vw] h-[320px] lg:h-[310px]">
            <p className='text-gray-500'><strong>Email:</strong> <span id="userEmail" className=' text-gray-500'>{tuition.userEmail}</span></p>
            <p className='py-2 text-gray-500'><strong>District:</strong> <span id="district" className='capitalize text-white bg-green-400 rounded p-1 '>{tuition.district}</span></p>
            <p className='text-gray-500'><strong>Area:</strong> <span id="area" className='capitalize text-white border bg-[#29ADB2] p-1 rounded '>{tuition.area}</span></p>
            <p className='text-gray-500'><strong>Group:</strong> <span id="group" className='capitalize text-gray-500'>{tuition.group}</span></p>
            <p className='text-gray-500'><strong>Medium:</strong> <span id="medium" className='capitalize text-gray-500'>{tuition.medium}</span></p>
            <p className='text-gray-500'><strong>Tutoring Days:</strong> <span id="tutoringDays" className='capitalize text-gray-500'>{tuition.tutoringDays.join(', ')}</span></p>
            <div class="details">
                <p className='text-gray-500'><strong>Class:</strong> <span id="class">{tuition?.details.class}</span></p>
                <p className='text-gray-500'><strong>Subjects:</strong> <span id="subjects" className='capitalize text-gray-500'>{tuition?.details?.subjects.join(', ')}</span></p>
            </div>
            <div>
                <button className='btn btn-sm capitalize mt-2 text-white font-thin bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]' onClick={() => localHandle(tuition.userEmail)}>Send Request</button>
            </div>
        </div>
    );
};

export default TuitionCard;