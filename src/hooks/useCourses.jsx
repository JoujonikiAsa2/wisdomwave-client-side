import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCourses = () => {
    const axiosPublic = useAxiosPublic()

    const { data: allCourses = [], isLoading, isError, refetch} = useQuery({
        queryKey: ['allCourses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/courses')
            refetch()
            return res.data.data
        }
    })

    return { allCourses, isLoading, isError, refetch}
};

export default useCourses;