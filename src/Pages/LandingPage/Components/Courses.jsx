import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Course from './Course';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from "../../../hooks/useAuth";

const Courses = ({ courses, clickStatus }) => {

    const [ratings, setRatings] = useState([])
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [avaiableCourses, setAvaiableCourses] = useState([...courses])
    // console.log(user.email)

    useEffect(() => {

        axiosPublic.get('/api/courses')
            .then(res => {
                console.log(res.data.data)
                setAvaiableCourses(res.data.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [avaiableCourses])

    useEffect(() => {
        axiosPublic.get('/api/ratings')
            .then(res => {
                console.log(res.data.data)
                setRatings(res.data.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [ratings])



    if (clickStatus === true && courses?.length === 0) {
        return <div className='' >
            <SectionTitle title="Courses" total={courses.length} subtitle="Find your favorite courses here"></SectionTitle>
            <Carousel
                // arrows
                autoPlaySpeed={3000}
                className="w-full h-full rounded-lg "
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
                    <div className='rounded-lg'>
                        <p>No course available for the searched category</p>
                    </div >
                }
            </Carousel>
        </div>
    }

    return (
        <div className='' >
            <SectionTitle title="Courses" total={courses.length} subtitle="Find your favorite courses here"></SectionTitle>

            <Carousel
                // arrows
                autoPlaySpeed={3000}
                className="w-full h-full rounded-lg -z-0"
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
                    clickStatus === false && courses.length === 0 ? courses.map(course => <div className='rounded-lg' key={course._id}>
                        <Course course={course} btnText="Enroll Now">
                        </Course>
                    </div >) : courses.map(course => <div className='rounded-lg' key={course._id}>
                        <Course course={course} btnText="Enroll Now">
                        </Course>
                    </div >)
                }
            </Carousel>
        </div>
    )
};

export default Courses;