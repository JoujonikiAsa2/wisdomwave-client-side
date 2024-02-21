import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center dark:bg-white'>
            <div className=''>
                <div className="flex flex-col justify-center items-center relative h-full">
                    <div>
                        <p>Search course here</p>
                    </div>
                    <input className="input input-bordered input-sm w-[80vw] h-12 dark:bg-gray-200 focus:outline-none" placeholder="Search" name="search" />
                    <div className=' btn btn-sm h-12 w-20 absolute right-0 bottom-0 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] '>
                        <FaSearch className="text-white"></FaSearch>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;