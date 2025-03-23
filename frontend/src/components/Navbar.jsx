import React from "react";
import logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null; // Wait until user data is loaded

  const username = user ? (typeof user === "string" ? user : user?.name || "Guest") : null;

  return (
    <nav
      className="absolute top-8 z-50 flex justify-between items-center
      p-4 bg-white/50 backdrop-blur-sm border border-white/20
      rounded-xl shadow-md w-[1200px]"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-gray-800">
        <Link to="/home" className="hover:text-[#FF0038]">Home</Link>
        <Link to="/travel-search" className="hover:text-[#FF0038]">Hotels</Link>
        <a href="#" className="hover:text-[#FF0038]">Destinations</a>
        <a href="#" className="hover:text-[#FF0038]">About Us</a>
        <a href="#" className="hover:text-[#FF0038]">Contact</a>
      </div>

      {/* User Authentication Links */}
      <div className="flex gap-4 items-center">
        {user ? (
          <div className="flex items-center gap-4">
            {/* Profile Picture or Fallback */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-400 rounded-full border-2 border-white text-white font-bold text-lg">
                <p>{username?.charAt(0).toUpperCase() || "U"}</p>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={logout}
              className="bg-[#FF0038] text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* Show these only when the user is logged out */}
            <Link to="/login" className="text-gray-600">Login</Link>
            <Link to="/register" className="bg-[#FF0038] text-white px-4 py-2 rounded-full">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
