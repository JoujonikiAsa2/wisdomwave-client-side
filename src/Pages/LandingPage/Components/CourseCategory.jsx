import SectionTitle from "../../../SharedComponents/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import './styles.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// All course categoories will appear
const CourseCategory = () => {

    const axiosPublic = useAxiosPublic()
    const swiperParams = {
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            type: 'fraction',
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
            1600: {
                slidesPerView: 5,
            }
        },
    };

    const { refetch, data: categories = [] } = useQuery({
        queryKey: "categories",
        queryFn: async () => {
            const categories = await axiosPublic.get('/api/categories')
            return categories.data.data
        }
    })
    console.log(categories)

    return (
        <div>
            <SectionTitle title="Category" subtitle="Find course by clicking on the following categoryname"></SectionTitle>
            <Swiper {...swiperParams}
                modules={[Autoplay, Pagination]}
                className="mySwiper" >
                {
                    categories.map((category,index) => <SwiperSlide className='my-6'>
                        <div key={index} className="card border-[1px] w-60 h-16 p-2 rounded hover:Shadow-2xl mb-4 flex justify-center items-center bg-gradient-to-r from-[#29ADB2] to-[#0766AD]">
                            <h2 className="text-sm text-white font-bold">{category}</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default CourseCategory;