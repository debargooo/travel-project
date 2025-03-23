import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import TravelSearch from './pages/TravelSearch';

const App = () => {
  return (
    <>
    <HashRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/travel-search" element={<TravelSearch />} />
    </Routes>
  </HashRouter>
    </>
  )
}

export default App