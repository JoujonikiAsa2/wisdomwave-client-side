import React, { useEffect, useState } from 'react';
import Loader from '../../SharedComponents/Loader/Loader';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PageNotFound from '../../SharedComponents/404_page/PageNotFound';

const TutorRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState({})
    // console.log(user?.email)
    useEffect(() => {
        axiosPublic.get(`/api/user/${user?.email}`)
            .then(res => {
                // console.log(res.data);
                setUserInfo(res.data.data)
                return res.data
            })
            .catch(err => {
                console.log(err);
            })
    })

    if (userInfo?.userType === "tutor") {
        return children
    }
    else if (isLoading) {
        return <PageNotFound></PageNotFound>
    }
};

export default TutorRoute;