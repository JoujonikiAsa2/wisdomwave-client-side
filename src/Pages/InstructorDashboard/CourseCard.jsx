
import { Rating } from '@smastrom/react-rating';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

const CourseCard = ({ course }) => {

    const axiosPublic = useAxiosPublic()
    const [ratings,setRatings] = useState([])
    const id = course._id

    const { title, thumbnail, instructor, rating, totalStudents, enrollFee } = course.courseDetails
    // console.log("Print", title, instructor, rating, limitOfStudents, enrollFee)

    useEffect(() => {
        axiosPublic.get(`/api/ratings`)
            .then(res => {
                setRatings(res.data.data)
            })
            .catch(e => {
                console.log(e); // Ensure the rating is set to 0 on error
            });
    }, [id])


    const filteredRatings = ratings.length > 0 && ratings.filter(rating => rating.courseId === id)
    const avgRating = filteredRatings.length > 0 && filteredRatings.reduce((acc, curr) => acc + curr.rating, 0) / filteredRatings.length 
    return (
        <Link to={`/courseDetails/${course._id}`}>
            <div className="h-[13rem] hover:shadow hover:cursor-pointer relative lg:w-[35vw] md:w-[40vw] w-[70vw] border bg-white flex items-start rounded-lg">
                <div className='lg:w-64 md:w-42 w-32 flex justify-between items-center h-full rounded-lg'>
                    <img src={thumbnail} alt="" className="w-full md:w-56 lg:w-56 h-full rounded-lg rounded-r-none object-fill" />
                </div>
                <div className='flex flex-col pt-8'>
                    <div className={`w-16 h-7 text-white bg-[#29ADB2] p-1 text-sm text-center rounded-lg absolute bottom-48 top-2 right-2 font-bold`}>
                        <p>{enrollFee}Tk</p>
                    </div>
                    <div className='text-start px-2 space-y-1 h-full'>
                        <div className='h-[5rem] md:h-[3rem] lg:h-[3rem]'>
                            <h5 className="text-sm font-bold py-2">{title}</h5>
                            <p className="text-xs font-bold capitalize">Instructor: <span className='font-normal'>{instructor}</span></p>
                        </div>

                        <div className=''>
                            <div className='space-y-1 flex flex-col-reverse justify-between self-end pt-8'>
                                <p className="text-sm flex gap-3"><Rating style={{ maxWidth: 70 }} readOnly value={avgRating}></Rating>({rating})</p>
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