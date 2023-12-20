import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Course from "./Course";

const Cources = () => {

    const axiosPublic = useAxiosPublic()

    const { data: courses = []} = useQuery({
        queryKey: ['courses'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/courses')
            return res.data
        }
    })
    return (
        <div>
            {
                courses.map(course=><Course key={course._id} course={course}></Course>)
            }
        </div>
    );
};

export default Cources;