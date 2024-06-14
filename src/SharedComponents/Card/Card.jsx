import React from 'react';

const Card = ({ title, count }) => {
    const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
    return (
        <div className="w-[250px] h-[120px] p-6 rounded-lg shadow-md bg-info-gradient">
            <h3 className="text-xl font-medium">{count}</h3>
            <span className="">{title}</span>
        </div>
        
    );
};

export default Card;