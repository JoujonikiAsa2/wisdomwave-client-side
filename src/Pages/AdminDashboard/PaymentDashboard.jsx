import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';

const PaymentDashboard = () => {

    const [earning, setEarning] = useState([])
    const [transactions, setTransactions] = useState([])
    const axiosPublic= useAxiosPublic()

    useEffect(() => {
        axiosPublic.get(`/api/platformEarning`)
            .then(res => {
                console.log(res.data[0])
                setEarning(res.data[0])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        axiosPublic.get(`/api/earningByMonth`)
            .then(res => {
                console.log(res.data)
                setTransactions(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const profit = earning.twentyPercentTotal / 1000

    const totlaTransactions = transactions

    const CustomTooltip = ({ active, payload, label }) => {
        console.log(label, payload)
        if (active && payload && payload.length) {
            return (
                <div className="w-32 h-16 flex justify-center items-center bg-white rounded">
                    <p className="text-center p-1">{`${payload[0].payload.name} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };
    return (
        <div>
            <DashboardTitle title={"Payment Dashboard"} subTitle={"Here is the payment dashboard"} />
            <div className='flex flex-wrap gap-8'>
                <div className='lg:w-[40%] md:w-full w-full h-[200px] p-6 rounded-lg shadow-md bg-info-gradient'>
                    {/* <p className='text-lg font-medium'>{.toFixed(1)}k</p> */}
                    <span>Transactions</span>
                    <div className=' my-3'></div>
                    <ResponsiveContainer width="100%" height="90%" >
                        <LineChart data={transactions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />}/>
                            <Line type="monotone" dataKey="count" stroke="red" />
                            <Line type="monotone" dataKey="year" stroke="#0766AD" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className='lg:w-[350px] md:w-full w-full h-[200px] p-6 rounded-lg shadow-md bg-info-gradient'>
                    <p className='text-lg font-medium'>{profit.toFixed(1)}k</p>
                    <span>Profit</span>
                    <div className=' my-3'></div>
                    <div></div>

                </div>

            </div>
        </div>
    );
};

export default PaymentDashboard;