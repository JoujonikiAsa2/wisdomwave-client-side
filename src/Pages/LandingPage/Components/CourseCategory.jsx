import SectionTitle from "../../../SharedComponents/SectionTitle/SectionTitle";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Carousel from "react-multi-carousel";

// All course categoories will appear
const CourseCategory = () => {

    const axiosPublic = useAxiosPublic()

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
            <SectionTitle title="Category" subtitle="Find course by clicking on the following categoryname" total={categories.length}></SectionTitle>
            <Carousel
            autoPlaySpeed={3000}
            className=" h-full rounded-lg"
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
            }}>
                {
                    categories.map((category, index) => <div className=''>
                        <div key={index} className="card border-[1px] lg:w-[14.6rem] md:lg:w-[14.6rem] w-[90%] h-16 p-2 rounded hover:Shadow-2xl mb-4 flex justify-center items-center bg-gradient-to-r from-[#29ADB2] to-[#0766AD]">
                            <h2 className="text-sm text-white font-bold">{category}</h2>
                        </div>
                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default CourseCategory;