import React from 'react';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { Link } from 'react-router-dom';
import "./upStyle.css"

const DiscussionCard = ({ discussion }) => {
    return (
        <Link to={`/discussions/${discussion._id}`}>
            {/* discussion card */}
            <div className='border-[1px] hover:shadow-xl w-[80vw] md:w-[40vw] lg:w-[20vw] shadow-sm bg-white'>
                <div className='flex gap-4 justif-center items-center p-4'>
                    {/* user profile image top view */}
                    <div>
                        <img src={discussion?.userProfile} alt="" className='w-8 h-8 rounded-full' />
                    </div>
                    <div>
                        <h4 className='text-[0.9rem] font-bold firstLetterUppercase'><EllipsisText text={discussion?.discussionTitle} length={"28"} tooltip={discussion?.discussionTitle}
                        /></h4>
                        <h2 className='text-[0.65rem] font-bold text-gray-500'><span className='text-black font-bold'>Author:</span> {discussion?.userName}</h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DiscussionCard;