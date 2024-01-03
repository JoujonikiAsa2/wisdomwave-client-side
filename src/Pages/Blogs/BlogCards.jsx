import React from 'react';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { Link } from 'react-router-dom';

const BlogCards = ({ blog }) => {
    
    return (
        <Link to={`/blogs/${blog._id}`}>
            {/* blog card */}
            <div className='card border-2 hover:shadow-2xl w-[80vw] md:w-[40vw] lg:w-[27vw]'>
                <div className='flex gap-4 justif-center items-center p-4'>
                    {/* blogger profile image top view */}
                    <div>
                        <img src="https://i.ibb.co/mR4r3xD/photo-2023-09-20-09-03-48.jpg" alt="" className='w-12 h-12 rounded-full' />
                    </div>
                    {/* blogger name and document reading time */}
                    <div>
                        <h2 className='text-[1rem] font-bold text-gray-500'>{blog.bloggerName}</h2>
                        <p className='text-sm'>
                            Read {blog.documnetReadingTime} minutes</p>
                    </div>
                </div>
                {/* blog title */}
                <div className='p-4'>
                    <h2 className='text-[1.2rem] font-bold '><EllipsisText text={blog.blogTitle} length={"28"} tooltip={blog.blogTitle}
                    /></h2>
                </div>
            </div>
        </Link>
    );
};

export default BlogCards;