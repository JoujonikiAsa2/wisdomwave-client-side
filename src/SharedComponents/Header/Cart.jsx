import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { FcShop } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Cart = ({ handleClicked, clicked }) => {
    return (
        <div>
            <nav className="dropdown dropdown-end">
                <div tabIndex={0} onClick={handleClicked} className="hover:cursor-pointer">
                    <div><FaCartPlus className="text-2xl text-blue-600"></FaCartPlus></div>
                    <span className="absolute badge bottom-4 left-3 text-red-400 dark:text-blue-600 bg-[#F3F3F3]">2</span>
                </div>
                <div tabIndex={0} className={`${clicked == false ? "hidden" : "mt-9 z-[1] card card-compact dropdown-content w-40 bg-base-200 shadow"}`}>
                    <div className="card-body">
                        <p>Total items: 2</p>
                        <Link to='/'>
                            <button className='btn btn-sm capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]'>View Cart</button>
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Cart;