import React from 'react';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
import icon1 from '../../../assets/Photos/LandingPage/knowledge.png'
import icon2 from '../../../assets/Photos/LandingPage/conversation2.png'
import icon3 from '../../../assets/Photos/LandingPage/conversation1.png'
import icon4 from '../../../assets/Photos/LandingPage/conversation.png'

// WHy choose us section
const WhyChooseUs = () => {
    return (
        <div className='pb-12'>
            <SectionTitle title="Why choose Us"></SectionTitle>
            <div className='flex flex-col lg:flex-row md:flex-row justify-between items-center gap-6'>
                <div className=' space-y-6'>
                    <div className='flex justify-center items-center gap-6'>
                        <div>
                            <img src={icon1} alt="" className='w-16 h-16'/>
                        </div>
                        <div className='w-[80vw] md:w-80 lg:w-96'>
                            <h2 className='text-base font-bold'>Personalized Learning</h2>
                            <p className='text-sm'> It enabling students to customize their learning journey from finding tutors to engaging in discussions.</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-6'>
                        <div>
                            <img src={icon2} alt="" className='w-16 h-16'/>
                        </div>
                        <div className='w-[80vw] md:w-80 lg:w-96'>
                            <h2 className='text-base font-bold'>Personalized Learning</h2>
                            <p className='text-sm'> It enabling students to customize their learning journey from finding tutors to engaging in discussions.</p>
                        </div>
                    </div>
                </div>
                <div className=' space-y-6'>

                    <div className='flex justify-center items-center gap-6'>
                        <div>
                            <img src={icon3} alt="" className='w-16 h-16'/>
                        </div>
                        <div className='w-[80vw] md:w-80 lg:w-96'>
                            <h2 className='text-base font-bold'>Personalized Learning</h2>
                            <p className='text-sm'> It enabling students to customize their learning journey from finding tutors to engaging in discussions.</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-6'>
                        <div>
                            <img src={icon4} alt="" className='w-16 h-16'/>
                        </div>
                        <div className='w-[80vw] md:w-80 lg:w-96'>
                            <h2 className='text-base font-bold'>Personalized Learning</h2>
                            <p className='text-sm'> It enabling students to customize their learning journey from finding tutors to engaging in discussions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;