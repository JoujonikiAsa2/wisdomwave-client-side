import React from 'react';
import EllipsisText from 'react-ellipsis-text/lib/components/EllipsisText';
import { Link } from 'react-router-dom';

const BlogCards = ({ blog }) => {

    return (
        <Link to={`/blogs/${blog._id}`}>
            <div className='card shadow-xl hover:shadow-2xl w-[80vw] md:w-[40vw] lg:w-[27vw]'>
                <div className='flex gap-4 justif-center items-center p-4'>
                    <div>
                        <img src="https://i.ibb.co/mR4r3xD/photo-2023-09-20-09-03-48.jpg" alt="" className='w-12 h-12 rounded-full' />
                    </div>
                    <div>
                        <h2 className='text-lg font-bold text-gray-500'>{blog.bloggerName}</h2>
                        <p className='text-sm'>
                            Read {blog.documnetReadingTime} minutes</p>
                    </div>
                </div>
                <div className='p-4'>
                    <h2 className='text-lg font-bold '><EllipsisText text={blog.blogTitle} length={"40"} tooltip={blog.blogTitle}
                    /></h2>
                </div>
            </div>
        </Link>
    );
};

export default BlogCards;