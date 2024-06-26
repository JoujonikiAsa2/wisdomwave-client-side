import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Course from './Course';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useCourses from "../../../hooks/useCourses";

const Courses = ({ courses, setCourses, clickStatus }) => {

    const { allCourses, refetch } = useCourses()
    const [ratings, setRatings] = useState([])
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    // console.log(user.email)

    useEffect(() => {
        refetch()
    }, [refetch, allCourses])

    useEffect(() => {
        axiosPublic.get('/api/ratings')
            .then(res => {
                console.log(res.data.data)
                setRatings(res.data.data)
            refetch()
            })
            .catch(e => {
                console.log(e);
            });
    }, [ratings])


    if (clickStatus === true && courses?.length === 0) {
        return <div className='' >
            <SectionTitle title="Courses" total={allCourses.length} subtitle="Find your favorite courses here"></SectionTitle>
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
            <SectionTitle title="Courses" total={allCourses.length} subtitle="Find your favorite courses here"></SectionTitle>

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
                    clickStatus === false && courses.length === 0 ? allCourses.map(course => <div className='rounded-lg' key={course._id}>
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