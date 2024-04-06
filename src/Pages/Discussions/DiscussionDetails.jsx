import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
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

const DiscussionDetails = () => {
    const { user } = useAuth()
    localStorage.setItem('totalClicked', false)
    const localItem = JSON.parse(localStorage.getItem('totalClicked'))
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const { discussions } = useDiscussions()
    const [text, setText] = useState("");
    const [divHidden, setDivHidden] = useState()
    const ref = useRef()
    const [divRef, setDivRef] = useState()
    const [clicked, setClicked] = useState(false)
    const [totalClicked, setTotalClicked] = useState(localItem)

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

        const likes = {
            userId: user.email
        };
        axiosPublic.get("/api/discussions/likes/user", likes)
            .then(res => {
                console.log("updated decreased successfully", res.data);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }


    // Handle post reply
    const handleReply = (e) => {
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
                setDivHidden(!divHidden)
                setText("")
            })
            .catch(e => {
                // console.log(e)

            })
    }

    // Handle to send reply
    const handleReplies = (e) => {
        e.preventDefault()
        const replyData = {
            replierName: user?.displayName,
            replierEmail: user?.email,
            replydate: new Date(),
            isReply: true,
            reply: e.target.reply.value,
            profile: user?.photoURL
        }

        // send the post reply to the backend
        axiosPublic.post(`/api/discussions/${id}`, replyData)
            .then(res => {
                // console.log(res.data)
                refetch()
                console.log(ref.current.ref)
                e.target.reset()
            })
            .catch((e) => {
                console.log(e.message)
            })
        console.log("Your successfully submited the reply", e.target.replyToReplier.value)
    }

    // console.log("totalClicked",totalClicked)

    return (
        <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse justify-center lg:gap-8 px-[2vw] pt-24 min-h-screen max-w-[2300px]">
            <div className="flex flex-col gap-2 p-4 rounded bg-[#F3F3F3] mb-10">
                <h2 className="text-lg pb-2 border-b-2 font-bold">All Blogs</h2>
                {
                    discussions.map(item =>
                        <Link to={`/discussions/${item._id}`}>
                            {/* discussion card */}
                            <div key={item._id} className={`w-[250px] bg-white ${id == item._id && 'border-[0.2px] border-[#29ADB2]'}`}>
                                <div className='flex gap-2 justif-center items-center p-2 text-xs'>
                                    {/* user profile image top view */}
                                    <div>
                                        <img src={item?.userProfile} alt="" className='w-5 h-5 rounded-full' />
                                    </div>
                                    <div>
                                        <h4 className='font-bold firstLetterUppercase'><EllipsisText text={item?.discussionTitle} length={"28"} tooltip={discussion?.discussionTitle}
                                        /></h4>

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
                            <img src={discussion?.userProfile} alt="" className="w-10 h-10 rounded-full" />
                            <div className="space-y-2">
                                {/* User name */}
                                <h4 className="text-base">{discussion?.userName}</h4>
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
                                <button onClick={handleLikes}><BiSolidLike className={`text-lg ${totalClicked === 1 ? "text-blue-400" : "text-black "}`}></BiSolidLike></button> <span>({discussion.likes})</span>
                            </div>
                        </div>

                        {/* Post comment form */}
                        <form action="" className="flex flex-col items-startgap-2" onSubmit={(e) => handleReply(e)}>
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
                <div className={`${discussion?.comments.length !== 0 ? "border-[1px] border-gray-400  p-4 flex flex-col gap-4 justify-start items-start my-10" : "hidden"}`}>
                    <h4 className="text-lg">Comments: </h4>
                    {
                        discussion?.comments.map((comment, index) => <div key={index} className="flex flex-col  gap-4 justify-start items-start w-full h-full">
                            <div className="flex gap-20 items-centertext-sm">
                                <div className="flex gap-2">
                                    <img src={comment?.profile} alt="" className="h-6 w-6 rounded-full" />
                                    <div className="">
                                        <h4>{comment?.commenterName}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full firstLetterUppercase p-2 text-base overflow-ellipsis max-h-72 overflow-y-auto  border-[1px] border-gray-400 text-gray-500 rounded" dangerouslySetInnerHTML={{ __html: comment?.comment }} />

                            {/* reply button */}
                            <h2
                                className="lg:ml-8 hover:cursor-pointer flex items-center gap-1"
                                onClick={() => {
                                    setDivRef(ref.current.ref = index)
                                    setClicked(true)
                                }} >

                                <FaReply className="text-xs"></FaReply>Reply ({discussion?.replies
                                    .filter((reply) => reply.replierEmail === comment.commenterEmail).length})
                            </h2>

                            {/* all replies to a individual user */}
                            <div className={`lg:ml-10 border-[1px] border-gray-400 w-[90%] p-4 ${discussion?.replies.length !== 0 ? "flex flex-col gap-4" : "hidden"}`}>
                                {
                                    discussion?.replies
                                        .filter((reply) => reply.replierEmail === comment.commenterEmail)
                                        .map((reply, replyIndex) => (
                                            <div key={replyIndex} className="flex flex-col gap-2">
                                                {/* Render individual reply content here */}
                                                <div className="flex gap-2">
                                                    <img src={comment?.profile} alt="" className="h-6 w-6 rounded-full" />
                                                    <div className="">
                                                        <h4>{reply?.replierName}</h4>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">{reply.reply}</p>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>

                            {/* reply form for reply to the replier */}
                            <form onSubmit={(e) => handleReplies(e)}>
                                <div className={`gap-2 ${index == divRef && clicked == true ? "flex" : "hidden"}`} ref={ref}>
                                    <div id={index} className="lg:ml-10">
                                        <textarea type="text" name="reply" className="input input-bordered border-[1px] border-gray-400 lg:w-80 w-full focus:outline-none" placeholder="Reply here..." />
                                    </div>
                                    <input type="submit" value="Send" className="input input-bordered border-[1px] hover:cursor-pointer border-gray-400 w-20 focus:outline-none bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white" />
                                </div>
                            </form>
                        </div>)
                    }

                </div>
            </div>
        </div >
    );
};

export default DiscussionDetails;