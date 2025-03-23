import React, { useState } from "react";
import Navbar from "../components/Navbar";
import heroImg from "@/assets/hero.png";
import Search from "../components/Search";
import { FaSearch, FaMapMarkerAlt, FaUser, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { Footer } from "../components/Footer";
import hotelsData from "../dummyData";
import { useLocation } from "react-router-dom";

const TravelSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({
    propertyType: true,
    filterBy: true,
  });
  const [currentPage, setCurrentPage] = useState(1); 
  const hotelsPerPage = 3; 
  
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Extract search criteria
  const searchCriteria = {
    location: searchParams.get("location")?.toLowerCase() || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guest: searchParams.get("guest") || "",
  };

  

  // Filter hotels based on location
  const filteredHotels = hotelsData
    .flatMap((city) => city.properties)
    .filter((hotel) => hotel.location.toLowerCase().includes(searchCriteria.location));

  // Filter hotels based on the search query
 const filteredHotelsByName = filteredHotels.filter((hotel) =>
  hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const totalPages = Math.ceil(filteredHotelsByName.length / hotelsPerPage);
const startIndex = (currentPage - 1) * hotelsPerPage;
const paginatedHotels = filteredHotelsByName.slice(startIndex, startIndex + hotelsPerPage);


  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleFilter = (section) => {
    setFilters((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle only the clicked section
    }));
  };
  

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
        <aside className="w-1/4">
          <div className="mb-4 rounded-md shadow-sm">
            <label className="block text-gray-600 mb-2 bg-amber-100 p-4 rounded-t-md">
              Search by property name
            </label>
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Beach Westpalm"
                  className="w-full p-2 pl-10 border rounded-md focus:ring focus:ring-blue-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center bg-amber-100 p-4 rounded-t-md">
              <h3 className="text-gray-700 font-semibold">Property type</h3>
              <IoIosArrowUp
                 onClick={() => toggleFilter("propertyType")}
                className={`h-5 w-5 transition-transform duration-300 cursor-pointer ${
                  filters.propertyType ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div>
              <div
                className={`transition-all duration-300 transform ${
                  filters.propertyType ? "opacity-100 scale-100 h-auto" : "opacity-0 scale-95 h-0 overflow-hidden"
                }`}
              >
                <ul className="mt-2 space-y-2 text-gray-600 bg-white shadow-md p-4 rounded-md">
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
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center bg-amber-100 p-4 rounded-t-md">
              <h3 className="text-gray-700 font-semibold">Filter by</h3>
              <IoIosArrowUp
                 onClick={() => toggleFilter("filterBy")}
                className={`h-5 w-5 transition-transform duration-300 cursor-pointer ${
                  filters.filterBy ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div>
              <div
                className={`transition-all duration-300 transform ${
                  filters.filterBy ? "opacity-100 scale-100 h-auto" : "opacity-0 scale-95 h-0 overflow-hidden"
                }`}
              >
                <ul className="mt-2 space-y-2 text-gray-600 bg-white shadow-md p-4 rounded-md">
                  <li>
                    <input type="checkbox" /> 0$ - 200$ (200)
                  </li>
                  <li>
                    <input type="checkbox" /> 200$ - 500$ (100)
                  </li>
                  <li>
                    <input type="checkbox" /> 500$ - 1000$ (15)
                  </li>
                  <li>
                    <input type="checkbox" /> 1000$ - 2000$ (12)
                  </li>
                  <li>
                    <input type="checkbox" /> 2000$ - 5000$ (10)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {searchCriteria.location
                ? `Results for "${searchCriteria.location}"`
                : "All Locations"}
              : {filteredHotelsByName.length} properties found
            </h2>
            <button className="border p-2 rounded-md">Sort by ▼</button>
          </div>

          {/* Property List */}
          <div className="md:col-span-3 space-y-6">
            {paginatedHotels.length > 0 ? (
              paginatedHotels.map((hotel, index) => (
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
                    <h3 className="text-lg font-semibold mt-2">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm">{hotel.type} with Great View</p>
                    <p className="text-gray-500 flex items-center gap-2 mt-1">
                      <FaMapMarkerAlt /> {hotel.location}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2 mt-1">
                      <FaUser /> {hotel.guests}
                    </p>
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

          {/* Pagination Controls (Updated) */}
          {filteredHotelsByName.length > hotelsPerPage && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-gray-200"}`}
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? "text-blue-600 font-bold border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-gray-200"}`}
              >
                &gt;
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TravelSearch;
