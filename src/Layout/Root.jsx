import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../SharedComponents/Footer/Footer";
import Header from "../SharedComponents/Header/Header";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
// Home layout for Student
const Root = () => {

    const [searchValue, setSearchValue] = useState("")
    const [allCourses, setAllCourses] = useState([])
    const axiosPublic = useAxiosPublic()
    const navigate  = useNavigate()

    // create a function to getting the search keyword
    const handleSearch = (search) => {
        // set the search keyword to the search value
        setSearchValue(search)
        console.log('search value', search)
        axiosPublic.get(`/api/search/key/${search}`)
            .then((res) => {
                console.log("Result:", res.data.data)
                setAllCourses(res.data.data)
                navigate('/allCourses')
            })
            .catch((e) => {
                console.log(e)
            })
    }
    return (
        <div className=" max-w-[2300px]">
            <Header handleSearch={handleSearch}></Header>
            <div className="w-full min-h-screen">
                {/* sending the search value as outlet Context so that evry child can get it */}
                <Outlet context={{ searchValue, setSearchValue, allCourses, handleSearch }}></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;