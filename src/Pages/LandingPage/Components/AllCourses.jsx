import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Course from './Course';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import useAxiosPublic, { axiosPublic } from '../../../hooks/useAxiosPublic';
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../SharedComponents/Loader/Loader";

export const AllCourses = ({ courses, setCourses }) => {

    const [total, setTotal] = useState([])
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    console.log(user.email)


    useEffect(() => {
        axiosPublic.get('/api/courses')
            .then(res => {
                // console.log(res.data.data)
                setTotal(res.data.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [total])

    return (
        <div className=''>
            <SectionTitle title="Courses" total={total.length} subtitle="Find your favorite course here"></SectionTitle>

            {total.length == 0 ? <Loader></Loader> : <Carousel
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

                {/* show all courses in card format with slider */}
                {
                    courses.length == 0 ? total.map(course => <div className='rounded-lg'>
                        <Course key={course._id} course={course} btnText="Enroll Now">
                        </Course>
                    </div >) : courses.map(course => <div className='rounded-lg'>
                        <Course key={course._id} course={course} btnText="Enroll Now">
                        </Course>
                    </div >)
                }
            </Carousel>

            }
        </div>
    )
};