import React from 'react';
import homeImg from '../assets/home.png';
import Logo from '../assets/Logo.png';
import Logo2 from '../assets/Logo_S.png';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <img className="h-full w-full object-cover" src={homeImg} alt="Background" />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-white opacity-40"></div>

      {/* Top-left Logo */}
      <img src={Logo2} alt="Top Left Logo" className="absolute top-4 left-4 max-w-[180px] z-10" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        {/* Centered Logo */}
        <img src={Logo} alt="Logo" className="mb-6 h-auto max-w-6xl" />

        <p className="mt-4 font-semibold text-xl max-w-lg">
          WanderWave offers eco-friendly adventures, blending stunning nature with sustainable travel and expert guidance.
        </p>

        {/* Button */}
        <Link to='/home' className="mt-6 w-lg px-6 py-3 bg-yellow-400 text-black text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition">
          Let's go
        </Link>
      </div>
    </div>
  );
};

export default Home;
