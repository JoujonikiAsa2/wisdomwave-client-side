import Carousel from "react-multi-carousel";
import SectionTitle from "../../../SharedComponents/SectionTitle/SectionTitle";
import "react-multi-carousel/lib/styles.css";

// All course categoories will appear
const CourseCategory = ({ handleCategorySearch }) => {


    const categories = [
        { label: 'Development', value: 'development' },
        { label: 'Business', value: 'business' },
        { label: 'Finance & Accounting', value: 'finance_accounting' },
        { label: 'IT & Software', value: 'it_software' },
        { label: 'Office Productivity', value: 'office_productivity' },
        { label: 'Personal Development', value: 'personal_development' },
        { label: 'Design', value: 'design' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Lifestyle', value: 'lifestyle' },
        { label: 'Photography & Video', value: 'photography_video' },
        { label: 'Health & Fitness', value: 'health_fitness' },
        { label: 'Music', value: 'music' },
        { label: 'Teaching & Academics', value: '' }
    ];

    console.log(categories)

    const handleLocalSearch = (category) => {
        handleCategorySearch(category)

    }

    return (
        <div>
            <SectionTitle title="Categories" subtitle="Find course by clicking on the following category name" total={categories.length}></SectionTitle>
                <Carousel
                    autoPlaySpeed={0}
                    className=" h-16  rounded-lg -z-0 "
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
                    <div onClick={() => handleLocalSearch('all')} className="border-[1px] hover:border-[2px] p-2 rounded mb-4 flex justify-center items-center hover:cursor-pointer  h-full mr-2">
                        <h2 className="capitalize">All</h2>
                    </div>
                    {
                        categories.map((category, index) => <div className='mr-2  h-full' key={index}>
                            <div onClick={() => handleLocalSearch(category.value)} className="border-[1px] hover:border-[2px] p-2 rounded mb-4 flex justify-center items-center hover:cursor-pointer  h-full">
                                <h2 className="capitalize">{category.label}</h2>
                            </div>
                        </div>)
                    }
                </Carousel>
        </div>
    );
};

export default CourseCategory;