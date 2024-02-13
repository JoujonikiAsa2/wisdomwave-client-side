import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCards from "./BlogCards";
import Loader from "../../SharedComponents/Loader/Loader";
import { FcNext, FcPrevious } from "react-icons/fc";
import BannerSlider from "../LandingPage/Components/BannerSlider";
import slider2 from '../LandingPage/Components/discussion.json'
const Blogs = () => {
    const bg = "bg-[#C5E898]"
    const textColor = "text-[#0766AD]"
    const axiosPublic = useAxiosPublic();

    const { data: blogs = [], isLoading, isError } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get('/api/blogs');
                console.log("API Response:", res.data);
                return res.data.data;
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        },
    });

    if (isLoading) {
        return <Loader></Loader>;
    }

    if (isError) {
        return <div className="my-20 text-center min-h-[80vh] flex justify-center items-center">Error loading blogs</div>;
    }

    console.log("Blogs", blogs);

    return (
        <div className="">
            <BannerSlider slider={slider2} bg={bg} textColor={textColor} sliderText="Share your problems with others and get Help"></BannerSlider>
            {/* All blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center gap-4 mx-[5vw]">
                {blogs.map((blog) => (
                    <BlogCards blog={blog}></BlogCards>
                ))}

            </div>
            {/* pagination */}
            <div className='flex flex-row justify-center items-center gap-2 py-10'>
                {/* previous button */}
                <div>
                    <button className='btn border-blue-600 border-2'><FcPrevious></FcPrevious></button>
                </div>
                {/* total page */}
                <div className='flex flex-row justify-center items-center gap-2 py-10'>

                    <button className='btn border-blue-600 border-2'>1</button>
                    <button className='btn border-blue-600 border-2'>2</button>
                    <button className='btn border-blue-600 border-2'>3</button>
                </div>
                {/* next button */}
                <div>
                    <button className='btn border-blue-600 border-2'><FcNext></FcNext></button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;