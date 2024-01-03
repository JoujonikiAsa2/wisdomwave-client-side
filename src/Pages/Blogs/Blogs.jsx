import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCards from "./BlogCards";

const Blogs = () => {
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
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading blogs</div>;
    }

    console.log("Blogs", blogs);

    return (
        <div className="my-32">
            {/* All blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center gap-6">
                {blogs.map((blog) => (
                    <BlogCards blog={blog}></BlogCards>
                ))}

            </div>
        </div>
    );
};

export default Blogs;