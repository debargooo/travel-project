import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="absolute top-8 z-50
  flex justify-between items-center
  p-4
  bg-white/50 backdrop-blur-sm
  border border-white/20
  rounded-xl shadow-md w-[1200px]">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-8" />
            </div>

            <div className="hidden md:flex gap-6 text-white ">
                <a href="#" className="hover:text-[#FF0038]">Home</a>
                <a href="#" className="hover:text-[#FF0038]">Hotels</a>
                <a href="#" className="hover:text-[#FF0038]">Destinations</a>
                <a href="#" className="hover:text-[#FF0038]">About Us</a>
                <a href="#" className="hover:text-[#FF0038]">Contact</a>
            </div>

            <div className="flex gap-4 items-center">
                <Link to='/login' className="text-gray-600">Login</Link>
                <Link to='/register' className="bg-[#FF0038] text-white px-4 py-2 rounded-full">Register</Link>
            </div>
        </nav>


    )
}

export default Navbar