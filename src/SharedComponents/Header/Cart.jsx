import React from 'react';
import { CiShoppingCart  } from 'react-icons/ci';
import { FcShop } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Cart = ({ handleClicked, clicked }) => {
    return (
        <div>
            <nav className="dropdown dropdown-end flex justify-center items-center">
                <div tabIndex={0} onClick={handleClicked} className="hover:cursor-pointer">
                    <div><CiShoppingCart  className="text-xl text-blue-600"></CiShoppingCart ></div>
                    <span className="absolute text-sm bottom-2 left-5 text-red-400 dark:text-blue-600">2</span>
                </div>
                <div tabIndex={0} className={`${clicked == false ? "hidden" : "mt-[11.5rem] z-[1] card card-compact dropdown-content w-40 bg-base-200 shadow"}`}>
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