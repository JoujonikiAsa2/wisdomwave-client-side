import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const Course = ({ course }) => {
    const { title, thumbnail, instructor, rating, limitOfStudents, enrollFee } = course.courseDetails
    console.log("Print", title, instructor, rating, limitOfStudents, enrollFee)
    return (
        <div className="w-[90vw] lg:w-80 md:w-80 2xl:w-96 card shadow-xl hover:shadow-2xl hover:cursor-pointer hover:translate-y-2 hover:scale-110 relative">
            <img src={thumbnail} alt="" className="w-full h-full rounded-t-lg " />
            <div className='w-20 h-8 bg-green-400 p-1 text-center rounded-lg absolute bottom-48 top-2 left-2'>
                <p>${enrollFee}</p>
            </div>
            <div className='p-4'>
                <h5 className="text-base font-bold py-2">{title}</h5>

                <div className='flex justify-between text-left'>
                    <div>
                        <p className="text-sm font-bold capitalize">Instructor: <span className='font-normal'>{instructor}</span></p>
                        <div>
                            <button className='btn btn-xs capitalize bg-blue-500'>Buy Now</button>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm flex gap-3"><Rating style={{ maxWidth: 70 }} readOnly value={rating}></Rating>({rating})</p>
                        <p className="text-sm font-bold">Total Student: <span className='font-normal'>{limitOfStudents}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;