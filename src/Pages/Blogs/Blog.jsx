import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import image from '../../assets/Photos/LandingPage/images.png'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./style.css"
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useState } from "react";

const Blog = () => {
    const { user } = useAuth()
    console.log(user)
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()

    // declare state to handle likes per user
    const [likes, setLikes] = useState(0)
    const [clicked, setClicked] = useState(false)

    // fetch blog data
    const { data: blog } = useQuery({
        queryKey: "blog",
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/blogs/${id}`)
            return res.data.data
        }
    })

    console.log(blog)

    // handle likes function
    const handleLikes = () => {
        setClicked(!clicked)
        if (clicked) {
            setLikes(likes - 1)
        }
        else {
            setLikes(likes + 1)
        }

    }
    return (
        // blog details
        <div className="flex flex-col justify-center items-center my-20 min-h-screen mx-[5vw] border-2 p-2">
            <div className="flex-1 space-y-4">
                <h2 className="text-xl font-bold">{blog?.blogTitle}</h2>
                <div className="w-96 rounded-full py-4 space-y-2">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        {/* blogger image */}
                        <img src={image} alt="" className="w-12 h-12 rounded-full" />
                        <div className="space-y-2">
                            {/* blogger name */}
                            <h4 className="text-base font-bold text-blue-700">{blog?.bloggerName}</h4>

                        </div>
                    </div>
                </div>
                {/* Blog contents */}
                <div className="blogDiv space-y-4"
                    dangerouslySetInnerHTML={{ __html: blog?.blogContent }}
                />
            </div>
            {/* divider */}
            <div className="divider lg:divider-secondary lg:divider-verticaly"></div>
            {/* like button */}
            <div className="w-full space-y-4 flex flex-col items-center">
                <div className="flex gap-4 justify-center items-center">
                    <button className="btn btn-sm flex gap-2" onClick={handleLikes}> Like {!clicked ? <FcLikePlaceholder></FcLikePlaceholder> : <FcLike></FcLike>}</button> <p>({likes})</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;