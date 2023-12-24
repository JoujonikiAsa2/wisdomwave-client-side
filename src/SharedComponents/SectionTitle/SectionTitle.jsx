import React from 'react';

const SectionTitle = ({title,subtitle}) => {
    return (
        <div className='pt-4'>
            <h2 className='text-xl font-bold text-green-500'>{title}</h2>
            <p className='text-base'>{subtitle}</p>
            <div className='divider divider-blue-500'></div>
        </div>
    );
};

export default SectionTitle;