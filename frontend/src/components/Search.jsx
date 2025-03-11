import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {
  FaBus,
  FaHotel,
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaCalendar,
  FaUser,
  FaSearch,
  FaExchangeAlt,
} from "react-icons/fa";

const Search = () => {
  const [activeTab, setActiveTab] = useState("hotels");
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  const navigate = useNavigate();

  const tabs = [
    { id: "hotels", label: "Hotels", icon: <FaHotel /> },
    { id: "plane", label: "Plane", icon: <FaPlaneDeparture /> },
    { id: "bus", label: "Bus", icon: <FaBus /> },
  ];

  const handleSwap = () => {
    setIsSwapping((prev) => !prev);
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = () => {
    if (!checkIn || !checkOut || !guest) {
      toast.error("Please fill all fields");
      return;
    }

    if (activeTab === "hotels") {
      if (!location) {
        alert("Please enter destination");
        return;
      }
      const queryString = new URLSearchParams({ location, checkIn, checkOut, guest }).toString();
      navigate(`/travel-search?${queryString}`);
    } else {
      if (!from || !to) {
        alert("Please enter both From and To locations");
        return;
      }
      const queryString = new URLSearchParams({ from, to, checkIn, checkOut, guest }).toString();
      navigate(`/travel-search?${queryString}`);
    }
  };

  return (
    <div className="mt-8 bg-white w-full min-w-5xl rounded-xl shadow-md p-6 text-gray-800 z-50">
      <ToastContainer position="bottom-right" />
      {/* Tabs */}
      <div className="flex items-center border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? "flex items-center gap-2 text-blue-500 font-semibold px-3 py-2 border-b-2 border-blue-500"
                : "flex items-center gap-2 text-gray-600 px-3 py-2 hover:text-blue-500"
            }
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Common Search Inputs */}
      <div className={activeTab === "hotels" ? "grid grid-cols-1 md:grid-cols-4 gap-4 mt-4" : "flex flex-wrap gap-2 mt-4"}>
        {activeTab === "hotels" ? (
          <>
            <div>
              <label className="text-sm font-semibold text-gray-600">Destination</label>
              <div className="relative border rounded-md flex items-center px-3 py-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input onChange={(e) => setLocation(e.target.value)} value={location} type="text" placeholder="Istanbul, Turkey" className="flex-1 focus:outline-none" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <div >
              <label className="text-sm font-semibold text-gray-600">From</label>
              <div className="relative border rounded-md flex items-center px-3 py-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input onChange={(e) => setFrom(e.target.value)} value={from} type="text" placeholder="Kolkata" className="flex-1 focus:outline-none " />
              </div>
            </div>
            <div className="relative top-2">
              <button onClick={handleSwap} className={`bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-transform duration-300 ${isSwapping ? 'rotate-180' : ''}`}>
                <FaExchangeAlt className="text-gray-600 text-sm" />
              </button>
            </div>
            <div >
              <label className="text-sm font-semibold text-gray-600">To</label>
              <div className="relative border rounded-md flex items-center px-3 py-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input onChange={(e) => setTo(e.target.value)} value={to} type="text" placeholder="Delhi" className="flex-1 focus:outline-none " />
              </div>
            </div>
          </div>
        )}
        <div>
          <label className="text-sm font-semibold text-gray-600">Check-in</label>
          <div className="relative border rounded-md flex items-center px-3 py-2">
            <FaCalendar className="text-gray-400 mr-2" />
            <input onChange={(e) => setCheckIn(e.target.value)} value={checkIn} type="date" className="flex-1 focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Check-out</label>
          <div className="relative border rounded-md flex items-center px-3 py-2">
            <FaCalendar className="text-gray-400 mr-2" />
            <input onChange={(e) => setCheckOut(e.target.value)} value={checkOut} type="date" className="flex-1 focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-600">Guest</label>
          <div className="relative border rounded-md flex items-center px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input onChange={(e) => setGuest(e.target.value)} value={guest} type="text" placeholder="2 adults, 1 room" className="flex-1 focus:outline-none" />
          </div>
        </div>
      </div>
      
      {/* Search Button */}
      <div className="flex justify-end mt-4">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center gap-2">
          <FaSearch /> Search
        </button>
      </div>
    </div>
  );
};

export default Search;
