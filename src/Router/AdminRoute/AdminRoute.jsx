import React, { useEffect, useState } from 'react';
import Loader from '../../SharedComponents/Loader/Loader';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        axiosPublic.get(`/api/user/${user?.email}`)
            .then(res => {
            // console.log(res.data)
                setUserInfo(res.data.data)
                // console.log(res.data.data.email)
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
        return <Loader></Loader>
    }
};

export default AdminRoute;