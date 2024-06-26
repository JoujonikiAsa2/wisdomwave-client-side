import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Loader from '../../SharedComponents/Loader/Loader';

const HomeRoute = ({children}) => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        axiosPublic.get(`/api/user/${user?.email}`)
            .then((res) => {
                setUserInfo(res.data.data)
                setIsLoading(false)

            })
            .catch(error => {
                console.error(error);
            })
    }, [user?.email]);
    if (isLoading) {
        return <Loader></Loader>
    }

    if (user === null) {
        return children
    }
    else if (userInfo?.userType === "student") {
        return children
    }
    else if (userInfo?.userType === "admin") {
        return children
    }
    else if (userInfo?.userType === "instructor") {
        return children
    }
    
};

export default HomeRoute;