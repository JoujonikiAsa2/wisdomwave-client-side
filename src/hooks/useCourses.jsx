import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCourses = () => {
    const axiosPublic = useAxiosPublic()

    const { data: allCourses = [], isLoading, isError} = useQuery({
        queryKey: ['allCourses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/courses')
            return res.data.data
        }
    })

    return { allCourses, isLoading, isError}
};

export default useCourses;