import React, { useEffect, useState } from 'react';
import Loader from '../../SharedComponents/Loader/Loader';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PageNotFound from '../../SharedComponents/404_page/PageNotFound';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        axiosPublic.get(`/api/user/${user?.email}`)
            .then(res => {
            console.log(res.data)
                setUserInfo(res.data.data)
                console.log(res.data.data.email)
                return res.data
            })
            .catch(err => {
                console.log(err);
            })
    })

    if (userInfo?.userType === "admin") {
        return children
    }
    else if (isLoading) {
        return <PageNotFound></PageNotFound>
    }
};

export default AdminRoute;