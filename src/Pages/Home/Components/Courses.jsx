
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Course from './Course';
import SectionTitle from '../../../SharedComponents/SectionTitle/SectionTitle';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css'

const Courses = () => {

    const axiosPublic = useAxiosPublic()

    const { data: courses = [] } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/courses')
            return res.data.data
        }
    })

    const swiperParams = {
        spaceBetween: 20,
        pagination: {
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
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
            <div className='mb-12'>
                <Swiper {...swiperParams}
                    modules={[Pagination]}
                    className="mySwiper" >
                    {
                        courses.map(course => <SwiperSlide className='my-8'>
                            <Course key={course._id} course={course}>

                            </Course>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default Courses;