import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const SearchPage = () => {
    const { handleSearch } = useOutletContext()

    const localHandleSearch = (e) => {
        e.preventDefault()
        const form = e.target
        const searchString = e.target.search.value
        handleSearch(searchString)
        console.log("String", searchString)
        form.reset()
    }
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center dark:bg-white'>
            <div className=''>
                <div className="flex flex-col justify-center items-center relative h-full">
                    <div>
                        <p>Search course here</p>
                    </div>
                    <form action="" onSubmit={localHandleSearch}>
                        <input className="input input-bordered input-sm w-[80vw] h-12 dark:bg-gray-200 focus:outline-none" placeholder="Search" name="search" />
                        <input type='submit' value="Search" className=' btn btn-sm h-12 w-20 absolute right-0 bottom-0 capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;