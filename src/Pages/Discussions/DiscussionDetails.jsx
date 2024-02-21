import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./style.css"
import "./upStyle.css"
import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import useDiscussions from "../../hooks/useDiscussions";
import Loader from "../../SharedComponents/Loader/Loader";
import LinesEllipsis from "react-lines-ellipsis";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { FaComment } from "react-icons/fa";

const DiscussionDetails = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const { discussions } = useDiscussions()
    const [text, setText] = useState("");
    const [divHidden, setDivHidden] = useState()
    const ref = useRef()
    const [divRef, setDivRef] = useState(ref)

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
        queryFn: () => axiosPublic.get(`/api/discussions/${id}`).then((res) => res.data.data),
    });


    if (!discussion) {
        return <Loader></Loader>
    }



    const handleReply = (e) => {
        e.preventDefault()
        const reply = text
        console.log(reply)
        const replyData = {
            replier: user?.displayName,
            replydate: new Date(),
            reply: reply,
            profile: user?.photoURL
        }
        axiosPublic.post(`/api/discussions/${id}`, replyData)
            .then(res => {
                // console.log(res.data)
                refetch()
                setDivHidden(!divHidden)
                setText("")
            })
            .catch(e => {
                // console.log(e)

            })
    }

    const handleShowReply = () => {

    }
    return (
        <div className="flex lg:flex-row md:flex-row flex-col-reverse lg:gap-8 px-[2vw] pt-24 min-h-screen">
            <div className="flex flex-col gap-2 p-2 rounded">
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
            <div className="hidden md:divider md:divider-horizontal lg:divider lg:divider-horizontal pb-10"></div>
            {/* discussion details */}
            <div className="flex flex-col  w-full md:w-full min-h-screen lg:pb-10 lg:w-3/4">
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
                        <div className="border text-base p-4 cont bg-[#F3F3F3] rounded firstLetterUppercase max-h-[700px] overflow-y-auto"
                            dangerouslySetInnerHTML={{ __html: discussion?.content }}
                        />
                        <div className="btn w-16 btn-sm bg-transparent flex gap-1">
                            <FaComment></FaComment> <span>({discussion.replies.length})</span>
                        </div>

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
                <div className={`${discussion?.replies.length !== 0 ? "flex flex-col gap-4 justify-start items-start my-10" : "hidden"}`}>
                    <h4 className="text-lg">Responses: </h4>
                    {
                        discussion?.replies.map((reply, index) => <div key={index} className="flex flex-col  gap-4 justify-start items-start w-full h-full">
                            <div className="flex gap-20 items-centertext-sm">
                                <div className="flex gap-2">
                                    <img src={reply?.profile} alt="" className="h-6 w-6 rounded-full" />
                                    <div className="">
                                        <h4>{reply?.replier}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full border firstLetterUppercase p-2 text-base overflow-ellipsis max-h-72 overflow-y-auto" dangerouslySetInnerHTML={{ __html: reply?.reply }} />
                        </div>)
                    }

                </div>
            </div>
        </div >
    );
};

export default DiscussionDetails;