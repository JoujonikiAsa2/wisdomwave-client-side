import React from 'react';

const SectionTitle = ({title,subtitle}) => {
    return (
        <div className='pt-4'>
            <h2 className='text-xl font-bold text-[#0766AD]'>{title}</h2>
            <p className='text-base'>{subtitle}</p>
            <div className='divider divider-blue-500 dark:bg-slate-400 dark:h-[1px]'></div>
        </div>
    );
};

export default SectionTitle;