import React from 'react';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {

    const { title, thumbnail, instructor, rating, totalStudents, enrollFee } = course.courseDetails
    // console.log("Print", title, instructor, rating, limitOfStudents, enrollFee)
    return (
        <Link to={`/courseDetails/${course._id}`}>
            <div className="h-[13rem] hover:shadow hover:cursor-pointer relative w-full border bg-white flex items-center rounded-lg">
                <div className='lg:w-64 flex justify-between items-center h-full rounded-lg'>
                    <img src={thumbnail} alt="" className="w-full md:w-56 lg:w-56 h-full rounded-lg rounded-r-none object-fill" />
                </div>
                <div className='flex flex-col pt-8'>
                    <div className={`w-16 h-7 text-black bg-[#29ADB2] p-1 text-sm text-center rounded-lg absolute bottom-48 top-2 right-2 font-bold`}>
                        <p>{enrollFee}Tk</p>
                    </div>
                    <div className='text-start px-2 space-y-2 h-full'>
                        <div className='h-[5rem] md:h-[3rem] lg:h-[3rem]'>
                            <h5 className="text-sm font-bold py-2">{title}</h5>
                            <p className="text-xs font-bold capitalize">Instructor: <span className='font-normal'>{instructor}</span></p>
                        </div>

                        <div className='flex flex-col-reverse justify-between self-end'>
                            <div className='space-y-2'>
                                <p className="text-sm flex gap-3"><Rating style={{ maxWidth: 70 }} readOnly value={rating}></Rating>({rating})</p>
                                <p className="text-sm font-bold">Total Student: <span className='font-normal'>{totalStudents}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default CourseCard;