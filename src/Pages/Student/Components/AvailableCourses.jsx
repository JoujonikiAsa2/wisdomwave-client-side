import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import AvaiableCourseCard from "./AvaiableCourseCard";

const AvailableCourses = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    console.log(user?.email)

    // load purchased course data
    const { data: purchasedCourses = [], refetch } = useQuery({
        queryKey: "purchasedCourses",
        queryFn: async () => {
            const purchasedCourses = await axiosPublic.get(`api/purchasedCourses/${user?.email}`)
            return purchasedCourses.data.data
        }
    })


    return (
        <div className='py-32 text-center mx-[5vw] flex flex-col justify-center items-center'>

            <h2 className="text-lg pb-16">Total Courses: &nbsp; <span className="badge bg-[#0766AD] text-white p-3">{purchasedCourses.length}</span></h2>

            {/* shows all available courses in a card format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center justify-items-center items-center gap-8">
                {
                    purchasedCourses.length != 0 ? purchasedCourses.map(course => <div className='rounded-lg' key={course._id}>
                        <AvaiableCourseCard course={course} id={course.courseId}>
                        </AvaiableCourseCard>
                    </div>) : <div className='w-full h-full col-span-3 flex justify-center items-center justify-items-center'>
                    <div className='w-72 h-12 flex justify-center items-center'>
                        <h2>You did not purchased any course</h2>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default AvailableCourses;