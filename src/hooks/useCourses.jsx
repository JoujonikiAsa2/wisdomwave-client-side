import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCourses = () => {
    const axiosPublic = useAxiosPublic() 
    const [allCourses, setAllCourses] = useState([])
    // console.log(user.email)

    useEffect(() => {

        axiosPublic.get('/api/courses')
            .then(res => {
                console.log(res.data.data)
                setAllCourses(res.data.data)
            })
            .catch(e => {
                console.log(e);
            });
    }, [allCourses])

    return { allCourses}
};

export default useCourses;