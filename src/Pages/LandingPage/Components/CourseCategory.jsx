import SectionTitle from "../../../SharedComponents/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


// All course categoories will appear
const CourseCategory = ({ handleCategorySearch }) => {

    const axiosPublic = useAxiosPublic()

    const { refetch, data: categories = [] } = useQuery({
        queryKey: "categories",
        queryFn: async () => {
            const categories = await axiosPublic.get('/api/categories')
            return categories.data.data
        }
    })
    console.log(categories)

    const handleLocalSearch = (category) => {
        handleCategorySearch(category)
    }

    return (
        <div>
            <SectionTitle title="Categories" subtitle="Find course by clicking on the following category name" total={categories.length}></SectionTitle>
            <Carousel
                autoPlaySpeed={0}
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
                    categories.map((category, index) => <div className='mr-2  h-[4.2rem]' key={index}>
                        <div onClick={() => handleLocalSearch(category)}  className="border-[1px] hover:border-[2px] p-2 rounded mb-4 flex justify-center items-center hover:cursor-pointer  h-[4.2rem]">
                            <h2 className="capitalize">{category}</h2>
                        </div>
                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default CourseCategory;