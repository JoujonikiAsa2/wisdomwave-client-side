import React, { useEffect, useState } from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Card from '../../SharedComponents/Card/Card';

const TutorDashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [requestedTuition, setRequestedTuition] = useState(null)
    const [tuitionRequests, setTuitionRequests] = useState([])
    console.log(user?.email)

    useEffect(() => {
        axiosPublic.get(`/api/requestedTuition/tutor/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setRequestedTuition(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email])


    useEffect(() => {
        axiosPublic.get(`/api/requestedTuition/tutor/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setTuitionRequests(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [user?.email])
    return (
        <div className=''>
            <DashboardTitle title="Tutor Dashboard" subTitle="Find all details here"></DashboardTitle>
            <div className='w-full flex  gap-10'>
                <Card title="Requested Tuitions" count={requestedTuition?.length > 10000 ? requestedTuition?.length / 1000 + "k" : requestedTuition?.length}></Card>
                <Card title="Tuition Requests" count={tuitionRequests?.length > 10000 ? tuitionRequests?.length / 1000 + "k" : tuitionRequests?.length}></Card>
            </div>
        </div>
    );
};

export default TutorDashboard;