import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Your new Navbar file
import Home from './pages/Home';
import SearchTutors from './pages/SearchTutors';
import MyOrders from './pages/MyOrders';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Navbar /> {/* ✅ This is now safe and won't cause a white screen */}
      <div className="pt-20"> {/* Prevents content overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-tutors" element={<SearchTutors />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;