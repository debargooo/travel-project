import React from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.png";
import Search from "../components/Search";
import { FaSearch, FaMapMarkerAlt, FaUser, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Footer } from "../components/Footer";
import hotelsData from "../dummyData";
import { useLocation } from "react-router-dom";

const TravelSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract search criteria
  const searchCriteria = {
    location: searchParams.get("location")?.toLowerCase() || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guest: searchParams.get("guest") || "",
  };

  // Filter hotels based on the searched location
  const filteredHotels = hotelsData
    .flatMap((city) => city.properties) // Get all properties from all locations
    .filter((hotel) => hotel.location.toLowerCase().includes(searchCriteria.location));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center text-center text-white m-2">
        <Navbar />
        <div className="absolute inset-0 w-full h-1/2">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-black opacity-70 rounded-lg"></div>
        </div>
        <Search />
      </section>

      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Sidebar Filters */}
        <aside className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Search by property name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Beach Westpalm"
                className="w-full p-2 pl-10 border rounded-md focus:ring focus:ring-blue-300"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-700 font-semibold">Property type</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>
                <input type="checkbox" /> Resorts (12)
              </li>
              <li>
                <input type="checkbox" /> Hotels (400)
              </li>
              <li>
                <input type="checkbox" /> Entire homes & apartments (105)
              </li>
              <li>
                <input type="checkbox" /> Luxury tents (100)
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {searchCriteria.location
                ? `Results for "${searchCriteria.location}"`
                : "All Locations"}
              : {filteredHotels.length} properties found
            </h2>
            <button className="border p-2 rounded-md">Sort by ▼</button>
          </div>

          {/* Property List */}
          <div className="md:col-span-3 space-y-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex gap-4">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-[20rem] h-[20rem] object-cover rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-evenly">
                    <div className="flex justify-between items-center">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-lg">
                        {hotel.type}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        {hotel.rating % 1 !== 0 && <FaStarHalfAlt />}
                        <span className="text-gray-600 text-sm ml-1">
                          ({hotel.reviews} Reviews)
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mt-2">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm">{hotel.type} with Great View</p>
                      <p className="text-gray-500 flex items-center gap-2 mt-1">
                        <FaMapMarkerAlt /> {hotel.location}
                      </p>
                      <p className="text-gray-500 flex items-center gap-2 mt-1">
                        <FaUser /> {hotel.guests}
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-lg font-bold">{hotel.price}</p>
                      <button className="bg-[#FF0038] text-white px-4 py-2 rounded-md">
                        See Availability
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No properties found for "{searchCriteria.location}". Try a different location.
              </p>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TravelSearch;
