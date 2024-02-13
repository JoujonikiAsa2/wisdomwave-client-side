import useCourses from '../../../hooks/useCourses';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Course from './Course';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import { axiosPublic } from '../../../hooks/useAxiosPublic';

export const AllCourses = () => {

    const { courses } = useCourses()
    const length = courses.length
    const [total, setTotal] = useState()

    useEffect(() => {
        axiosPublic.get('/api/totalCourse')
            .then(res => {
                console.log(res.data.data)
                setTotal(res.data.data)
            })
            .catch(e => {
                console.log(error)
            })
    })
    console.log(total)
    return (
        <div className=''>
            <SectionTitle title="Courses" total={total} subtitle="Find your favorite course here"></SectionTitle>

            <Carousel
                // arrows
                autoPlaySpeed={3000}
                className="w-full h-full rounded-lg"
                draggable={true}
                infinite={false}
                responsive={{
                    superLargeDesktopp: {
                        // the naming can be any, depends on you.
                        breakpoint: { max: 4000, min: 1400 },
                        items: 5,
                    },
                    superSmallMobile: {
                        // the naming can be any, depends on you.
                        breakpoint: { max: 550, min: 0 },
                        items: 1,
                    },
                    desktop: {
                        breakpoint: {
                            max: 1400,
                            min: 1024
                        },
                        items: 4,
                    },
                    mobile: {
                        breakpoint: {
                            max: 800,
                            min: 560
                        },
                        items: 2,
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 800
                        },
                        items: 3,
                    },
                }}
               >
                {
                    courses !== undefined && courses.map(course => <div className='rounded-lg'>
                        <Course key={course._id} course={course}>
                        </Course>
                    </div>)
                }
            </Carousel>
        </div>
    )
};