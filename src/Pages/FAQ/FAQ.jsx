import React, { useEffect, useState } from 'react';
import Banner from '../LandingPage/Components/Banner';
import bannaerAnimation from './wisdomFAQ.json'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import './styles.css'

const FAQ = () => {
    const [allFaqs, setAllFaqs] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/api/faqs')
            .then(res => {
                console.log(res.data.data)
                setAllFaqs(res.data.data)
            })
    }, [axiosSecure, allFaqs])
    return (
        <div className='pt-20 bg-gray-50'>
            <Banner slider={bannaerAnimation} sliderText="FAQ" subText="Do you have questions? We have answers(most fo the times!)"></Banner>
            <div className='w-full grid grid-cols-1  p-10 justify-center items-center justify-items-center'>
                <div className='p-4 rounded bg-white lg:w-[70%] md:w-[60%] w-[90%]'>
                    <h2 className='text-lg font-bold pb-2'>About WisdomWave</h2>
                    {
                        allFaqs.map((faq) => <Accordion allowZeroExpanded>

                            <AccordionItem >
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
                                            {faq.title}
                                        </p>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel
                                    style={{
                                        fontSize: '14px'
                                    }}>
                                    <p dangerouslySetInnerHTML={{ __html: faq?.content }} className='blogDiv text-gray-500 list-decimal'></p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>)
                    }

                </div>
            </div>
        </div>
    );
};

export default FAQ;