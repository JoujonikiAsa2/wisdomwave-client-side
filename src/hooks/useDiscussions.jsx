import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useDiscussions = () => {
    const axiosPublic = useAxiosPublic();

    const { data: discussions = [], isLoading, isError,refetch } = useQuery({
        queryKey: ['discussions'],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get('/api/discussions');
                console.log("API Response:", res.data);
                return res.data.data;
            } catch (error) {
                console.error("Error fetching discussions:", error);
            }
        },
    });
    return { discussions, isLoading, isError, refetch }
};

export default useDiscussions;