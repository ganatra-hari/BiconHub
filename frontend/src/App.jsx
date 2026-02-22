import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Your new Navbar file
import Home from './pages/Home';
import SearchTutors from './pages/SearchTutors';
import MyOrders from './pages/MyOrders';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust path if needed

function App() {
  return (
    <>
      <Navbar /> {/* ✅ This is now safe and won't cause a white screen */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000,
          style: {
            fontWeight: 'bold',
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }} 
      />
      <div className="pt-20"> {/* Prevents content overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-tutors" element={<SearchTutors />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/favorites" element={<Favorites />} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;