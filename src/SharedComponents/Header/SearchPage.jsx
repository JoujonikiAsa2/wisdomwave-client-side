import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchPage = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center dark:bg-white'>
            <div className="flex justify-center items-center relative h-full">
                <input className="input input-bordered input-sm w-[80vw] dark:bg-gray-200 focus:outline-none" placeholder="Search" name="search" />
                <div className=' btn btn-sm absolute right-0 bg-blue-600'>
                    <FaSearch className="text-white"></FaSearch>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;