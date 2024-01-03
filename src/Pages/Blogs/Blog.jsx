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
    const [likes, setLikes] = useState(0)
    const [clicked, setClicked] = useState(false)

    const { data: blog } = useQuery({
        queryKey: "blog",
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/blogs/${id}`)
            return res.data.data
        }
    })

    console.log(blog)

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
        <div className="flex flex-col justify-center items-center my-20 min-h-screen mx-[15vw]">
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold">{blog?.blogTitle}</h2>
                <div className="w-96 rounded-full py-4 space-y-2">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <img src={image} alt="" className="w-12 h-12 rounded-full" />
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-blue-700">{blog?.bloggerName}</h4>
                            <div className="flex gap-2 justify-start items-center">
                                {
                                    blog?.facebookLink != null ? <Link to={`${blog?.facebookLink}`} target="_blank"> <FaFacebook className="text-lg lg:text-xl md:text-xl text-blue-600" ></FaFacebook></Link> : ""
                                }
                                {
                                    blog?.linkedinLink != null ? <Link to={`${blog?.linkedinLink}`} target="_blank"><FaLinkedin className="text-lg lg:text-xl md:text-xl text-blue-600"></FaLinkedin></Link> : ""
                                }
                                {
                                    blog?.githubLink != null ? <Link to={`${blog?.githubLink}`} target="_blank"><FaGithub className="text-lg lg:text-xl md:text-xl"></FaGithub></Link> : ""
                                }
                            </div>
                            <p>Read {blog?.documnetReadingTime} min</p>
                        </div>
                    </div>


                </div>
                <div className="blogDiv space-y-4"
                    dangerouslySetInnerHTML={{ __html: blog?.blogContent }}
                />
            </div>
            <div className="divider lg:divider-secondary lg:divider-verticaly"></div>
            <div className="w-full space-y-4 flex flex-col items-center">
                <div className="flex gap-4 justify-center items-center">
                    <button className="btn btn-sm flex gap-2" onClick={handleLikes}> Like {!clicked ? <FcLikePlaceholder></FcLikePlaceholder> : <FcLike></FcLike>}</button> <p>({likes})</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;