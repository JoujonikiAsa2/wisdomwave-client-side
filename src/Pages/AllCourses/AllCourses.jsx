import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import AllCourseCard from './AllCourseCard';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useOutletContext } from "react-router-dom";

const AllCourses = () => {
    const { searchValue } = useOutletContext()
    let searchKey = searchValue
    const { allCourses, refrech } = useOutletContext()
    const [courses, setCourses] = useState([])
    const axiosPublic = useAxiosPublic()
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const page = Math.ceil(count/itemsPerPage)
    const pages =  [...Array(page).keys()]

    console.log(courses, searchKey)

    useEffect(() => {
        axiosPublic.get('/api/totalCourse')
            .then(res => {
                setCount(res.data.data)
                refrech()
            })
            .catch(e => {
                console.log(e)
            })
        }, [count])

    useEffect(() => {
        axiosPublic.get(`/api/courses?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                // console.log(res.data.data)
                setCourses(res.data.data)
                refrech()
            })
            .catch(e => {
                console.log(e)
            })
    }, [currentPage, itemsPerPage, courses])

    const handlePrev = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () =>{
        if (currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }



    return (
        <div className='py-28 gap-4 mx-[5vw]'>
            <div className='grid grid-cols-1 lg:grid-cols-2 justify-center justify-items-center items-center gap-8 w-full'>
                {
                    allCourses.length == 0 ? courses.map(course => <div className='rounded-lg w-full' key={course._id}>
                    <AllCourseCard key={course._id} course={course} btnText="Enroll Now">
                        </AllCourseCard>
                    </div >) : allCourses.map(course => <div className='rounded-lg w-full' key={course._id}>
                        <AllCourseCard key={course._id} course={course} btnText="Enroll Now">
                        </AllCourseCard>
                    </div >)
                }
            </div>
            <div className="flex gap-2 justify-center items-center pt-6">
                <div>
                    <button className="btn btn-sm capitalize text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2" onClick={handlePrev}>Prev</button>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    {
                        pages.map(page => <button className={`btn btn-sm btn-circle hover:bg-slate-400 ${currentPage === page && "selected border-1 bg-slate-400 text-white"}`} key={page} onClick={() => setCurrentPage(page)}>{page + 1}</button>)
                    }
                </div>
                <div>
                    <button className="btn btn-sm capitalize text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] my-2" onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllCourses;