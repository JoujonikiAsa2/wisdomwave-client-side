import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Link } from 'react-router-dom';

//Course card design

const Course = ({ course, enrolled }) => {

    const { title, thumbnail, instructor, rating, totalStudents, enrollFee } = course.courseDetails
    // console.log("Print", title, instructor, rating, limitOfStudents, enrollFee)
    return (
        <div className="lg:w-[14.6rem] md:lg:w-[14.6rem] w-[90%] h-[20.5rem] lg:h-[18rem] md:h-[18rem] hover:shadow hover:cursor-pointer relative card pb-2 border bg-white">
            <div className='flex justify-center items-center'>
                <img src={thumbnail} alt="" className="w-full h-32  rounded-t-lg" />
            </div>
            <div className={`${enrolled ? "hidden" : 'w-16 h-7 text-black bg-[#29ADB2] p-1 text-sm text-center rounded-lg absolute bottom-48 top-2 left-2 font-bold'}`}>
                <p>{enrollFee}Tk</p>
            </div>
            <div className='text-start px-2 space-y-6 h-full'>
                <div className='h-[5rem] md:h-[3rem] lg:h-[3rem]'>
                    <h5 className="text-sm font-bold py-2">{title}</h5>
                    <p className="text-xs font-bold capitalize">Instructor: <span className='font-normal'>{instructor}</span></p>
                </div>

                <div className='flex flex-col-reverse justify-between pt-2 self-end'>

                    <Link to={`/courseDetails/${course._id}`}>
                        <div className='flex justify-end'>
                            <button className='btn btn-xs capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white border-2 border-none'>{`${!enrolled ? "Buy Now" : "View Course"}`}</button>
                        </div>
                    </Link>

                    <div>
                        <p className="text-sm flex gap-3"><Rating style={{ maxWidth: 70 }} readOnly value={rating}></Rating>({rating})</p>
                        <p className="text-sm font-bold">Total Student: <span className='font-normal'>{totalStudents}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;