import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

import {  
    FaBus,    // or another icon for Tours
    FaHotel, 
    FaTicketAlt, 
    FaCarSide, // or another icon for Rental
    FaSwimmer, // or another icon for Activities
    FaMapMarkerAlt,
    FaCalendar,
    FaPlaneDeparture,
    FaTrain,
    FaUser, FaSearch, FaHeart,
    FaChevronDown
  } from 'react-icons/fa';
  

const Search = () => {
   const [activeTab, setActiveTab] = useState('hotels');
   const [location, setLocation] = useState('');
   const [checkIn, setCheckIn] = useState('');
   const [checkOut, setCheckOut] = useState('');
   const [guest, setGuest] = useState('');
   
   const navigate = useNavigate();
  
    const tabs = [
      { id: 'hotels', label: 'Hotels', icon: <FaHotel /> },
      { id: 'plane', label: 'Flight', icon: <FaPlaneDeparture /> },
      { id: 'rental', label: 'Train', icon: <FaTrain /> },
    ];

    const handleSubmit = () => {
      if(location == '' || checkIn == '' || checkOut == '' ||  guest == ''){
        alert("fill the form")
        return
      }
      const queryString = new URLSearchParams({
        location,
        checkIn,
        checkOut,
        guest,
      }).toString();
      navigate(`/travel-search?${queryString}`);
    }

  return (
     <div className="mt-8 bg-white w-full max-w-5xl rounded-xl shadow-md p-6 text-gray-800 z-50">
              {/* Top Tabs Row */}
              <div className="flex items-center border-b pb-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      activeTab === tab.id
                        ? 'flex items-center gap-2 text-blue-500 font-semibold px-3 py-2 border-b-2 border-blue-500'
                        : 'flex items-center gap-2 text-gray-600 px-3 py-2 hover:text-blue-500'
                    }
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
    
                {/* Need some help? */}
                <div className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer">
                  Need some help ?
                </div>
              </div>
    
              {/* Bottom Inputs Row (conditionally rendered based on active tab) */}
              {activeTab === 'hotels' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  {/* Destination */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Destination
                    </label>
                    <div className="relative border rounded-md flex items-center px-3 py-2">
                      <FaMapMarkerAlt className="text-gray-400 mr-2" />
                      <input
                       onChange={(e)=>setLocation(e.target.value)} value={location}
                        type="text"
                        placeholder="Istanbul, Turkey"
                        className="flex-1 focus:outline-none text-gray-700"
                      />
                      <FaChevronDown className="text-gray-400 ml-2" />
                    </div>
                  </div>
    
                  {/* Check-in */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Check-in
                    </label>
                    <div className="relative border rounded-md flex items-center px-3 py-2">
                      <FaCalendar className="text-gray-400 mr-2" />
                      <input
                        onChange={(e)=>setCheckIn(e.target.value)} value={checkIn}
                        type="date"
                        className="flex-1 focus:outline-none text-gray-700"
                      />
                    </div>
                  </div>
    
                  {/* Check-out */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Check-out
                    </label>
                    <div className="relative border rounded-md flex items-center px-3 py-2">
                      <FaCalendar className="text-gray-400 mr-2" />
                      <input
                       onChange={(e)=>setCheckOut(e.target.value)} value={checkOut}
                        type="date"
                        className="flex-1 focus:outline-none text-gray-700"
                      />
                    </div>
                  </div>
    
                  {/* Guest */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Guest
                    </label>
                    <div className="relative border rounded-md flex items-center px-3 py-2">
                      <FaUser className="text-gray-400 mr-2" />
                      <input
                       onChange={(e)=>setGuest(e.target.value)} value={guest}
                        type="text"
                        placeholder="2 adults, 1 room"
                        className="flex-1 focus:outline-none text-gray-700"
                      />
                      <FaChevronDown className="text-gray-400 ml-2" />
                    </div>
                  </div>
                </div>
              )}
    
              {/* Another Example: if activeTab === 'tickets', show different inputs */}
              {activeTab === 'tickets' && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Ticket Search</h3>
                  <p className="text-sm text-gray-600">
                    (You can put different fields for searching tickets here...)
                  </p>
                </div>
              )}
    
              {/* ... Repeat for tours, rental, activities, etc. ... */}
    
              {/* Search Button (always visible or also conditionally rendered) */}
              <div className="flex justify-end mt-4">
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center gap-2">
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>
  )
}

export default Search