import Course from './Course';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css'
import useCourses from '../../../hooks/useCourses';
import Loader from '../../../SharedComponents/Loader/Loader';

// All courses will appear
const Courses = () => {

    const {courses, isLoading,isError} = useCourses()

    if (isLoading) {
        return <Loader></Loader>;
    }

    if (isError) {
        return <div className="my-20 text-center min-h-[80vh] flex justify-center items-center">Error loading blogs</div>;
    }

    const swiperParams = {
        spaceBetween: 20,
        pagination: {
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    };

    console.log(courses)
    return (
        <div>
            <SectionTitle title="Courses" subtitle="Find your favorite course here"></SectionTitle>
            <Swiper {...swiperParams}
                modules={[Pagination]}
                className="mySwiper" >
                {
                    courses !== undefined && courses.map(course => <SwiperSlide className='mt-8 mb-16'>
                        <Course key={course._id} course={course}>
                        </Course>
                    </SwiperSlide>)
                }
            </Swiper>

        </div>
    );
};

export default Courses;