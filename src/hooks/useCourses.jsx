import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCourses = () => {
    const axiosPublic = useAxiosPublic()

    const { data: courses = [], isLoading, isError} = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/courses')
            return res.data.data
        }
    })

    return {courses, isLoading, isError}
};

export default useCourses;