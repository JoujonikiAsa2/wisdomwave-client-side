import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const PageNotFound = () => {
    return (
        <div>
            <div className='w-full h-screen flex flex-col gap-3 justify-center items-center'>
                <div className='flex justify-center items-center w-[200px]
             h-[200px] bg-red-400'>
                    <TypeAnimation
                    sequence={[
                        '404', 2000, 'ERROR', 2000
                    ]}
                     wrapper='h1'
                     speed={50}
                     repeat={Infinity}
                     style={{fontSize: '3rem', color:"white"}}
                     cursor={false}
                    >
                    </TypeAnimation>
                </div>
                <h4 className='text-lg'>Plase go back to the Home Page</h4>
                <Link to='/'><button className="btn btn-sm bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white border-2 border-none">Home</button></Link>
            </div>
        </div>
    );
};

export default PageNotFound;