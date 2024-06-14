import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import PageNotFound from '../../SharedComponents/404_page/PageNotFound';
import Loader from '../../SharedComponents/Loader/Loader';

const StudentRoute = ({ children }) => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        axiosPublic.get(`/api/user/${user?.email}`)
            .then((res) => {
                setUserInfo(res.data.data)
                setIsLoading(false)

            })
            .catch(error => {
                console.error(error);
            })
    }, [user?.email])

    if (userInfo?.userType === "student") {
        return children
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <PageNotFound></PageNotFound>
        </div>
    );
};

export default StudentRoute;