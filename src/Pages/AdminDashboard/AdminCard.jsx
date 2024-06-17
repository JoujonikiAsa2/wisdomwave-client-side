import React from 'react';
import { LineChart, Line,  Tooltip, ResponsiveContainer, Legend } from 'recharts';


const AdminCard = ({title, count, userData}) => {
    const data = userData;

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
        <div className='w-[90%] lg:w-[350px] md:w-[350px] h-[200px] p-6 rounded-lg shadow-md bg-info-gradient' >
            <p className='text-lg font-medium'>{count > 1000 ? `${count/1000}k` : count}</p>
            <span>{title}</span>
            <div className=' my-3'></div>
            <ResponsiveContainer width="90%" height="60%" >
                <LineChart  data={data}>
                    <Line type="monotone" dataKey="count" stroke="#0766AD" strokeWidth={2} />
                    <Tooltip content={<CustomTooltip />}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminCard;