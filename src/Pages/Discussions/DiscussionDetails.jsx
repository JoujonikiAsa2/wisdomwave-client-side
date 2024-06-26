import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./style.css"
import "./upStyle.css"
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import useDiscussions from "../../hooks/useDiscussions";
import Loader from "../../SharedComponents/Loader/Loader";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { FaComment, FaReply } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import toast from "react-hot-toast";

const DiscussionDetails = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const { discussions } = useDiscussions()
    const [text, setText] = useState("");
    const [divHidden, setDivHidden] = useState()
    const ref = useRef()
    const [totalClicked, setTotalClicked] = useState(null)
    const navigate = useNavigate()

    // useEffect(() => {
    //     axiosPublic.get(`/api/likes/${id}/${user?.email}`)
    //         .then(res => {
    //             if (res.data.status === "success") {
    //                 setTotalClicked(true)
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setTotalClicked(false)
    //         })
    // }, [id, user?.email])

    const { data: likeCounts, refetch: likeRefetch } = useQuery({
        queryKey: ["likeCounts", id, user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/likes/${id}/${user?.email}`)
            if(res.data.status === "success"){
                setTotalClicked(true)
                likeRefetch()
            }
            else{
                setTotalClicked(false)
                likeRefetch()
            }
            return res.data.data
        }
    })

    // console.log(id)
    // handle content field text changes
    const handleChange = (value) => {
        setText(value);
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'blockquote', 'code-block', { 'list': 'ordered' }, { 'list': 'bullet' }, 'link', { 'script': 'sub' }, { 'script': 'super' }, { 'header': [1, 2, 3, 4, 5, 6, true] }, { 'color': [] }, { 'background': [] },
                { 'align': [] }]
        ]
    };

    const { data: discussion, refetch } = useQuery({
        queryKey: ["discussion", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/discussions/${id}`);
            return res.data.data;
        }
    });


    if (!discussion) {

        return <Loader></Loader>
    }


    const handleLikes = () => {
        const userId = user?.email
        axiosPublic.patch(`/api/likes/${id}`, { userId: userId })
            .then(res => {
                console.log(res.data)
                if (res.data.status === "success") {
                    setTotalClicked(true)
                }
                else {
                    setTotalClicked(false)
                }
                refetch()
                likeRefetch()
            })
            .catch(e => {
                console.log(e)
                setTotalClicked(false)
                refetch()
                likeRefetch()
            })
    }


    // Handle post reply
    const handleComment = (e) => {
        e.preventDefault()
        const comment = text
        console.log(comment)
        const commentData = {
            commenterName: user?.displayName,
            commenterEmail: user?.email,
            replydate: new Date(),
            comment: comment,
            isComment: true,
            profile: user?.photoURL
        }

        // send the post reply to the backend
        axiosPublic.post(`/api/discussions/${id}`, commentData)
            .then(res => {
                // console.log(res.data)
                refetch()
                console.log(ref.current.ref)
                refetch()
                setDivHidden(!divHidden)
                setText("")
            })
            .catch(e => {
                // console.log(e)

            })
    }

    const handleDelete = (id) => {
        axiosPublic.delete(`/api/discussions/${id}/${user.email}`)
            .then(res => {
                toast.success('Successfully Deleted!', { duration: 1000 });
                setTimeout(() => {
                    navigate("/discussions")
                })
            })
            .catch((e) => {
                console.log(e.message)
            })
        console.log("delete", id)
    }

    // console.log("totalClicked",totalClicked)

    console.log(totalClicked)

    return (
        <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-center lg:gap-8 px-[2vw] pt-24 min-h-screen max-w-[2300px]">
            <div className="flex flex-col gap-2 p-4 rounded bg-[#F3F3F3] mb-10">
                <h2 className="text-lg pb-2 border-b-2 font-bold">All Blogs</h2>
                {
                    discussions.map((item, index) =>
                        <Link to={`/discussions/${item._id}`} key={index}>
                            {/* discussion card */}
                            <div key={item._id} className={`w-[250px] bg-white ${id == item._id && 'border-[0.2px] border-[#29ADB2]'}`}>
                                <div className='flex gap-2 justif-center items-center p-2 text-xs'>
                                    {/* user profile image top view */}
                                    <div>
                                        <img src={item?.userProfile} alt="" className='w-5 h-5 rounded-full' />
                                    </div>
                                    <div>
                                        <h4 className='font-bold firstLetterUppercase'>
                                            {item && item.discussionTitle ? (
                                                <EllipsisText text={item.discussionTitle} length={28} tooltip={discussion?.discussionTitle} />
                                            ) : (
                                                <span>No discussion title available</span>
                                            )}
                                        </h4>

                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
            {/* discussion details */}
            <div className="flex flex-col  w-full md:w-full min-h-screen lg:pb-10 lg:w-2/4">
                <div className="w-full rounded-full py-4 space-y-2">
                    <h2 className="text-xl font-medium firstLetterUppercase">{discussion?.discussionTitle}</h2>
                    <div className="flex flex-col space-y-3">
                        {/* User image */}
                        <div className="flex justify-start items-center gap-2">
                            <div className="flex items-center gap-3">
                                <img src={discussion?.userProfile} alt="" className="w-10 h-10 rounded-full" />
                                <div className="space-y-2">
                                    {/* User name */}
                                    <h4 className="text-base">{discussion?.userName}</h4>
                                </div>
                            </div>
                            <div>
                                {
                                    discussion?.email === user?.email && <button className="btn btn-sm bg-error" onClick={() => handleDelete(discussion?._id)}>Delete</button>
                                }
                            </div>
                        </div>
                        {/* discussion contents */}
                        <div className="border text-base p-4 cont bg-[#F3F3F3] rounded firstLetterUppercase max-h-[500px] max-w-[900px] overflow-y-auto"
                            dangerouslySetInnerHTML={{ __html: discussion?.content }}
                        />
                        <div className="w-32 flex gap-4 items-center bg-transparent">
                            <div className="flex gap-1 items-center">
                                <FaComment></FaComment> <span>({discussion?.comments?.length})</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <button onClick={handleLikes}><BiSolidLike className={`text-lg ${totalClicked === true ? "text-blue-400" : "text-black "}`}></BiSolidLike></button> <span>({discussion.likes})</span>
                            </div>
                        </div>

                        {/* Post comment form */}
                        <form action="" className="flex flex-col items-startgap-2" onSubmit={(e) => handleComment(e)}>
                            <div className='lg:w-2/3'>
                                <label htmlFor="">
                                    <ReactQuill
                                        theme='snow'
                                        placeholder="Write your answer"
                                        value={text}
                                        modules={modules}
                                        onChange={handleChange}
                                        className='w-full bg-white rounded'
                                        required
                                    />
                                </label>
                            </div>
                            <div className='lg:w-1/2'>
                                <input type="submit" value="Post your reply" className='btn text-white font-medium w-full capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2' />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Comments section */}
                <div className={`${discussion?.comments.length !== 0 ? " border-gray-400  p-4 flex flex-col gap-4 justify-start items-start my-10" : "hidden"}`}>
                    <h4 className="text-lg">Comments: </h4>
                    {
                        discussion?.comments.map((comment, index) => <div key={index} className="flex flex-col  gap-4 justify-start items-start w-full h-full">
                            <div className="flex gap-20 items-centertext-sm">
                                <div className="flex flex-col gap-2">
                                   <div className="flex gap-2">
                                        <img src={comment?.profile} alt="" className="h-6 w-6 rounded-full" />
                                        <div className="">
                                            <h4>{comment?.commenterName}</h4>
                                        </div>
                                   </div>
                                    <div dangerouslySetInnerHTML={{ __html: comment?.comment }} className="text-gray-500 ml-8">
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }

                </div>
            </div>
        </div >
    );
};

export default DiscussionDetails;