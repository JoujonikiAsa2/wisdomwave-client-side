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
            <SectionTitle title="Why Choose Us"></SectionTitle>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-between items-center gap-2'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div>
                        <img src={icon1} alt="" className='w-12 h-12' />
                    </div>
                    <div className='w-[80vw] md:w-[290px] lg:w-[290px] text-center'>
                        <h2 className='text-base font-bold'>
                            Personalized Learning
                        </h2>
                        <p className='text-sm text-gray-500'>
                            It enabling students to customize their learning journey from finding tutors to engaging in discussions.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div>
                        <img src={icon2} alt="" className='w-12 h-16' />
                    </div>
                    <div className='w-[80vw] md:w-[290px] lg:w-[290px] text-center'>
                        <h2 className='text-base font-bold'>
                            Dynamic Learning Environment
                        </h2>
                        <p className='text-sm text-gray-500'>
                            Offering an engaging learning atmosphere through innovative methods like a live class in every week and finding tutors.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center gap-2'>
                    <div>
                        <img src={icon3} alt="" className='w-12 h-12' />
                    </div>
                    <div className='w-[80vw] md:w-[290px] lg:w-[290px] text-center'>
                        <h2 className='text-base font-bold'>
                            Global Communication
                        </h2>
                        <p className='text-sm text-gray-500'>
                            By uniting learners and educators worldwide, the platform creates a diverse learning environment.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <div>
                        <img src={icon4} alt="" className='w-12 h-12' />
                    </div>
                    <div className='w-[80vw] md:w-[290px] lg:w-[290px] text-center'>
                        <h2 className='text-base font-bold'>
                            Interactive Feature
                        </h2>
                        <p className='text-sm text-gray-500'>
                            It boasts interactive tools, connecting students with tutors and enabling personalized tutoring sessions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;