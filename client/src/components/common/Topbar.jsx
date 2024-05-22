import React from 'react';
import Logo from '../icons/Logo'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";







function Topbar(){
    return(
    <div className="navbar bg-base-100 shadow-xl rounded-lg sticky  top-0 z-10">
        <div className="flex-1">
            <button className="btn btn-ghost text-2xl bold pl-1">
               <div className='w-12 h-12'>
                    <Logo/>
                </div> 
                <h2>SnapGram </h2>
            </button> {/* Changed from <a> to <button> */}
        </div>
        
        <div className="flex-none gap-2">
            <div className="form-control">
                <label htmlFor="searchInput" className="hidden">Search</label> {/* Added label */}
                <input id="searchInput" type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle avatar"> {/* Changed from <div> to <button> and removed tabIndex and role */}
                    <div className="w-10 rounded-full">
                        <img alt="User avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> {/* Improved alt description */}
                    </div>
                </button>
                <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-50">
                    <li>
                        <a href="/profile" className="justify-between"> {/* Added href */}
                            Profile
                            
                        </a>
                    </li>
                    <li><a href="/settings">Settings</a></li> {/* Added href */}
                    <li><a href="/logout">Logout</a></li> {/* Added href */}
                </ul>
            </div>
        </div>
    </div>
    );
}
export default Topbar;