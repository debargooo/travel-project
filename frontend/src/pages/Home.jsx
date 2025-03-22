import React from 'react';
import Cookies from "js-cookie";
import { FaHeart } from 'react-icons/fa';
import heroImg from '../assets/hero.png';
import eiffel from '../assets/eiffel.jpg';
import greatWall from '../assets/greatWall.jpg';
import tajMahal from '../assets/tajMahal.jpg';
import Navbar from '../components/Navbar';
import hotel from '../assets/hotel.jpg'
import Contact from '../components/Contact';
import { Footer } from '../components/Footer';


import Search from '../components/Search';

const Home = () => {
  

 
  return (
    <div className=" min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center text-white m-2">
      <Navbar />
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImg}
          alt="Hero"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center mt-8">
        <h1 className="text-5xl font-bold max-w-4xl">
          Discover The Best Destinations In The World
        </h1>
        <p className="mt-4 max-w-2xl">
          Crafting exceptional journeys: your global escape planner. Unleash your wanderlust with
          seamless travel & extraordinary adventures.
        </p>

       <Search/>
       
      </div>
    </section>

      
      {/* Popular Destinations */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl text-center font-bold">Popular Destinations</h2>
        <p className="text-center text-gray-600 mb-8">Navigate the Globe with Confidence</p>
        <div className="flex gap-6 justify-center overflow-x-auto px-6">
          {[{ img: eiffel, name: 'Eiffel Tower' }, { img: greatWall, name: 'Great Wall' }, { img: tajMahal, name: 'Taj Mahal' }].map((dest, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden w-84">
              <img src={dest.img} alt={dest.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{dest.name}</h3>
                  <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <p className="text-gray-500">356 Tours</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-500 font-semibold">48.25$ / person</span>
                  <button className="bg-[#FF0038] text-white px-4 py-2 rounded-lg">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Deals Hotels */}
      <section className="py-16 max-w-7xl m-auto">
  <h2 className="text-3xl text-center font-bold">Best Deals Hotels</h2>
  <p className="text-center text-gray-600 mb-8">
    Quality as judged by customers. Book at the ideal price!
  </p>

  {/* Cards Container */}
  <div className="grid gap-8 md:grid-cols-2 px-6 justify-items-center">
    {/* Card 1 */}
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden h-[20rem] w-[35rem]">
      {/* Left: Image */}
      <img
        src={hotel} // replace with your own image
        alt="Hotel"
        className="w-1/2 h-auto object-cover"
      />
      {/* Right: Content */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Luxury
            </span>
            <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
              -20%
            </span>
          </div>
          <h3 className="text-lg font-bold mt-2">
            Fairmont Resort, Dubai, United Arab Emirates
          </h3>
          <p className="text-gray-500 mt-1">Dubai, UAE</p>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-500 font-semibold">48.25$ / Night</span>
          <button className="bg-[#FF0038] text-white px-4 py-2 rounded-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden  h-[20rem] w-[35rem]">
      <img
        src={hotel}
        alt="Hotel"
        className="w-1/2 h-auto object-cover"
      />
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Family
            </span>
            <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
              -20%
            </span>
          </div>
          <h3 className="text-lg font-bold mt-2">
            Fairmont Resort, Dubai, United Arab Emirates
          </h3>
          <p className="text-gray-500 mt-1">Dubai, UAE</p>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-500 font-semibold">48.25$ / Night</span>
          <button className="bg-[#FF0038] text-white px-4 py-2 rounded-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden  h-[20rem] w-[35rem]">
      <img
        src={hotel}
        alt="Hotel"
        className="w-1/2 h-auto object-cover"
      />
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Standard
            </span>
            <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
              -10%
            </span>
          </div>
          <h3 className="text-lg font-bold mt-2">
            Fairmont Resort, Dubai, United Arab Emirates
          </h3>
          <p className="text-gray-500 mt-1">Dubai, UAE</p>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-500 font-semibold">48.25$ / Night</span>
          <button className="bg-[#FF0038] text-white px-4 py-2 rounded-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden  h-[20rem] w-[35rem]">
      <img
        src={hotel}
        alt="Hotel"
        className="w-1/2 h-auto object-cover"
      />
      <div className="w-1/2 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Entertainment
            </span>
            <span className="text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
              -40%
            </span>
          </div>
          <h3 className="text-lg font-bold mt-2">
            Fairmont Resort, Dubai, United Arab Emirates
          </h3>
          <p className="text-gray-500 mt-1">Dubai, UAE</p>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-500 font-semibold">48.25$ / Night</span>
          <button className="bg-[#FF0038] text-white px-4 py-2 rounded-lg">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
<Contact/>
<Footer/>
    </div>
  );
};

export default Home;
