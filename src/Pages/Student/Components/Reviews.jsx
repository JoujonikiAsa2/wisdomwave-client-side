import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Reviews = () => {

    const { courseId, avgRating } = useParams()
    const axiosPublic = useAxiosPublic()
    const parsedRating = parseInt(avgRating)

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic(`/api/reviews/${courseId}`)
            return res.data.data
        }
    })

    console.log(reviews, parsedRating)
    return (
        <div className='pt-20 w-full h-[100vh] flex flex-col '>
            <div className='p-10'>
                Reviews ({reviews.length})
                <Rating style={{ maxWidth: 90 }} readOnly value={parsedRating}></Rating>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full justify-center items-center justify-items-center'>
                {reviews?.map(review => (
                    <div className='card p-2 shadow-xl hover:scale-105 w-[30vw] h-[20vh]'>
                        <div className='flex items-center gap-2'>
                            <img src={review?.studentProfile} alt="" className='w-12 h-12 rounded-full'/>
                            <h4>{review?.studentName}</h4>
                        </div>
                        <Rating style={{ maxWidth: 90 }} readOnly value={review?.rating}></Rating>

                        <p>{review?.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;